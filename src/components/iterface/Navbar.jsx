import { NavLink } from "react-router-dom"
import { CgPill } from "react-icons/cg";

import "./navbar.css"
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/auth";

export const Navbar = () => {

  const dispatch = useDispatch()

  const handleLogout = () => {
      dispatch( logoutUser() )
      localStorage.removeItem('token')
      localStorage.removeItem('user')
  }

  return (
    <>
      <div className="main-navbar">
        <nav>
            <ul>
                <NavLink
                  to="/"
                  end
                >
                  <li>
                    {/* <CgPill /> */}
                    <span>
                      Inicio
                    </span> 
                  </li>
                </NavLink>
                <NavLink
                  to="/medicamentos"
                >
                  <li>
                    <CgPill />
                    <span>
                      Medicamentos
                    </span> 
                  </li>
                </NavLink>
            </ul>
            <div
              className="logout-container"
            >
              <button
                className="logout"
                onClick={ handleLogout }
              >Cerrar sesión</button>
            </div>
        </nav>
      </div>
    </>
  )
}
