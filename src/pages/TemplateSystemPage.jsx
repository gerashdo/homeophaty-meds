import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navbar } from '../components/iterface/Navbar'
import { getMedicamentos } from '../store/slices/medicamentos'

export const TemplateSystemPage = ({ children }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch( getMedicamentos() )
  }, [])
  
  return (
    <div className='main-container'>
        <Navbar />
        { children }
    </div>
  )
}
