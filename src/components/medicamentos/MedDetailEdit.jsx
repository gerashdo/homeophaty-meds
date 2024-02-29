import { useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { chOptions, medExists, medicineTypes } from '../../helpers'
import { RadioOptions } from '../iterface/RadioOptions'
import { startAlert } from '../../store/slices/ui'
import { InnerMedsForm } from './InnerMedsForm'
import { useMedsStore } from '../../hooks'

import './med-detail-edit.css'

export const MedDetailEdit = ({ medicamento, onCancel }) => {
  const dispatch = useDispatch()
  const { startUpdateMedicamento, medicamentos } = useMedsStore()

  const [values, handleChange, setValues] = useForm({
    name: medicamento.name,
    description: medicamento.description,
    ch: medicamento.ch
  })
  const { description, name, ch } = values

  // TODO: Agregar dispatch para guardar la descripcion del medicamento
  const handleSubmit = (e) => {
    e.preventDefault()

    const medData = {
      ...medicamento,
      description,
      ch,
      name
    }

    if (medExists(medicamentos, medicamento._id, medData)) {
      return dispatch(startAlert({
        alertMessage: 'El medicamento ya existe',
        alertType: 'error'
      }))
    }

    // TODO: Utilizar un estas seguro por si viene vacio
    startUpdateMedicamento(medicamento._id, medData)
    onCancel()
  }

  const handleRemoveMed = (id) => {
    const medUpdated = {
      ...medicamento,
      medicines: medicamento.medicines.filter(med => med._id !== id)
    }

    startUpdateMedicamento(medicamento._id, medUpdated)
  }

  const handleOnChangeInnerMeds = (newInnerMed) => {
    const newInnerMeds = [
      ...medicamento.medicines,
      { ...newInnerMed, _id: newInnerMed.id }
    ]
    const medUpdated = {
      ...medicamento,
      medicines: newInnerMeds
    }
    startUpdateMedicamento(medicamento._id, medUpdated)
  }

  const handleChChange = (e) => {
    setValues({ ...values, ch: e.target.value })
  }

  return (
    <>
      <div className='med-titlename'>
        <input
          name='name'
          type='text'
          value={name}
          onChange={handleChange}
        />
      </div>
      {medicamento.type === medicineTypes.Medicamento
        ? (
          <div className='med-ch'>
            <RadioOptions
              options={chOptions}
              value={ch}
              onChange={handleChChange}
            />
          </div>
          )
        : null}
      <div className='med-data'>
        {/* TODO: No mostrar el formulario si tiene un ch el medicamento  */}
        {medicamento.type === medicineTypes.Medicamento
          ? null
          : (
            <div className='inner-med-list'>
              <h4>Medicamentos</h4>
              <InnerMedsForm
                innerMeds={medicamento.medicines}
                onRemoveInnerMeds={handleRemoveMed}
                onChangeInnerMeds={handleOnChangeInnerMeds}
              />
            </div>)}
        <div className='med-description'>
          <div>
            <h4>Prescripciones</h4>
            <button>
              Agregar prescripcion
            </button>
          </div>
          {medicamento.prescription.map(pres => (
            <p key={pres._id}>{pres.description}</p>
          ))}
        
        <form
          onSubmit={handleSubmit}
        >
          <h4>Prescripcion</h4>
          <textarea
            name='description'
            value={description}
            onChange={handleChange}
            rows='20'
          />
          <div className='align-content-end submit-button-container'>
            <button
              type='submit'
              className='simple'
              onClick={onCancel}
            >Cancelar
            </button>
            <button
              type='submit'
              className='primary'
            >Guardar cambios
            </button>
          </div>
        </form>
        </div>
      </div>
    </>
  )
}
