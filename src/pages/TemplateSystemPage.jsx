
import { useEffect } from 'react'
import { Navbar } from '../components/iterface/Navbar'
import { timeToRenovateToken } from '../helpers'
import { useAuthStore } from '../hooks'

export const TemplateSystemPage = ({ children }) => {
  const { startRenovateToken } = useAuthStore()
  
  useEffect(() => {
    const tokenDate = Number(localStorage.getItem( "token-date" ))

    if( timeToRenovateToken( tokenDate ) ){
      startRenovateToken()
    }
  }, [])
  

  return (
    <div className='main-container'>
        <Navbar />
        { children }
    </div>
  )
}
