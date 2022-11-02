import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MedSimpleCard } from './MedSimpleCard'
import { searchStringInMed } from '../../helpers'

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
                    <MedSimpleCard  key={ med.id } medicamento={ med } />
                ))
            }
        </div>
  )
}
