import { useDispatch } from "react-redux"
import { MedSmallCard } from "./MedSmallCard"
import { useForm } from "../../hooks/useForm"
import { startUpdateMedicamento } from "../../store/slices/medicamentos"
import { InnerMedsForm } from "./InnerMedsForm"
import { medicineTypes } from "../../helpers"

import './med-detail-edit.css'

export const MedDetailEdit = ({ medicamento }) => {
    const dispatch = useDispatch()
    const [ values, handleChange ] = useForm({ descripcion: medicamento.description })
    const { descripcion } = values

    // TODO: Agregar dispatch para guardar la descripcion del medicamento
    const handleSubmit = (e) => {
        e.preventDefault()
        // TODO: Utilizar un estas seguro por si viene vacio
        dispatch( startUpdateMedicamento( medicamento.id, { 
            ...medicamento,
            description: descripcion
        }))
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
    
    return (
        <>
            <div className="med-titlename">
                <h3>{ medicamento.name } { medicamento.ch }</h3>
            </div>
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
                        name="descripcion"
                        value={ descripcion }
                        onChange={ handleChange }
                        rows='10'
                    />
                    <div className="submit-button-container">
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

