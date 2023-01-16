import { useEffect, useState } from "react"


export const usePaginate = ( totalItems ) => {
  
    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState([])

    const createNumbers = () => {
        const pagesArray = []
        if( totalItems <= 4 ){
            for (let index = 1; index <= totalItems; index++) {
                pagesArray.push( index )
            }
        }else if( currentPage <= 3){
            for (let index = 1; index <= 4; index++) {
                pagesArray.push( index )
            }
        }else if( currentPage === totalItems ){
            for (let index = totalItems - 3; index <= totalItems; index++) {
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
    }, [ currentPage ])

    return {
        currentPage,
        setCurrentPage,
        pages,
    }
}
