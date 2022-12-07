
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navbar } from '../components/iterface/Navbar'
import { startRenovateToken } from '../store/slices/auth'

export const TemplateSystemPage = ({ children }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch( startRenovateToken() )
  }, [])
  

  return (
    <div className='main-container'>
        <Navbar />
        { children }
    </div>
  )
}
