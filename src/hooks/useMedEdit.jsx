import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from './useForm'
import { useMedsStore } from './useMedsStore'
import { startAlert } from '../store/slices/ui'
import { medExists } from '../helpers'

export const useMedEdit = (medicine) => {
  const { startUpdateMedicamento, startAddPrescription, medicamentos } = useMedsStore()
  const [isAddingPrescription, setIsAddingPrescription] = useState(false)
  const [values, handleChange, setValues] = useForm({
    name: medicine.name,
    description: medicine.description,
    ch: medicine.ch
  })

  const dispatch = useDispatch()

  const { name, ch } = values

  const handleSubmitPrescription = (prescription) => {
    startAddPrescription(medicine._id, prescription)
    setIsAddingPrescription(false)
  }

  const handleRemoveMed = (id) => {
    const medUpdated = {
      ...medicine,
      medicines: medicine.medicines.filter(med => med._id !== id)
    }

    startUpdateMedicamento(medicine._id, medUpdated)
  }

  const handleOnChangeInnerMeds = (newInnerMed) => {
    const newInnerMeds = [
      ...medicine.medicines,
      { ...newInnerMed }
    ]
    const medUpdated = {
      ...medicine,
      medicines: newInnerMeds
    }

    startUpdateMedicamento(medicine._id, medUpdated)
  }

  // TODO: Agregar dispatch para guardar la descripcion del medicamento
  const handleSubmit = (e) => {
    e.preventDefault()

    const medData = {
      ...medicine,
      ch,
      name
    }

    if (medExists(medicamentos, medicine._id, medData)) {
      return dispatch(startAlert({
        alertMessage: 'El medicamento ya existe',
        alertType: 'error'
      }))
    }

    // TODO: Utilizar un estas seguro por si viene vacio
    startUpdateMedicamento(medicine._id, medData)
    // onCancel()
  }

  const handleChChange = (e) => {
    setValues({ ...values, ch: e.target.value })
  }

  return {
    name,
    ch,
    isAddingPrescription,
    setIsAddingPrescription,
    handleSubmitPrescription,
    handleRemoveMed,
    handleOnChangeInnerMeds,
    handleSubmit,
    handleChChange,
    handleChange
  }
}
