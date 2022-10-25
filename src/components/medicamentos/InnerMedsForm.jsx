import { useSelector } from 'react-redux';
import { DinamicSelector } from '../iterface/DinamicSelector';

import './inner-meds.css'

export const InnerMedsForm = () => {

  const meds = []
  const { medicamentos } = useSelector( state => state.medicamento )

  return (
    <>
      <div className='input process'>
          <input 
            name='inner_med_name'
            className='inner-input'
            />
          <button
            className='primary'
            >
            +
          </button>
      </div>
      <DinamicSelector medicamentos={ medicamentos } />
    </>
  )
}
