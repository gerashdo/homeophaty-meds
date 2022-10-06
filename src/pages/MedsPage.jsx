import { MedList } from "../components/medicamentos/MedList"
import { NewMedForm } from "../components/medicamentos/NewMedForm"


export const MedsPage = () => {
    
    return (
        <>
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
             
        </>
    )
}

