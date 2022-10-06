import { MedList } from "../components/medicamentos/MedList"


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
            </main>
             
        </>
    )
}

