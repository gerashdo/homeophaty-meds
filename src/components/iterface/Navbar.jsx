import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { CgPill, CgHome, CgLogOut, CgClose, CgMenu } from 'react-icons/cg'

import { logoutUser } from '../../store/slices/auth'
import { deleteUserAndToken } from '../../helpers'

import './navbar.css'
import { useRef } from 'react'

export const Navbar = () => {
  const dispatch = useDispatch()
  const navRef = useRef()

  const handleLogout = () => {
    dispatch(logoutUser())
    deleteUserAndToken()
  }

  const toggleNavbar = () => {
    navRef.current.classList.toggle('visible')
  }

  return (
    <>
      <div className='main-navbar'>
        <nav ref={navRef}>
          <ul>
            <li>
              <NavLink to='/' end>
                <CgHome />
                <span className='text-navlink'>
                  Inicio
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/medicamentos'>
                <CgPill />
                <span className='text-navlink'>
                  Medicamentos
                </span>
              </NavLink>
            </li>
            <li>
              <button
                className='logout'
                onClick={handleLogout}
              >
                <CgLogOut className='logout-icon' />
                <span className='text-navlink'>
                  Cerrar sesión
                </span>
              </button>
            </li>
          </ul>
          <button
            className='btn close-nav-btn'
            onClick={toggleNavbar}
          >
            <CgClose />
          </button>

          {/* <div className='logout-container'>
            
          </div> */}
        </nav>
        <button
          className='btn open-nav-btn'
          onClick={toggleNavbar}
        >
          <CgMenu />
        </button>
      </div>
    </>
  )
}
