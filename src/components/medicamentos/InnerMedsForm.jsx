
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { startAlert } from '../../store/slices/ui';
import { DinamicSelector } from '../iterface/DinamicSelector';

import './inner-meds.css'

// Parametros
// onChangeInnerMeds: Accion a realizar cuando se agregue un nuevo medicamento
// innerMeds: Lista de innerMeds actuales
export const InnerMedsForm = ({ onChangeInnerMeds, innerMeds }) => {
  const dispatch = useDispatch()
  const { medicamentos } = useSelector( state => state.medicamento )
  const [ values, handleChange, setValues, reset ] = useForm({ medicamento: '' })
  const { medicamento } = values
  const [ focused, setFocused ] = useState( false )
  const [ valueId, setValueId ] = useState('')

  const changeInputValue = ( newValue ) => {
    setValues({
      ...values,
      medicamento: newValue
    })
  }

  //TODO: Obtener el objeto del que se dio click y esta en el input
  const handleAddMedicine = (e) => {
    e.preventDefault()

    // Validate that the new innerMed is not in the list already
    // Cuando el medicamento se va a crear los innerMeds tienen id
    // Cuando se va a actualizar un medicamento los innerMeds tienen _id
    if( innerMeds.find( med => med.id === valueId || med._id === valueId ) ){
      return dispatch( startAlert({
        alertMessage: 'El medicamento ya se encuentra en la lista',
        alertType: 'info'
      }) )
    }

    const result = medicamentos.find( med => med.id === valueId )

    if( result ){
      onChangeInnerMeds([
        ...innerMeds,
        { ...result, '_id': result.id }
      ])
    }

    reset()
  }

  return (
    <div 
      className='horizontal-input-button'
    >
      <div className='input process relative'>
        <input
          name='medicamento'
          className='inner-input'
          onChange={ handleChange }
          value={ medicamento }
          onFocus={ () => setFocused( true ) }
          onBlur={ () => setFocused( false ) }
        />
        {
          focused
          &&
          <DinamicSelector 
            resetValues={ medicamentos }
            valueForFilter={ medicamento }
            onSetValue={ changeInputValue }
            onSetValueId={ setValueId }
          />
        }
      </div>
      <button
        className='primary'
        onClick={ handleAddMedicine }
      >
        +
      </button>
    </div>
  )
}
