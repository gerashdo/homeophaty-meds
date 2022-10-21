

import './inner-meds.css'

export const InnerMedsForm = () => {

  const meds = []

  return (
    <div className='input process'>
        <input 
          name='inner_med_name'
          className='inner-input'
        />
        <button
          className='primary'
        >
          +
        </button>
    </div>
  )
}
