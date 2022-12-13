import { useEffect, useState } from 'react'
import { searchStringInMed } from '../../helpers'
import { MedCard } from './MedCard'
import { useMedsStore } from '../../hooks'

import './med-list.css'

export const MedList = ({ searchVariable }) => {
    const { medicamentos, startDeleteMedicamento } = useMedsStore()

    const [ medsList, setMedsList ] = useState( medicamentos )

    useEffect(() => {
      if( searchVariable ){
        setMedsList( searchStringInMed( searchVariable, medicamentos ) )
      }else{
        setMedsList( medicamentos )
      }
    }, [ medicamentos, searchVariable ])

    const onCloseCard = ( medId ) => {
      startDeleteMedicamento( medId )
    }
    

    return (
        <div id="med-list" className='med-list'>
            {
                medsList.map(med => (
                    <MedCard  
                      key={ med.id } 
                      medicamento={ med }
                      onCloseCard={ onCloseCard }
                    />
                ))
            }
        </div>
  )
}
