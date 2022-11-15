import { useEffect } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { chOptions, formatMedData, medicineTypes } from "../../helpers"
import { useForm } from "../../hooks/useForm"
import { addNewMedicamento } from "../../store/slices/medicamentos"
import { InnerMedsForm } from "./InnerMedsForm"
import { MedSmallCard } from "./MedSmallCard"
import { RadioOptions } from "./RadioOptions"

import './new-med-form.css'


export const NewMedForm = () => {
    const dispatch = useDispatch()

    const [ innerMeds, changeInnerMeds ] = useState([])
    const [ values, handleChange, setValues, reset ] = useForm({ name:'', ch:'', type: medicineTypes.Medicamento })
    const { name, ch, type } = values

    const [ radioButtonValue, setRadioButtonValue ] = useState('')
    useEffect(() => {
      setRadioButtonValue( Object.keys( medicineTypes ).find( key => medicineTypes[ key ] === type ))
    }, [type])
    

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const data = formatMedData({
            name,
            ch,
            medicines: innerMeds.map( med => med.id ),
            type
        })

        dispatch( addNewMedicamento( data ) )

        changeInnerMeds([])
        reset()
    }

    const handleRemoveInnerMed = ( id ) => {
        changeInnerMeds( innerMeds.filter( med => med.id !== id ) )
    }

    const handleRadioInputChange = ( e ) => {
        setValues({ ...values, type: medicineTypes[ e.target.value ] })
    }

    const handleChRadioInputChange = (e) => {
        setValues({ ...values, ch: e.target.value })
    }

    return (
        <>
            <h5>Crear medicamento</h5>
            <form 
                className="form"
                onSubmit={ handleSubmit }
            >
                <div className="group-form">
                    <label htmlFor="med_name">Nombre</label>
                    <input 
                        id="med_name" 
                        name="name"
                        className="process"
                        value={ name }
                        onChange={ handleChange }
                    />
                </div>
                <div className="group-form">
                    <label htmlFor="med_type">Tipo</label>
                    <RadioOptions 
                        options={ Object.keys( medicineTypes )}
                        value={ radioButtonValue }
                        onChange={ handleRadioInputChange }
                    />
                </div>

                {
                    type === medicineTypes.Medicamento
                    ? (
                        <div className="group-form">
                            <label htmlFor="med_type">CH</label>
                            <RadioOptions 
                                options={ chOptions }
                                value={ ch }
                                onChange={ handleChRadioInputChange }
                            />
                        </div>
                    )
                    : (
                        <>
                            {
                                innerMeds.length > 0 && (
                                    <div>
                                        <ul>
                                            {
                                                innerMeds.map( med => (
                                                    <MedSmallCard 
                                                    key={ med.id } 
                                                    medicamento={ med }
                                                    onCloseInnerMed={ handleRemoveInnerMed }
                                                    />
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
                        </>
                    )
                }

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
