import { useContext } from 'react'
import { AppContext } from '../../context'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  const { auth } = useContext(AppContext)

  if (!auth.auth) return null

  return (
    <aside className='sidebar col-3'>
      <h2>Administración</h2>

      <nav className='navegacion'>
        <NavLink
          to='/'
          className='clientes'
        >
          Clientes
        </NavLink>
        <NavLink
          to='/products'
          className='productos'
        >
          Productos
        </NavLink>
        <NavLink
          to='/orders'
          className='pedidos'
        >
          Órdenes
        </NavLink>
      </nav>
    </aside>
  )
}

export default Navigation
