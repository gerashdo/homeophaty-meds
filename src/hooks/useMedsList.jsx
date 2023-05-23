import { useEffect, useRef, useState } from 'react'
import { useMedsStore } from './useMedsStore'
import { useModal } from './useModal'
import { useNavigate } from 'react-router-dom'
import { searchStringInMed } from '../helpers'

export const useMedsList = (searchVariable) => {
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

  return {
    isOpen,
    medsList,
    closeModal,
    setMedicineToDelete,
    deleteMedicine,
    navigateToMedicine
  }
}
