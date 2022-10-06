import { InnerMedsForm } from "./InnerMedsForm"


export const NewMedForm = () => {

    return (
        <>
            <h5>Crear medicamento</h5>
            <form>
                <label for="med_name">Nombre</label>
                <input id="med_name" name="med_name"/>

                <label for="med_ch">CH</label>
                <input id="med_ch" name="med_ch" />

                <InnerMedsForm />

                <input type="submit" value="Guardar" />
            </form>
        </>
    )
}
