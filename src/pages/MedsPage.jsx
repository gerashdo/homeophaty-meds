import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TemplateSystemPage } from './TemplateSystemPage'
import { MedList } from '../components/medicamentos/MedList'
import { NewMedForm } from '../components/medicamentos/NewMedForm'
import { useMedsStore } from '../hooks'
import { changeSearchValue } from '../store/slices/medicamentos'
import { Paginate } from '../components/iterface/Paginate'
import { useModal } from '../hooks/useModal'
import { Modal } from '../components/iterface/Modal'
import { SearchInput } from '../components/iterface/SearchInput'

import './meds-page.css'

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

  const onSearchValueChange = (value) => {
    dispatch(changeSearchValue(value))
  }

  const onResetSearchValue = () => {
    dispatch(changeSearchValue(''))
  }

  return (
    <>
      <TemplateSystemPage>
        <main className='meds'>
          <SearchInput
            onChange={onSearchValueChange}
            inputValue={searchValue}
            placeholder='Buscar medicamento'
            onResetValue={onResetSearchValue}
          />
          <section className='section meds-list'>
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
            content={<NewMedForm onSave={closeModal} />}
            isOpen={isOpen}
            onCancel={closeModal}
          />
        </main>
      </TemplateSystemPage>
    </>
  )
}
