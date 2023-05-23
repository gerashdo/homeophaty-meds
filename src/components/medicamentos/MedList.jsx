import { useEffect, useRef, useState } from 'react'
import { CgTrash, CgPen } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'

import { useMedsStore } from '../../hooks'
import { DialogModal } from '../iterface/DialogModal'
import { useModal } from '../../hooks/useModal'
import { searchStringInMed } from '../../helpers'

import './med-list.css'

export const MedList = ({ searchVariable }) => {
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

  return (
    <>
      <table className='med-list' cellSpacing='0'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>CH</th>
            <th>Tipo</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {
            medsList.map(med => (
              <tr key={med._id}>
                <td
                  className='name'
                  onClick={() => navigateToMedicine(med._id)}
                >
                  {med.name}
                </td>
                <td>{med.ch}</td>
                <td>{med.type}</td>
                <td className='actions'>
                  <button
                    className='action'
                    onClick={() => setMedicineToDelete(med._id)}
                  >
                    <CgTrash />
                  </button>
                  <button
                    className='action'
                  >
                    <CgPen />
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <DialogModal
        title='Confirmación de Eliminación'
        content='¿Estas seguro de que quieres eliminar este medicamento?'
        open={isOpen}
        onClose={closeModal}
        onAccept={deleteMedicine}
      />
    </>
  )
}
