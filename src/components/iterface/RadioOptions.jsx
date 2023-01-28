import PropTypes from "prop-types"

import './radio-options.css'

export const RadioOptions = ({ options, value, onChange = () => {} }) => {

    return (
        <div 
            className="radio-options"
        >
            {
                options.map( option => (
                    <label
                        key={ option }
                        className="radio-input-container"
                    > 
                        <input 
                            type="radio"
                            id={ option }
                            value={ option }
                            checked={ value === option }
                            onChange={ onChange }
                        />
                        <label htmlFor={ option }>{ option }</label>
                    </label>
                ))
            }
        </div>
    )
}

RadioOptions.propTypes = {
    options: PropTypes.arrayOf( PropTypes.string ).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
}
