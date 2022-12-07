
import { useEffect } from 'react'
import { Navbar } from '../components/iterface/Navbar'
import { useAuthStore } from '../hooks'

export const TemplateSystemPage = ({ children }) => {
  const { startRenovateToken } = useAuthStore()
  useEffect(() => {
    startRenovateToken()
  }, [])
  

  return (
    <div className='main-container'>
        <Navbar />
        { children }
    </div>
  )
}
