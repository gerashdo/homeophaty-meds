
import { Navbar } from '../components/iterface/Navbar'

export const TemplateSystemPage = ({ children }) => {

  return (
    <div className='main-container'>
        <Navbar />
        { children }
    </div>
  )
}
