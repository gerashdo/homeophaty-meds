import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { changeEditingMedicine } from '../store/slices/medicamentos'
import { TemplateSystemPage } from './TemplateSystemPage'
import { MedDetail } from '../components/medicamentos/MedDetail'
import { MedDetailEdit } from '../components/medicamentos/MedDetailEdit'
import { getMedById } from '../helpers'

import './med-page.css'

export const MedPage = () => {
  const dispatch = useDispatch()
  const { medId } = useParams()
  const { medicamentos, isEditingMedicine } = useSelector(state => state.medicamento)

  const [medicamento, setMedicamento] = useState(null)

  useEffect(() => {
    if (medicamentos) {
      setMedicamento(getMedById(medId, medicamentos))
    }
  }, [medicamentos, medId])

  const setEditMedicine = (value) => {
    dispatch(changeEditingMedicine(value))
  }

  return (
    <TemplateSystemPage>
      <main className='med'>
        <section className='section med-detail-container'>
          {medicamento
            ? isEditingMedicine
              ? (<MedDetailEdit
                  medicamento={medicamento}
                  onCancel={() => setEditMedicine(false)}
                 />)
              : (
                <>
                  <div className='align-content-end'>
                    <button
                      className='simple'
                      onClick={() => setEditMedicine(true)}
                    >
                      Editar medicamento
                    </button>
                  </div>
                  <MedDetail
                    medicamento={medicamento}
                  />
                </>
                )
            : (
              <div>
                Loading
              </div>)}
        </section>
      </main>
    </TemplateSystemPage>
  )
}
