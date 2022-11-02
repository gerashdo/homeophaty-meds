import { MedList } from "../components/medicamentos/MedList"
import { NewMedForm } from "../components/medicamentos/NewMedForm"
import { TemplateSystemPage } from "./TemplateSystemPage"
import { useForm } from "../hooks/useForm"

import "./meds-page.css"


export const MedsPage = () => {

    const [ values, handleChange ] = useForm({ medName: ''})
    const { medName } = values

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
                                onChange={ handleChange }
                                value={ medName }
                            />
                        </div>
                        <MedList
                            searchVariable={ medName }
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

