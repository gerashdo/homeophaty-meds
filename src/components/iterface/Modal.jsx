
import React, { useEffect, useRef } from 'react'

import './modal.css'

export const Modal = ({ content, isOpen, onCancel }) => {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [isOpen])

  return (
    <dialog
      ref={dialogRef}
      className='modal'
    >
      <button
        className='negative modal-close'
        onClick={onCancel}
      >
        x
      </button>
      <section className='modal-content'>
        {content}
      </section>
    </dialog>
  )
}
