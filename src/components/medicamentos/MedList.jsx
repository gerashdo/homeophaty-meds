import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { searchStringInMed } from '../../helpers'
import { MedCard } from './MedCard'

import './med-list.css'

export const MedList = ({ searchVariable }) => {

    const { medicamentos } = useSelector( state => state.medicamento )
    const [ medsList, setMedsList ] = useState( medicamentos )

    useEffect(() => {
      if(searchVariable){
        setMedsList( searchStringInMed( searchVariable, medicamentos ) )
      }else{
        setMedsList( medicamentos )
      }
    }, [ medicamentos, searchVariable ])
    

    return (
        <div id="med-list" className='med-list'>
            {
                medsList.map(med => (
                    <MedCard  key={ med.id } medicamento={ med } />
                ))
            }
        </div>
  )
}
