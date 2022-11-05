

import { Link } from 'react-router-dom'
import './med-simple-card.css'

export const MedSimpleCard = ({ medicamento }) => {
  return (
    <div className="simple-card">
        <div className='title'>
            { medicamento.name } { medicamento.ch }
        </div>
        <div>
            <button className='primary'>
              <Link to={ `/medicamentos/${ medicamento.id }` }>
                Ver detalles
              </Link>
            </button>
        </div>
    </div>
  )
}
