import React from 'react'
import { CgTrash } from 'react-icons/cg'

import './inner-meds-list.css'

export const InnerMedsList = ({ innerMeds, onRemoveInnerMeds }) => {
  return (
    <ul className='mb-4 flex gap-3'>
      {innerMeds.map(med => (
        <li key={med._id} className='flex border-2 border-gray-300 px-3 py-1 rounded-md  items-center justify-between'>
          <span>{med.name} {med.ch}</span>
          <button className='delete-btn text-gray-400 hover:text-gray-600 p-1' onClick={() => onRemoveInnerMeds(med._id)}><CgTrash /></button>
        </li>
      ))}
    </ul>
  )
}
