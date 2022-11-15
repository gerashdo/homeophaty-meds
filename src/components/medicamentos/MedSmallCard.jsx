import { BsFillXCircleFill } from "react-icons/bs";

import './med-small-card.css'

export const MedSmallCard = ({ medicamento, onCloseInnerMed, isDelete }) => {

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
            {
                isDelete 
                ? (<div 
                    className="cancel-button"
                    id={ medicamento.id || medicamento._id}
                    onClick={ handleCloseCard }
                >
                    <BsFillXCircleFill />
                </div>)
                : null
            }
            
        </div>
  )
}
