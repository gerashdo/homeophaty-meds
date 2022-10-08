import { InnerMedsForm } from "./InnerMedsForm"


const ch = ['6', '30', '200', '1000']
export const NewMedForm = () => {

    return (
        <>
            <h5>Crear medicamento</h5>
            <form>
                <div>
                    <label for="med_name">Nombre</label>
                    <input 
                        id="med_name" 
                        name="med_name"
                        className="process"
                    />
                </div>

                <div>
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
                    <label for="med_ch">CH</label>
                </div>

                <div>
                    <label for="inner-meds">Agregar medicamentos</label>
                    <InnerMedsForm 
                        id="inner-meds"
                    />
                </div>

                <input type="submit" value="Guardar" />
            </form>
        </>
    )
}
