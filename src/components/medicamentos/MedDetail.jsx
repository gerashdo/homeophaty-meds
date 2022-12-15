import { MedSmallCard } from "./MedSmallCard"
import { medicineTypes } from "../../helpers"

import './med-detail.css'

export const MedDetail = ({ medicamento }) => {
    
    return (
        <>
            <div className="med-titlename">
                <h3>{ medicamento.name } { medicamento.ch }</h3>
            </div>
            <div className="med-data">
                {
                    medicamento.type === medicineTypes.Medicamento
                    ? null 
                    :(<div className="inner-med-list">
                        <h4>Medicamentos</h4>
                        {
                            medicamento.medicines.map( med => (
                                <MedSmallCard
                                    key={ med._id || med.id } 
                                    medicamento={ med }
                                    isDelete={ false }
                                />
                            ))
                        }
                    </div>)
                }
                <div className="med-description">
                    <h4>Prescripcion</h4>
                    <textarea 
                        name="descripcion"
                        value={ medicamento.description }
                        rows='20'
                        readOnly
                    />
                </div>
            </div>
        </>
    )
}
