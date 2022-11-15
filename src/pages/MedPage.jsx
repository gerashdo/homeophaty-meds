import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { TemplateSystemPage } from "./TemplateSystemPage"
import { MedDetail } from "../components/medicamentos/MedDetail"
import { getMedById } from "../helpers"
import { NewMedForm } from "../components/medicamentos/NewMedForm"

import './med-page.css'
import { MedDetailEdit } from "../components/medicamentos/MedDetailEdit"


export const MedPage = () => {
    const { medId } = useParams()
    const { medicamentos } = useSelector( state => state.medicamento  )

    const [ medicamento, setMedicamento ] = useState(null)
    const [ edit, setEdit ] = useState( false )

    useEffect(() => {
      if( medicamentos ){
        setMedicamento( getMedById( medId, medicamentos ) )
      }
    }, [medicamentos, medId])
    

    return (
        <TemplateSystemPage>
            <main className="med">
                <section className="section med-detail-container">
                    {   
                        medicamento
                        ? 
                            edit
                            ? (<MedDetailEdit
                                    medicamento={ medicamento }
                                    onCancel={ () => setEdit( false )}
                            />)
                            :(<>
                                <div className="align-content-end">
                                    <button 
                                        className="simple"
                                        onClick={ () => setEdit( true )}
                                    >
                                        Editar medicamento
                                    </button>
                                </div>
                                <MedDetail 
                                    medicamento={ medicamento }
                                />
                            </>)
                        : (<div>
                            Loading
                        </div>)
                    }
                </section>
            </main>
            <aside className="aside">
                <NewMedForm />
            </aside>
        </TemplateSystemPage>
    )
}
