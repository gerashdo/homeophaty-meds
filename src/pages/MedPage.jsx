import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { TemplateSystemPage } from "./TemplateSystemPage"
import { useEffect } from "react"
import { useState } from "react"
import { MedDetail } from "../components/medicamentos/MedDetail"

import './med-page.css'


export const MedPage = () => {
    const { medId } = useParams()
    const { medicamentos } = useSelector( state => state.medicamento  )

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
    

    return (
        <TemplateSystemPage>
            <main className="med">
                <section className="section med-detail-container">
                    {   
                        medicamento
                        ? <MedDetail 
                                medicamento={ medicamento }
                            />
                        : (<div>
                            Loading
                        </div>)
                    }
                </section>
            </main>
        </TemplateSystemPage>
    )
}
