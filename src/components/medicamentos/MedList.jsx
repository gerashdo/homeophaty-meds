import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchStringInMed } from '../../helpers'
import { MedCard } from './MedCard'

import './med-list.css'
import { startDeleteMedicamento } from '../../store/slices/medicamentos/thunks'

export const MedList = ({ searchVariable }) => {
    const dispatch = useDispatch()
    const { medicamentos } = useSelector( state => state.medicamento )
    const [ medsList, setMedsList ] = useState( medicamentos )

    useEffect(() => {
      if(searchVariable){
        setMedsList( searchStringInMed( searchVariable, medicamentos ) )
      }else{
        setMedsList( medicamentos )
      }
    }, [ medicamentos, searchVariable ])

    const onCloseCard = ( medId ) => {
      dispatch( startDeleteMedicamento( medId ))
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
