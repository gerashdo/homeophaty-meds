import React from 'react'
import { Navbar } from '../components/Navbar'

export const TemplateSystemPage = ({ children }) => {
  return (
    <div>
        <Navbar />
        { children }
    </div>
  )
}
