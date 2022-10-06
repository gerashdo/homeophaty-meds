import React from 'react'
import { medList } from '../../helpers/medList'

export const MedList = () => {
    const medsList = medList
    console.log(medsList)
    return (
        <div id="med-list">
            {
                medsList.map(med => (
                    <div key={med.id}>
                        <h5> {med.name} {med.ch }</h5>
                    </div>
                ))
            }
        </div>
  )
}
