import { NavLink } from "react-router-dom"
import { CgPill, CgHome, CgLogOut } from "react-icons/cg";

import "./navbar.css"
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/auth";
import { deleteUserAndToken } from "../../helpers";

export const Navbar = () => {

  const dispatch = useDispatch()

  const handleLogout = () => {
      dispatch( logoutUser() )
      deleteUserAndToken()
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
                    <CgHome />
                    <span className="text-navlink">
                      Inicio
                    </span> 
                  </li>
                </NavLink>
                <NavLink
                  to="/medicamentos"
                >
                  <li>
                    <CgPill />
                    <span className="text-navlink">
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
              >
                <CgLogOut
                  className="logout-icon"
                />
                  <span className="text-navlink">
                    Cerrar sesión
                  </span>
              </button>
            </div>
        </nav>
      </div>
    </>
  )
}
