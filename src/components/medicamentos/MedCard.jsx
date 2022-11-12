import { Link } from 'react-router-dom'
import { medDescriptionForCard } from '../../helpers'

import './med-card.css'

export const MedCard = ({ medicamento, onCloseCard }) => {

    const handleCloseCard = (e) => {
        onCloseCard( medicamento.id )
    }

    return (
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
    )
}
