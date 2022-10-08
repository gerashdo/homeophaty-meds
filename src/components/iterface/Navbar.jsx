import { NavLink } from "react-router-dom"

import "./navbar.css"

export const Navbar = () => {

  return (
    <>
      <div className="main-navbar">
        <nav>
            <ul>
                <NavLink
                  to="/medicamentos"
                >
                  <li>
                    Medicamentos
                  </li>
                </NavLink>
            </ul>
        </nav>
      </div>
    </>
  )
}
