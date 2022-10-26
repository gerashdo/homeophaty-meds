
import { useEffect, useState } from 'react'
import './dinamic-selector.css'

export const DinamicSelector = ({ resetValues, valueForFilter }) => {

    const [valuesForUse, setValuesForUse] = useState( resetValues )
    console.log(valuesForUse)

    useEffect(() => {
        if( valueForFilter ){
            // TODO: Eliminar espacios y juntar el ch al string
            const valuesFiltered = resetValues
                .filter( val => {
                    val.name.toLowerCase().includes( valueForFilter )
                })
            setValuesForUse( valuesFiltered )
        }else{
            setValuesForUse( resetValues )
        }
    //   return () => {
    //     second
    //   }
    }, [valueForFilter, resetValues])
    

    return (
        <div
            className='dinamic-selector'
        >
            <ul>
                {
                    valuesForUse.length > 0 
                    ? valuesForUse.map( med => (
                        <li key={ med.id }>{ med.name } { med.ch }</li>
                    ))
                    : <li>Sin resultados</li>
                }
            </ul>
        </div>
    )
}
