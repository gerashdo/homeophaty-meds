import { useState } from 'react'
import { Link } from 'react-router-dom'
import { medDescriptionForCard, medicineTypes } from '../../helpers'
import { DialogModal } from '../iterface/DialogModal'

import './med-card.css'
import { useModal } from '../../hooks/useModal'

export const MedCard = ({ medicamento, onCloseCard }) => {

    const { isOpen, openModal, closeModal } = useModal()

    const handleCloseCard = (e) => {
        openModal()
    }

    const onCancelModal = () => {
        closeModal()
    }

    const onAcceptModal = () =>{
        onCloseCard( medicamento._id )
    }

    return (
        <>
            <div className="med-card">
                <button
                    className='negative close-button'
                    onClick={ handleCloseCard }
                    >x</button>
                <div className='med-card-content'>
                    <h4 className={`title ${ medicamento.type === medicineTypes.Medicamento ? 'medicamento': 'formula'}`}>
                        { medicamento.name } { medicamento.ch }
                    </h4>
                    <p>
                        { medDescriptionForCard( medicamento.description ) }
                    </p>
                </div>
                <div className='card-footer'>
                    <Link to={ `/medicamentos/${ medicamento._id }` }>
                        <button className='primary'>
                            Ver detalles
                        </button>
                    </Link>
                </div>
            </div>
            <DialogModal
                title='Confirmación de Eliminación'
                content="¿Estas seguro de que quieres eliminar este medicamento?"
                open={ isOpen } 
                onClose={ onCancelModal }
                onAccept={ onAcceptModal }
            />
        </>
    )
}
