
import PropTypes from 'prop-types'

import './paginate-item.css'

export const PaginateItem = ({ number, onItemClick, active = false }) => {
  const onClick = () => {
    onItemClick(number)
  }

  return (
    <div
      className={`paginate-item ${active ? 'active' : ''}`}
      onClick={onClick}
      data-testid='item-container'
    >
      {number}
    </div>
  )
}

PaginateItem.propTypes = {
  number: PropTypes.number.isRequired,
  onItemClick: PropTypes.func.isRequired,
  active: PropTypes.bool
}
