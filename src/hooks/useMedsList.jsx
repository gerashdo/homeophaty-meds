import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useMedsStore } from './useMedsStore'
import { changeEditingMedicine } from '../store/slices/medicamentos'
import { useModal } from './useModal'
import { searchStringInMed } from '../helpers'

export const useMedsList = (searchVariable) => {
  const dispatch = useDispatch()
  const { medicamentos, startDeleteMedicamento } = useMedsStore()
  const { isOpen, closeModal, openModal } = useModal()
  const [medsList, setMedsList] = useState(medicamentos)
  const medicineIdToDelete = useRef('')
  const navigate = useNavigate()

  useEffect(() => {
    if (searchVariable) {
      setMedsList(searchStringInMed(searchVariable, medicamentos))
    } else {
      setMedsList(medicamentos)
    }
  }, [medicamentos, searchVariable])

  const setMedicineToDelete = (medId) => {
    medicineIdToDelete.current = medId
    openModal()
  }

  const deleteMedicine = () => {
    if (!medicineIdToDelete.current) return
    startDeleteMedicamento(medicineIdToDelete.current)
    medicineIdToDelete.current = ''
  }

  const navigateToMedicine = (medId) => {
    navigate(`/medicamentos/${medId}`)
  }

  const navigateMedicineDetails = (medId) => {
    dispatch(changeEditingMedicine(false))
    navigateToMedicine(medId)
  }

  const navigateEditMedicine = (medId) => {
    dispatch(changeEditingMedicine(true))
    navigateToMedicine(medId)
  }

  return {
    isOpen,
    medsList,
    closeModal,
    setMedicineToDelete,
    deleteMedicine,
    navigateMedicineDetails,
    navigateEditMedicine
  }
}
