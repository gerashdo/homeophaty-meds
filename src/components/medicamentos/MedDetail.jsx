import { MedSmallCard } from "./MedSmallCard"
import { useForm } from "../../hooks/useForm"


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
                    medicamento.medicines
                    && 
                    (<ul>
                        {
                            medicamento.medicines.map( med => (
                                <MedSmallCard
                                    key={ med.id } 
                                    medicamento={ med }
                                    onCloseInnerMed={ handleRemoveMed }
                                />
                            ))
                        }
                    </ul>)
                }
                <form action="">
                    <textarea 
                        name="descripcion"
                        value={ descripcion }
                        onChange={ handleChange }
                    />
                </form>
            </div>
        </>
    )
}
