import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TemplateSystemPage } from './TemplateSystemPage'
import { MedList } from '../components/medicamentos/MedList'
import { NewMedForm } from '../components/medicamentos/NewMedForm'
import { useMedsStore } from '../hooks'
import { changeSearchValue } from '../store/slices/medicamentos'
import { Paginate } from '../components/iterface/Paginate'

import './meds-page.css'
import { useModal } from '../hooks/useModal'
import { Modal } from '../components/iterface/Modal'

export const MedsPage = () => {
  const dispatch = useDispatch()
  const { page, totalPages } = useSelector(state => state.ui)
  const { searchValue } = useSelector(state => state.medicamento)
  const { startLoadingMedicamentos } = useMedsStore()
  const { isOpen, closeModal, openModal } = useModal()

  useEffect(() => {
    startLoadingMedicamentos({ page })
  }, [])

  const onClickPageItem = (pageNumber) => {
    startLoadingMedicamentos({ page: pageNumber })
  }

  return (
    <>
      <TemplateSystemPage>
        <main className='meds'>
          <section className='section meds-list'>
            <div>
              <input
                id='med-search'
                type='text'
                className='interface med-search'
                placeholder='Buscar'
                name='medName'
                onChange={(e) => dispatch(changeSearchValue(e.target.value))}
                value={searchValue}
              />
            </div>
            <MedList
              searchVariable={searchValue}
            />
            <div className='pagination'>
              <Paginate
                totalPages={totalPages}
                currentPage={page}
                onClickItem={onClickPageItem}
              />
            </div>
          </section>
          <button onClick={() => openModal()}>
            Nuevo medicamento
          </button>
          <Modal
            content={<NewMedForm />}
            isOpen={isOpen}
            onCancel={closeModal}
            // onClose={closeModal}
            // onAccept={closeModal}
          />
        </main>
        <aside className='aside'>
          <NewMedForm />
        </aside>
      </TemplateSystemPage>
    </>
  )
}
