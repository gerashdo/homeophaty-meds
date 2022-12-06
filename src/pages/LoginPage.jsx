

import { useDispatch } from 'react-redux'
import { useForm } from '../hooks/useForm'
import { startLoginUser } from '../store/slices/auth'
import './login-page.css'

export const LoginPage = () => {
  const dispatch = useDispatch()
  const [ values, handleChange, ] = useForm({ username: '', password: ''})
  const { username, password } = values

  const handleSubmit = async( e ) => {
    e.preventDefault()
    
    dispatch( startLoginUser( values ) )
  }

  return (
    <main
      className="login-container"
    >
      <div
        className='section'
      >

      <form
        className="form"
        onSubmit={ handleSubmit }
      >
        <div
          className='input-group'
          >
          <label htmlFor="username">Usuario</label>
          <input 
            type="text" 
            name="username"
            id='username'
            className='interface'
            value={ username }
            onChange={ handleChange }
            />
        </div>
        <div
          className='input-group'
          >
          <label htmlFor="password">Contraseña</label>
          <input 
            type="password" 
            name="password"
            id='password'
            className='interface'
            value={ password }
            onChange={ handleChange }
            />
        </div>
        <button 
          type="submit"
          className='primary'
          >
          Iniciar sesión
        </button>
      </form>
      </div>
    </main>
  )
}
