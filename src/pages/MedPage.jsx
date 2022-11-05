import { useMemo } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { TemplateSystemPage } from "./TemplateSystemPage"


export const MedPage = () => {
    const { medId } = useParams()
    const { medicamentos } = useSelector( state => state.medicamento )
    
    const getMedicamentoById = ( id ) => {
        return medicamentos.find( med => med.id === id )
    }

    const medicamento = useMemo(() => getMedicamentoById( medId ), [ medId ])
    console.log(medicamento)

    return (
        <TemplateSystemPage>
            <div>MedPage</div>
        </TemplateSystemPage>
    )
}
