import { useDispatch } from "react-redux"
import { MedSmallCard } from "./MedSmallCard"
import { useForm } from "../../hooks/useForm"
import { startUpdateMedicamento } from "../../store/slices/medicamentos"
import { InnerMedsForm } from "./InnerMedsForm"
import { chOptions, medicineTypes } from "../../helpers"

import './med-detail-edit.css'
import { RadioOptions } from "../iterface/RadioOptions"

export const MedDetailEdit = ({ medicamento, onCancel }) => {
    const dispatch = useDispatch()
    const [ values, handleChange, setValues ] = useForm({
        name: medicamento.name,
        description: medicamento.description,
        ch: medicamento.ch
     })
    const { description, name, ch } = values

    // TODO: Agregar dispatch para guardar la descripcion del medicamento
    const handleSubmit = (e) => {
        e.preventDefault()
        // TODO: Utilizar un estas seguro por si viene vacio
        dispatch( startUpdateMedicamento( medicamento.id, { 
            ...medicamento,
            description,
            ch,
            name
        }))
        onCancel()
    }

    const handleRemoveMed = ( id ) => {
        const medUpdated = { 
            ...medicamento, 
            medicines: medicamento.medicines.filter( med => med._id !== id )
        }

        dispatch( startUpdateMedicamento( medicamento.id, medUpdated ) )
    }

    const handleOnChangeInnerMeds = ( newInnerMeds ) => {
        const medUpdated = {
            ...medicamento,
            medicines: newInnerMeds
        }
        dispatch( startUpdateMedicamento( medicamento.id, medUpdated ) )
    }

    const handleChChange = ( e ) => {
        setValues({ ...values, ch: e.target.value })
    }
    
    return (
        <>
            <div className="med-titlename">
                <input
                    name="name"
                    type="text"
                    value={ name }
                    onChange={ handleChange }
                />
            </div>
            {
                medicamento.type === medicineTypes.Medicamento
                ? (
                    <div className="med-ch">
                        <RadioOptions 
                            options={ chOptions }
                            value={ ch }
                            onChange={ handleChChange }
                        />
                    </div>
                )
                : null
            }
            <div className="med-data">
                {/* TODO: No mostrar el formulario si tiene un ch el medicamento  */}
                {
                    medicamento.type === medicineTypes.Medicamento
                    ? null 
                    :(<div className="inner-med-list">
                        <h4>Medicamentos</h4>
                        <InnerMedsForm 
                            onChangeInnerMeds={ handleOnChangeInnerMeds }
                            innerMeds={ medicamento.medicines }
                        />
                        {
                            medicamento.medicines.length > 0
                            && 
                            (
                                <>
                                    {
                                        medicamento.medicines.map( med => (<MedSmallCard
                                            key={ med._id || med.id } 
                                            medicamento={ med }
                                            onCloseInnerMed={ handleRemoveMed }
                                            isDelete={ true }
                                        />))
                                    }
                                </>
                            )
                        }
                    </div>)
                }
                <form
                    onSubmit={ handleSubmit }
                >
                    <h4>Prescripcion</h4>
                    <textarea 
                        name="description"
                        value={ description }
                        onChange={ handleChange }
                        rows='20'
                    />
                    <div className="align-content-end submit-button-container">
                        <button 
                            type="submit"
                            className="simple"
                            onClick={ onCancel }
                        >Cancelar</button>
                        <button 
                            type="submit"
                            className="primary"
                        >Guardar descripción</button>
                    </div>
                </form>
            </div>
        </>
    )
}

