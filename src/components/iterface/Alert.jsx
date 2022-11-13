import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { stopAlert } from "../../store/slices/ui"
import { BsFillCheckCircleFill, BsFillXCircleFill, BsInfoCircleFill } from "react-icons/bs"

import './alert.css'

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

    const renderIcon = () => {
        switch ( alertType ) {
            case 'success':
                return <BsFillCheckCircleFill />
            case 'error':
                return <BsFillXCircleFill />
            default:
                return <BsInfoCircleFill />
        }
    }

    return (
        <>
        { children }

        {
            alertActive
            ?(<div className={`alert-container ${alertType}`}>
                <span>
                    {
                        renderIcon()
                    }
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
