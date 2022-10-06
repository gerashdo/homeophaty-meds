import { MedList } from "../components/medicamentos/MedList"
import { NewMedForm } from "../components/medicamentos/NewMedForm"
import { TemplateSystemPage } from "./TemplateSystemPage"


export const MedsPage = () => {
    
    return (
        <>
            <TemplateSystemPage>
                <main>
                    <div>
                        <button type="button">Nuevo</button>
                    </div>
                    <div>
                        <input id="med-search" type="text" />
                        <button type="button">Buscar</button>
                    </div>
                    <MedList />
                    <NewMedForm />
                </main>
            </TemplateSystemPage>
        </>
    )
}

