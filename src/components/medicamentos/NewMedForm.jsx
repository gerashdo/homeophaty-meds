import { useState } from "react"
import { useDispatch } from "react-redux"
import { useForm } from "../../hooks/useForm"
import { addNewMedicamento } from "../../store/slices/medicamentos"
import { InnerMedsForm } from "./InnerMedsForm"
import { MedSmallCard } from "./MedSmallCard"


const chOptions = ['-----','6', '30', '200', '1000']
export const NewMedForm = () => {

    const dispatch = useDispatch()

    const [ innerMeds, changeInnerMeds ] = useState([])
    const [ values, handleChange ] = useForm({ name:'', ch:'' })
    const { name, ch } = values

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const data = {
            name,
            ch,
            medicines: innerMeds.map( med => med.id )
        }
        dispatch( addNewMedicamento( data ) )
    }

    return (
        <>
            <h5>Crear medicamento</h5>
            <form 
                className="form"
                onSubmit={ handleSubmit }
            >
                <div>
                    <label htmlFor="med_name">Nombre</label>
                    <input 
                        id="med_name" 
                        name="name"
                        className="process"
                        value={ name }
                        onChange={ handleChange }
                    />
                </div>

                <div className="input-group-h">
                    <select 
                        id="med_ch" 
                        name="ch"
                        className="process"
                        value={ ch }
                        onChange={ handleChange }
                    >
                        {
                            chOptions.map( ch => (
                                <option key={ch} value={ch}>{ ch }</option>
                            ))
                        }
                    </select>
                    <label 
                        htmlFor="med_ch"
                        className="group-label"
                    >CH</label>
                </div>
                {
                    innerMeds.length > 0 && (
                        <div>
                            <ul>
                                {
                                    innerMeds.map( med => (
                                        <MedSmallCard key={ med.id } medicamento={ med } />
                                    ))
                                }
                            </ul>
                        </div>
                    )
                }

                <div>
                    <label htmlFor="inner_meds">Agregar medicamentos</label>
                    <InnerMedsForm 
                        id="inner_meds"
                        onChangeInnerMeds={ changeInnerMeds }
                        innerMeds={ innerMeds }
                    />
                </div>

                <button 
                    type="submit"
                    className="primary"
                >
                    Guardar
                </button>
            </form>
        </>
    )
}
