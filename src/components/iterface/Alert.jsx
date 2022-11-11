import { BsFillCheckCircleFill } from "react-icons/bs"

import './alert.css'

export const Alert = () => {
  return (
    <div className="alert-container">
        <span
        
        >
            <BsFillCheckCircleFill />
        </span>
        <p>El medicamento no existe</p>
        <span className="close">x</span>
    </div>
  )
}
