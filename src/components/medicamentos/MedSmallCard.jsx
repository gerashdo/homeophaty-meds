import { BsFillXCircleFill } from "react-icons/bs";

import './med-small-card.css'

export const MedSmallCard = ({ medicamento }) => {
  return (
    <div
        className='med-small-card'
    >
        <div>
            { medicamento.name } { medicamento.ch }
        </div>
        <div 
            className="cancel-button"
        >
            <BsFillXCircleFill />
        </div>
    </div>
  )
}
