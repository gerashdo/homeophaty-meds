import { NavLink } from "react-router-dom"
import { CgPill } from "react-icons/cg";

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
                    <CgPill />
                    <span>
                      Medicamentos
                    </span> 
                  </li>
                </NavLink>
            </ul>
        </nav>
      </div>
    </>
  )
}
