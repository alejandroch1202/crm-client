import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context'

const Header = () => {
  const navigate = useNavigate()
  const { auth, setAuth } = useContext(AppContext)
  const handleClick = () => {
    setAuth({
      token: '',
      auth: false
    })
    localStorage.setItem('token', '')
    navigate('/auth/login')
  }

  return (
    <header className='barra'>
      <div className='contenedor'>
        <div className='contenido-barra'>
          <h1>CRM - Administrador de Clientes</h1>
          {auth.auth ? (
            <button
              onClick={handleClick}
              type='button'
              className='btn btn-rojo'
            >
              <i className='far fa-times-circle'></i>
              Cerrar sesión
            </button>
          ) : null}
        </div>
      </div>
    </header>
  )
}

export default Header
