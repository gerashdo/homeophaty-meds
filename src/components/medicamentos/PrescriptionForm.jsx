import React from 'react'
import { useForm } from '../../hooks/useForm'

export const PrescriptionForm = ({ onSubmit, value, onCancel }) => {
  const [values, handleChange, setValues] = useForm({
    description: ''
  })
  const { description } = values

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(description)
    setValues({ description: '' })
  }

  return (
    <div className='bg-gray-200 rounded-md my-5 p-2'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-2 w-full'
      >
        <textarea
          name='description'
          value={description}
          onChange={handleChange}
          rows='5'
          className='rounded-md  overflow-auto bg-inherit resize-none outline-none py-1 px-2'
        />
        <div className='flex justify-end gap-2'>
          <button
            type='button'
            className='bg-inherit rounded-md px-4 py-3 text-black hover:bg-gray-300 cursor-pointer'
            onClick={onCancel}
          >Cancelar
          </button>
          <button
            type='submit'
            className='bg-gray-100 rounded-md px-4 py-3 text-black hover:bg-gray-300 cursor-pointer'
          >Guardar prescripción
          </button>
        </div>
      </form>
    </div>
  )
}
