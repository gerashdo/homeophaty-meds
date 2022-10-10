import { MedList } from "../components/medicamentos/MedList"
import { NewMedForm } from "../components/medicamentos/NewMedForm"
import { TemplateSystemPage } from "./TemplateSystemPage"

import "./meds-page.css"


export const MedsPage = () => {
    
    return (
        <>
            <TemplateSystemPage>
                <main className="meds">
                    <section className="section meds-list">
                        <div>
                            <input 
                                id="med-search" 
                                type="text"
                                className="interface"
                                placeholder="Buscar"
                            />
                            <button type="button">Buscar</button>
                        </div>
                        <MedList />
                    </section>
                </main>
                <aside className="aside">
                    <NewMedForm />
                </aside>
            </TemplateSystemPage>
        </>
    )
}

