import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { startAlert } from '../../store/slices/ui'
import { searchStringInMed } from '../../helpers'
import { DinamicSearchInput } from './DinamicSearchInput'

import './inner-meds.css'

// Parametros
// onChangeInnerMeds: Accion a realizar cuando se agregue un nuevo medicamento
// innerMeds: Lista de innerMeds actuales
export const MedicineIncluder = ({ onChangeInnerMeds, innerMeds = [] }) => {
  const dispatch = useDispatch()
  const [medicine, setMedicine] = useState('')
  const { medicamentos } = useSelector(state => state.medicamento)

  const handleAddMedicine = (e) => {
    e.preventDefault()

    // Si el medicamento ya esta dentro del los inner meds
    if (searchStringInMed(medicine, innerMeds).length > 0) {
      return dispatch(startAlert({
        alertMessage: 'El medicamento ya se encuentra en la lista',
        alertType: 'info'
      }))
    }

    const medsFound = searchStringInMed(medicine, medicamentos)

    // Si hay mas de un resultado con el texto introducido en el input
    if (medsFound.length > 1) {
      return dispatch(startAlert({
        alertMessage: 'Hay más de un medicamento con el nombre que introdujo',
        alertType: 'info'
      }))
    }

    onChangeInnerMeds(medsFound[0])

    // reset()
  }

  return (
    <div className='flex gap-1'>
      <DinamicSearchInput onSelectValue={(newValue) => setMedicine(newValue)} valuesList={medicamentos} />
      <button
        className='bg-gray-100 rounded-md px-4 py-2 ml-2 text-black hover:bg-gray-300 cursor-pointer'
        onClick={handleAddMedicine}
      >
        + Agregar medicamento
      </button>
    </div>
  )
}

MedicineIncluder.propTypes = {
  onChangeInnerMeds: PropTypes.func.isRequired,
  innerMeds: PropTypes.arrayOf(PropTypes.object)
}
