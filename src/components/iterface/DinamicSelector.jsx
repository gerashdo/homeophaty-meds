
import { useEffect, useState } from 'react'
import './dinamic-selector.css'

export const DinamicSelector = ({ resetValues, valueForFilter }) => {

    const [valuesForUse, setValuesForUse] = useState( resetValues )
    

    // Eliminar los espacios de un [] de strings para crear una sola
    // con todos los valores del arreglo
    const deleteStringWhiteSpaces = ( strings ) => {
        let completeString
        strings.map( str => {
            completeString += str.split(" ").join('')
        })

        return completeString
    }

    useEffect(() => {
        if( valueForFilter ){
            const valuesFiltered = resetValues
                .filter( val => (
                    deleteStringWhiteSpaces([ val.name, val.ch ])
                        .toLowerCase().includes(deleteStringWhiteSpaces([ valueForFilter ]))
                ))

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
