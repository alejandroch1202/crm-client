import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context'
import axiosClient from '../../config/axios'
import Swal from 'sweetalert2'

const Login = () => {
  const { setAuth } = useContext(AppContext)
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const data = `${credentials.email}:${credentials.password}`
      const encode = btoa(data)
      axiosClient.defaults.headers.common.authorization = `Basic ${encode}`
      const token = await axiosClient.post('/auth/login')
      localStorage.setItem('token', token.data.token)
      setAuth({ token: token.data.token, auth: true })

      Swal.fire({
        title: 'Éxito',
        text: 'Sesión iniciada con éxito',
        icon: 'success'
      })
      navigate('/')
    } catch (error) {
      if ((error as any).response?.data?.message === 'Invalid credentials') {
        Swal.fire({
          title: 'Error',
          text: 'El usuario o la contraseña son incorrectos',
          icon: 'error'
        })
      } else if ((error as any).response?.data?.message === 'User not found') {
        Swal.fire({
          title: 'Error',
          text: 'El usuario no existe',
          icon: 'error'
        })
      } else {
        console.log(error)
      }
    }
  }

  const validateForm = () => {
    const { email, password } = credentials
    if (email === '' || password === '') {
      return true
    } else {
      return false
    }
  }

  return (
    <div className='login'>
      <h2>Iniciar sesión</h2>
      <div className='contenedor-formulario'>
        <form onSubmit={handleSubmit}>
          <div className='campo'>
            <label> Correo </label>
            <input
              type='text'
              name='email'
              placeholder='Correo electrónico'
              required
              onChange={handleChange}
            />
          </div>
          <div className='campo'>
            <label> Contraseña </label>
            <input
              type='password'
              name='password'
              placeholder='Contraseña'
              required
              onChange={handleChange}
            />
          </div>

          <input
            type='submit'
            className='btn btn-verde btn-block'
            disabled={validateForm()}
            value={'Iniciar sesión'}
          />
        </form>
      </div>
    </div>
  )
}

export default Login
