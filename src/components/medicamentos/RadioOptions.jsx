
import './radio-options.css'

export const RadioOptions = ({ options, value, onChange }) => {

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
