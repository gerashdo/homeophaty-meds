import React from 'react'
import { Navbar } from '../components/Navbar'

export const TemplateSystemPage = ({ children }) => {
  return (
    <div className='main-container'>
        <Navbar />
        { children }
    </div>
  )
}
