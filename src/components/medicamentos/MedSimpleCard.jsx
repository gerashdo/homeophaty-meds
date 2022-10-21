

import './med-simple-card.css'

export const MedSimpleCard = ({ medicamento }) => {
  return (
    <div className="simple-card">
        <div className='title'>
            { medicamento.name } { medicamento.ch }
        </div>
        <div>
            <button className='primary'>Ver detalles</button>
        </div>
    </div>
  )
}
