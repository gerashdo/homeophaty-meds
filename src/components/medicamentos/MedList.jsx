import React from 'react'
import { useSelector } from 'react-redux'
import { MedSimpleCard } from './MedSimpleCard'

import './med-list.css'

export const MedList = () => {

    const { medicamentos } = useSelector( state => state.medicamento )

    return (
        <div id="med-list" className='med-list'>
            {
                medicamentos.map(med => (
                    <MedSimpleCard  key={ med.id } medicamento={ med } />
                ))
            }
        </div>
  )
}
