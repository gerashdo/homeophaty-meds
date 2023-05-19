import { useState } from "react"

export const useModal = () => {
    const [ isOpen, setIsOpen ] = useState( false )

    const openModal = (e) => {
        setIsOpen( true )
    }

    const closeModal = () => {
        setIsOpen( false )
    }

    return {
        isOpen,
        openModal,
        closeModal
    }
}