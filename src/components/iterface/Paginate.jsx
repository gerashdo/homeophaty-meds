import { useEffect } from "react"
import { useState } from "react"
import { PaginateItem } from "./PaginateItem"

import './paginate.css'
import { usePaginate } from "../../hooks/usePaginate"

const numberElements = 5

export const Paginate = () => {

    const { setCurrentPage, currentPage, pages } = usePaginate( numberElements )

    const onItemClick = ( number ) => {
        setCurrentPage( number )
    }

    return (
        <div className="paginate-container">
            {
                pages.map( page => (
                    <PaginateItem 
                        key={ page }
                        number={ page }
                        active={ currentPage === page ? true : false }
                        onItemClick={ onItemClick }
                    />
                ))
            }
        </div>
    )
}
