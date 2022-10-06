import { NavLink } from "react-router-dom"


export const Navbar = () => {

  return (
    <>
      <div className="mainNavbar">
        <nav>
            <ul>
                <li>
                  <NavLink
                    to="/medicamentos"
                    >
                    Medicamentos
                  </NavLink>
                </li>
            </ul>
        </nav>
      </div>
    </>
  )
}
