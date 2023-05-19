
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
      className='dinamic-selector'
    >
      <ul>
        {
          valuesForUse.length > 0
            ? valuesForUse.map(med => (
              <li
                key={med._id}
                onMouseDown={setSelectedValue}
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
