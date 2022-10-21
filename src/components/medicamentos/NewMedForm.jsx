import { InnerMedsForm } from "./InnerMedsForm"
import { MedSmallCard } from "./MedSmallCard"


const ch = ['6', '30', '200', '1000']
export const NewMedForm = () => {

    const innerMeds = [{
        id: 1,
        name: 'Aconitum',
        ch: '30',
        meds: []
    }]

    return (
        <>
            <h5>Crear medicamento</h5>
            <form className="form">
                <div>
                    <label htmlFor="med_name">Nombre</label>
                    <input 
                        id="med_name" 
                        name="med_name"
                        className="process"
                    />
                </div>

                <div className="input-group-h">
                    <select 
                        id="med_ch" 
                        name="med_ch"
                        className="process"
                        >
                        {
                            ch.map( ch => (
                                <option key={ch} value={ch}>{ ch }</option>
                            ))
                        }
                    </select>
                    <label 
                        htmlFor="med_ch"
                        className="group-label"
                    >CH</label>
                </div>
                {
                    innerMeds.length > 0 && (
                        <div>
                            <ul>
                                {
                                    innerMeds.map( med => (
                                        <MedSmallCard key={ med.id } medicamento={ med } />
                                    ))
                                }
                            </ul>
                        </div>
                    )
                }

                <div>
                    <label htmlFor="inner_meds">Agregar medicamentos</label>
                    <InnerMedsForm 
                        id="inner_meds"
                    />
                </div>

                <button 
                    type="submit"
                    className="primary"
                >
                    Guardar
                </button>
            </form>
        </>
    )
}
