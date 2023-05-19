import { BsFillXCircleFill } from "react-icons/bs";
import PropTypes from "prop-types"

import './med-small-card.css'

export const MedSmallCard = ({ medicamento, onCloseInnerMed, isDelete = false }) => {

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
                    data-testid="cancel-button"
                    className="cancel-button"
                    id={ medicamento._id }
                    onClick={ handleCloseCard }
                >
                    <BsFillXCircleFill />
                </div>)
                : null
            }
            
        </div>
    )
}

MedSmallCard.propTypes = {
    medicamento: PropTypes.object.isRequired,
    onCloseInnerMed: PropTypes.func.isRequired,
    isDelete: PropTypes.bool
}
