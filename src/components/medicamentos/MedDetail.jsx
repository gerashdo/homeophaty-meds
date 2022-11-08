import { MedSmallCard } from "./MedSmallCard"
import { useForm } from "../../hooks/useForm"

import './med-detail.css'

export const MedDetail = ({ medicamento }) => {
    const [ values, handleChange ] = useForm({ descripcion: ''})
    const { descripcion } = values

    const handleRemoveMed = ( id ) => {
        console.log( id )
    }
    
    return (
        <>
            <div className="med-titlename">
                <h3>{ medicamento.name } { medicamento.ch }</h3>
            </div>
            <div className="med-data">
                {
                    medicamento.medicines.length > 0
                    && 
                    (
                    <div className="inner-med-list">
                        <h4>Medicamentos</h4>
                        <ul>
                            {
                                medicamento.medicines.map( med => (
                                    <MedSmallCard
                                        key={ med._id } 
                                        medicamento={ med }
                                        onCloseInnerMed={ handleRemoveMed }
                                    />
                                ))
                            }
                        </ul>
                    </div>
                    )
                }
                <form action="">
                    <h4>Prescripcion</h4>
                    <textarea 
                        name="descripcion"
                        value={ descripcion }
                        onChange={ handleChange }
                        rows='10'
                    />
                </form>
            </div>
        </>
    )
}
