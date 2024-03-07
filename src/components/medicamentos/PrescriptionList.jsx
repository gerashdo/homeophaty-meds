import React from 'react'
import { CgTrash, CgPen } from 'react-icons/cg'

import './prescription-list.css'

export const PrescriptionList = ({ presccriptions }) => {
  return (
    <ul className='flex flex-col gap-5'>
      {presccriptions.map(pres => (
        <li key={pres._id} className='flex flex-col border rounded-lg border-gray-300 py-4 px-5 shadow justify-between items-center'>
          <div className='flex gap-3 w-full mb-3 justify-end'>
            <button className='hidden-btn text-gray-400 hover:text-gray-600 p-1 flex gap-1'>
              <CgPen /><span>Editar</span>
            </button>
            <button className='hidden-btn text-gray-400 hover:text-gray-600 p-1 flex gap-1'>
              <CgTrash /><span>Eliminar</span>
            </button>
          </div>
          <p className='text-start w-full'>
            {pres.description}
          </p>
        </li>
      ))}
    </ul>
  )
}
