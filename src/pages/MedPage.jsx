import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { TemplateSystemPage } from "./TemplateSystemPage"
import { MedDetail } from "../components/medicamentos/MedDetail"
import { getMedById } from "../helpers"

import './med-page.css'


export const MedPage = () => {
    const { medId } = useParams()
    const { medicamentos } = useSelector( state => state.medicamento  )

    const [ medicamento, setMedicamento ] = useState(null)

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
