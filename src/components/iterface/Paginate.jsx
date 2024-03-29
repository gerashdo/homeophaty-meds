import { PaginateItem } from './PaginateItem'
import { usePaginate } from '../../hooks/usePaginate'
import PropTypes from 'prop-types'

import './paginate.css'

export const Paginate = ({ onClickItem, totalPages, currentPage: actualPage }) => {
  const { setCurrentPage, currentPage, pages } = usePaginate(totalPages, actualPage)

  const onItemClick = (number) => {
    setCurrentPage(number)
    onClickItem(number)
  }

  return (
    <div className='paginate-container'>
      {pages.map(page => (
        <PaginateItem
          key={page}
          number={page}
          active={currentPage === page}
          onItemClick={onItemClick}
        />
      ))}
    </div>
  )
}

Paginate.propTypes = {
  onClickItem: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
}
