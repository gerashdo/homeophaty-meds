import { Link } from 'react-router-dom'
import { medDescriptionForCard } from '../../helpers'

import './med-card.css'

export const MedCard = ({ medicamento }) => {

    return (
        <div className="med-card">

            <div className='med-card-content'>
                <h4 className='title'>
                    { medicamento.name } { medicamento.ch }
                </h4>
                <p>
                    { medDescriptionForCard( medicamento.description ) }
                </p>
            </div>
            <div>
                <Link to={ `/medicamentos/${ medicamento.id }` }>
                <button className='primary'>
                    Ver detalles
                </button>
                </Link>
            </div>
        </div>
    )
}
