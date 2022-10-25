
import './dinamic-selector.css'

export const DinamicSelector = ({ medicamentos }) => {


    return (
        <div
            className='dinamic-selector'
        >
            <ul>
            {
                medicamentos.map( med => (
                <li key={ med.id }>{ med.name } { med.ch }</li>
                ))
            }
            </ul>
        </div>
    )
}
