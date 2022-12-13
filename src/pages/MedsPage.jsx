import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { TemplateSystemPage } from "./TemplateSystemPage"
import { MedList } from "../components/medicamentos/MedList"
import { NewMedForm } from "../components/medicamentos/NewMedForm"
import { useMedsStore } from "../hooks"
import { changeSearchValue } from "../store/slices/medicamentos"

import "./meds-page.css"


export const MedsPage = () => {
    const dispatch = useDispatch()
    const { searchValue } = useSelector( state => state.medicamento )
    const { startLoadingMedicamentos } = useMedsStore()

    useEffect(() => {
        startLoadingMedicamentos()
    }, [])

    return (
        <>
            <TemplateSystemPage>
                <main className="meds">
                    <section className="section meds-list">
                        <div>
                            <input 
                                id="med-search" 
                                type="text"
                                className="interface med-search"
                                placeholder="Buscar"
                                name="medName"
                                onChange={ (e) => dispatch( changeSearchValue( e.target.value )) }
                                value={ searchValue }
                            />
                        </div>
                        <MedList
                            searchVariable={ searchValue }
                        />
                    </section>
                </main>
                <aside className="aside">
                    <NewMedForm />
                </aside>
            </TemplateSystemPage>
        </>
    )
}

