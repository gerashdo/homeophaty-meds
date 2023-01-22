import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types'
import { useForm } from '../../hooks/useForm';
import { startAlert } from '../../store/slices/ui';
import { DinamicSelector } from '../iterface/DinamicSelector';
import { searchStringInMed } from '../../helpers';

import './inner-meds.css'

// Parametros
// onChangeInnerMeds: Accion a realizar cuando se agregue un nuevo medicamento
// innerMeds: Lista de innerMeds actuales
export const InnerMedsInput = ({ onChangeInnerMeds, innerMeds = [] }) => {
    const dispatch = useDispatch()
    const { medicamentos } = useSelector( state => state.medicamento )
    const [ values, handleChange, setValues, reset ] = useForm({ medicamento: '' })
    const { medicamento } = values
    const [ focused, setFocused ] = useState( false )

    const changeInputValue = ( newValue ) => {
        setValues({
            ...values,
            medicamento: newValue
        })
    }

    const handleAddMedicine = (e) => {
        e.preventDefault()

        // Si el medicamento ya esta dentro del los inner meds
        if( searchStringInMed( medicamento, innerMeds ).length > 0 ){
            return dispatch( startAlert({
                alertMessage: 'El medicamento ya se encuentra en la lista',
                alertType: 'info'
            }) )
        }

        const medsFound = searchStringInMed( medicamento, medicamentos )

        // Si hay mas de un resultado con el texto introducido en el input
        if( medsFound.length > 1 ){
            return dispatch( startAlert({
                alertMessage: 'Hay más de un medicamento con el nombre que introdujo',
                alertType: 'info'
            }) )
        }
        
        onChangeInnerMeds( medsFound[0] )

        reset()
    }

    return (
        <div 
            className='horizontal-input-button'
        >
        <div className='input process relative'>
            <input
                name='medicamento'
                className='inner-input'
                onChange={ handleChange }
                value={ medicamento }
                onFocus={ () => setFocused( true ) }
                onBlur={ () => setFocused( false ) }
            />
            {
                focused
                &&
                <DinamicSelector 
                    resetValues={ medicamentos }
                    valueForFilter={ medicamento }
                    onSetValue={ changeInputValue }
                />
            }
        </div>
            <button
                className='primary'
                onClick={ handleAddMedicine }
            >
                +
            </button>
        </div>
    )
}

InnerMedsInput.propTypes = {
    onChangeInnerMeds: PropTypes.func.isRequired,
    innerMeds: PropTypes.arrayOf( PropTypes.object )
}