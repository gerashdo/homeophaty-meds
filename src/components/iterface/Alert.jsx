import { useDispatch, useSelector } from "react-redux"
import { BsFillCheckCircleFill } from "react-icons/bs"

import './alert.css'
import { useEffect } from "react"
import { stopAlert } from "../../store/slices/ui"

export const Alert = ({ children }) => {
    const dispatch = useDispatch()
    const { alertActive, alertMessage, alertType } = useSelector( state => state.ui )

    const closeAlert = () => {
        dispatch( stopAlert() )
    }

    useEffect(() => {
        if( alertActive ){
            setTimeout( () => {
               closeAlert()
            }, 8000)
        }
    }, [ alertActive ])

    return (
        <>
        { children }

        {
            alertActive
            ?(<div className={`alert-container ${alertType}`}>
                <span>
                    <BsFillCheckCircleFill />
                </span>
                <p>{ alertMessage }</p>
                <span 
                    className="close"
                    onClick={ closeAlert }
                >x</span>
            </div>)
            : null
        }
        </>
    )
}
