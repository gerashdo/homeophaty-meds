
import { useEffect, useState } from 'react'
import { searchStringInMed } from '../../helpers'
import './dinamic-selector.css'

export const DinamicSelector = ({ resetValues, valueForFilter, onSetValue, onSetValueId }) => {

    const [valuesForUse, setValuesForUse] = useState( resetValues )

    useEffect(() => {
        if( valueForFilter ){
            setValuesForUse( searchStringInMed( valueForFilter, resetValues ) )
        }else{
            setValuesForUse( resetValues )
        }
    //   return () => {
    //     second
    //   }
    }, [valueForFilter, resetValues])

    const setSelectedValue = ({ target }) => {
        onSetValue( target.innerText )
        onSetValueId( target.id )
    }

    return (
        <div
            className='dinamic-selector'
        >
            <ul>
                {
                    valuesForUse.length > 0 
                    ? valuesForUse.map( med => (
                        <li 
                            key={ med.id }
                            id={ med.id }
                            onMouseDown={ setSelectedValue }
                        >
                            { med.name } { med.ch }
                        </li>
                    ))
                    : <li>Sin resultados</li>
                }
            </ul>
        </div>
    )
}
