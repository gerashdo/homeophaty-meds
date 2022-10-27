
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { DinamicSelector } from '../iterface/DinamicSelector';

import './inner-meds.css'

export const InnerMedsForm = () => {

  const { medicamentos } = useSelector( state => state.medicamento )
  const [ values, handleChange ] = useForm({ medicamento: '' })
  const { medicamento } = values
  const [ focused, setFocused ] = useState( false )


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
