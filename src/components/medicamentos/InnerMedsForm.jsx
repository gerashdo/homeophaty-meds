
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { DinamicSelector } from '../iterface/DinamicSelector';

import './inner-meds.css'

export const InnerMedsForm = () => {
  const { medicamentos } = useSelector( state => state.medicamento )
  const [ values, handleChange, setValues ] = useForm({ medicamento: '' })
  const { medicamento } = values
  const [ focused, setFocused ] = useState( false )

  const changeInputValue = ( newValue ) => {
    setValues({
      ...values,
      medicamento: newValue
    })
  }

  //TODO: Obtener el objeto del que se dio click y esta en el input

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
          />
        }
      </div>
      <button
        className='primary'
      >
        +
      </button>
    </div>
  )
}
