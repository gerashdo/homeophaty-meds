import { chOptions, medicineTypes } from '../../helpers'
import { RadioOptions } from '../iterface/RadioOptions'
import { MedicineIncluder } from './MedicineIncluder'
import { InnerMedsList } from './InnerMedsList'
import { PrescriptionList } from './PrescriptionList'
import { PrescriptionForm } from './PrescriptionForm'
import { useMedEdit } from '../../hooks/useMedEdit'

import './med-detail-edit.css'

export const MedDetailEdit = ({ medicamento, onCancel }) => {
  const {
    name,
    ch,
    isAddingPrescription,
    setIsAddingPrescription,
    handleSubmitPrescription,
    handleRemoveMed,
    handleOnChangeInnerMeds,
    handleChChange,
    handleChange
    // handleSubmit,
  } = useMedEdit(medicamento)

  return (
    <>
      <div className='med-titlename'>
        <input
          name='name'
          type='text'
          value={name}
          onChange={handleChange}
        />
      </div>
      <section>
        {medicamento.type === medicineTypes.Medicamento
          ? null
          : (
            <section className='flex flex-col w-full'>
              <div className='flex justify-end mb-4'>
                <MedicineIncluder onChangeInnerMeds={handleOnChangeInnerMeds} innerMeds={medicamento.medicines} />
              </div>
              <InnerMedsList innerMeds={medicamento.medicines} onRemoveInnerMeds={handleRemoveMed} />
            </section>)}

        {medicamento.type === medicineTypes.Medicamento
          ? (
            <div className='med-ch'>
              <RadioOptions
                options={chOptions}
                value={ch}
                onChange={handleChChange}
              />
            </div>
            )
          : null}
      </section>

      <section className=''>
        <div className='flex justify-end my-5'>
          <button
            className='bg-gray-100 rounded-md px-4 py-3 text-black hover:bg-gray-300 cursor-pointer'
            onClick={() => setIsAddingPrescription(true)}
          >
            + Agregar prescripcion a medicamento
          </button>
        </div>
        {isAddingPrescription
          ? (
            <PrescriptionForm onSubmit={handleSubmitPrescription} onCancel={() => setIsAddingPrescription(false)} />
            )
          : null}
        <PrescriptionList presccriptions={medicamento.prescription} />
      </section>
    </>
  )
}
