import { CgSearch, CgClose } from 'react-icons/cg'
import './search-input.css'

export const SearchInput = ({ onChange, inputValue, placeholder, onResetValue }) => {
  const onValueChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <div className='search-input'>
      <input
        id='med-search'
        type='text'
        placeholder={placeholder}
        name='medName'
        onChange={onValueChange}
        value={inputValue}
      />
      {inputValue
        ? (<button onClick={onResetValue}><CgClose className='search-icon' /></button>)
        : (<CgSearch className='search-icon' />)}
    </div>
  )
}
