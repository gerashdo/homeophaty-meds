import { NavLink } from "react-router-dom"


export const Navbar = () => {

  return (
    <>
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
    </>
  )
}
