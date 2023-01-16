import { useEffect, useState } from "react"


export const usePaginate = ( totalPages, actualPage ) => {
  
    const [currentPage, setCurrentPage] = useState( actualPage )
    const [pages, setPages] = useState([])

    const createNumbers = () => {
        const pagesArray = []
        if( totalPages <= 4 ){
            for (let index = 1; index <= totalPages; index++) {
                pagesArray.push( index )
            }
        }else if( currentPage <= 3){
            for (let index = 1; index <= 4; index++) {
                pagesArray.push( index )
            }
        }else if( currentPage === totalPages ){
            for (let index = totalPages - 3; index <= totalPages; index++) {
                pagesArray.push( index )
            }
        }else{
            for (let index = currentPage - 2; index <= currentPage + 1; index++) {
                pagesArray.push( index )
            }
        }
        return pagesArray
    }

    useEffect(() => {
        setPages( createNumbers() )
    }, [ currentPage, totalPages ])

    return {
        currentPage,
        setCurrentPage,
        pages,
    }
}
