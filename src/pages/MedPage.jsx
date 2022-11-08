import { useMemo } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { TemplateSystemPage } from "./TemplateSystemPage"

import './med-page.css'
import { MedSmallCard } from "../components/medicamentos/MedSmallCard"
import { useForm } from "../hooks/useForm"
import { useEffect } from "react"
import { useState } from "react"


export const MedPage = () => {
    const { medId } = useParams()
    const { medicamentos } = useSelector( state => state.medicamento  )
    const [ values, handleChange ] = useForm({ descripcion: ''})
    const { descripcion } = values

    const getMedicamentoById = ( id ) => {
        return medicamentos.find( med => med.id === id )
    }

    const [ medicamento, setMedicamento ] = useState(null)

    useEffect(() => {
      if( medicamentos ){
        setMedicamento( getMedicamentoById( medId ) )
        console.log(medicamento)
      }
    }, [medicamentos, medId])
    

    const handleRemoveMed = ( id ) => {
        console.log( id )
    }

    // TODO: Mover codigo a MedDetail

    return (
        <TemplateSystemPage>
            <main className="med">
                <section className="section med-detail">
                    {   
                        medicamento
                        ? (<>
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
                        </>)
                        : (<div>
                            Loading
                        </div>)
                    }
                </section>
            </main>
        </TemplateSystemPage>
    )
}
