
import { useEffect, useRef } from 'react'
import './dialog-modal.css'

export const DialogModal = ({ title, content, open, onClose, onAccept }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (open) {
      ref.current?.showModal()
    } else {
      ref.current?.close()
    }
  }, [open])

  const handleAccept = () => {
    onAccept()
    onClose()
  }

  return (
    <dialog
      ref={ref}
      className='dialog-modal'
    >
      <header className='title'>
        <h4>{title}</h4>
      </header>

      <p
        className='content'
      >
        {content}
      </p>
      <footer
        className='footer'
      >
        <button
          onClick={() => onClose()}
          className='simple'
        >
          Cancelar
        </button>
        <button
          onClick={handleAccept}
          className='primary'
        >
          Aceptar
        </button>
      </footer>
    </dialog>
  )
}
