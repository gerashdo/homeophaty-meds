

import { Link } from 'react-router-dom'
import './med-simple-card.css'

export const MedSimpleCard = ({ medicamento }) => {
  return (
    <div className="simple-card">
        <div className='title'>
            { medicamento.name } { medicamento.ch }
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
