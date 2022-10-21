import React from 'react'
import { medList } from '../../helpers/medList'
import { MedSimpleCard } from './MedSimpleCard'

import './med-list.css'

export const MedList = () => {
    const medsList = medList
    console.log(medsList)
    return (
        <div id="med-list" className='med-list'>
            {
                medsList.map(med => (
                    <MedSimpleCard  key={ med.id } medicamento={ med } />
                ))
            }
        </div>
  )
}
