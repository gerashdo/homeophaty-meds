
import { useEffect, useState } from 'react'
import { searchStringInMed } from '../../helpers'
import PropTypes from 'prop-types'

import './dinamic-selector.css'

export const DinamicSelector = ({ resetValues, valueForFilter, onSetValue }) => {
  const [valuesForUse, setValuesForUse] = useState(resetValues)

  useEffect(() => {
    if (valueForFilter) {
      setValuesForUse(searchStringInMed(valueForFilter, resetValues))
    } else {
      setValuesForUse(resetValues)
    }
  }, [valueForFilter, resetValues])

  const setSelectedValue = ({ target }) => {
    onSetValue(target.innerText)
  }

  return (
    <div
      className='absolute bg-white rounded-md shadow z-20 w-72 inset-x-0 max-h-60 top-16'
    >
      <ul>
        {
          valuesForUse.length > 0
            ? valuesForUse.map(med => (
              <li
                key={med._id}
                onMouseDown={setSelectedValue}
                className='hover:bg-gray-200 cursor-pointer p-2'
              >
                {med.name} {med.ch}
              </li>
            ))
            : <li data-testid='no-results'>Sin resultados</li>
        }
      </ul>
    </div>
  )
}

DinamicSelector.propTypes = {
  resetValues: PropTypes.array.isRequired,
  valueForFilter: PropTypes.string,
  onSetValue: PropTypes.func.isRequired
}
