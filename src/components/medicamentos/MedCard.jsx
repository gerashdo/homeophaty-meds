import { useState } from 'react'
import { Link } from 'react-router-dom'
import { medDescriptionForCard } from '../../helpers'
import { DialogModal } from '../iterface/DialogModal'

import './med-card.css'

export const MedCard = ({ medicamento, onCloseCard }) => {

    const [ open, setOpen ] = useState( false )

    const handleCloseCard = (e) => {
        setOpen( true )
    }

    const onCancelModal = () => {
        setOpen( false )
    }

    const onAcceptModal = () =>{
        onCloseCard( medicamento.id )
    }

    return (
        <>
            <div className="med-card">
                <button
                    className='negative close-button'
                    onClick={ handleCloseCard }
                    >x</button>
                <div className='med-card-content'>
                    <h4 className={`title ${ medicamento.ch ? 'normal': 'formula'}`}>
                        { medicamento.name } { medicamento.ch }
                    </h4>
                    <p>
                        { medDescriptionForCard( medicamento.description ) }
                    </p>
                </div>
                <div className='card-footer'>
                    <Link to={ `/medicamentos/${ medicamento.id }` }>
                        <button className='primary'>
                            Ver detalles
                        </button>
                    </Link>
                </div>
            </div>
            <DialogModal
                title='Este es el titulo'
                content='Estas seguro de eliminar este medicamento'
                open={ open } 
                onClose={ onCancelModal }
                onAccept={ onAcceptModal }
            />
        </>
    )
}
