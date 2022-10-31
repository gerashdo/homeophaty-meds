import { BsFillXCircleFill } from "react-icons/bs";

import './med-small-card.css'

export const MedSmallCard = ({ medicamento, onCloseInnerMed }) => {

    const handleCloseCard = ({ target }) =>{
        const id = target.closest('div').id
        
        onCloseInnerMed( id )
    }
    return (
        <div
            className='med-small-card'
        >
            <div>
                { medicamento.name } { medicamento.ch }
            </div>
            <div 
                className="cancel-button"
                id={ medicamento.id }
                onClick={ handleCloseCard }
            >
                <BsFillXCircleFill />
            </div>
        </div>
  )
}
