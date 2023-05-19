import { useEffect, useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { RadioOptions } from '../iterface/RadioOptions'
import { useMedsStore } from '../../hooks/useMedsStore'
import { InnerMedsForm } from './InnerMedsForm'
import { chOptions, formatMedData, medicineTypes } from '../../helpers'

import './new-med-form.css'

export const NewMedForm = () => {
  const { startAddNewMedicamento } = useMedsStore()

  const [innerMeds, changeInnerMeds] = useState([])
  const [values, handleChange, setValues, reset] = useForm({ name: '', ch: '', type: medicineTypes.Medicamento })
  const { name, ch, type } = values

  const [radioButtonValue, setRadioButtonValue] = useState('')
  useEffect(() => {
    setRadioButtonValue(Object.keys(medicineTypes).find(key => medicineTypes[key] === type))
  }, [type])
  console.log('rendered form ')

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = formatMedData({
      name,
      ch,
      medicines: innerMeds.map(med => med.id),
      type
    })

    startAddNewMedicamento(data)

    changeInnerMeds([])
    reset()
  }

  const handleOnChangeInnerMeds = (medicine) => {
    changeInnerMeds([
      ...innerMeds,
      { ...medicine, _id: medicine.id }
    ])
  }

  const handleRemoveInnerMed = (id) => {
    changeInnerMeds(innerMeds.filter(med => med.id !== id))
  }

  const handleRadioInputChange = (e) => {
    setValues({ ...values, type: medicineTypes[e.target.value] })
  }

  const handleChRadioInputChange = (e) => {
    setValues({ ...values, ch: e.target.value })
  }

  return (
    <>
      <h5>Crear medicamento</h5>
      <form
        className='form'
        onSubmit={handleSubmit}
      >
        <div className='group-form'>
          <label htmlFor='med_name'>Nombre</label>
          <input
            id='med_name'
            name='name'
            className='process'
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className='group-form'>
          <label htmlFor='med_type'>Tipo</label>
          <RadioOptions
            options={Object.keys(medicineTypes)}
            value={radioButtonValue}
            onChange={handleRadioInputChange}
          />
        </div>

        {
          type === medicineTypes.Medicamento
            ? (
              <div className='group-form'>
                <label htmlFor='med_type'>CH</label>
                <RadioOptions
                  options={chOptions}
                  value={ch}
                  onChange={handleChRadioInputChange}
                />
              </div>
              )
            : (
              <InnerMedsForm
                innerMeds={innerMeds}
                onRemoveInnerMeds={handleRemoveInnerMed}
                onChangeInnerMeds={handleOnChangeInnerMeds}
                label='Agregar medicamentos'
              />
              )
        }

        <button
          type='submit'
          className='primary'
        >
          Guardar
        </button>
      </form>
    </>
  )
}
