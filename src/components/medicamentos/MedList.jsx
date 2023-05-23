import { CgTrash, CgPen } from 'react-icons/cg'

import { DialogModal } from '../iterface/DialogModal'
import { useMedsList } from '../../hooks/useMedsList'
import { Pill } from '../iterface/Pill'
import { medicineTypes } from '../../helpers'

import './med-list.css'

export const MedList = ({ searchVariable }) => {
  const {
    medsList,
    isOpen,
    navigateToMedicine,
    setMedicineToDelete,
    deleteMedicine,
    closeModal
  } = useMedsList(searchVariable)

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
                <td>
                  {
                    med.type === medicineTypes.Formula
                      ? <Pill text={med.type} color='secondary' />
                      : <Pill text={med.type} color='primary' />
                  }
                </td>
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
