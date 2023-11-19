const Navigation = () => {
  return (
    <aside className='sidebar col-3'>
      <h2>Administración</h2>

      <nav className='navegacion'>
        <a
          href='/'
          className='clientes'
        >
          Clientes
        </a>
        <a
          href='/products'
          className='productos'
        >
          Productos
        </a>
        <a
          href='/orders'
          className='pedidos'
        >
          Órdenes
        </a>
      </nav>
    </aside>
  )
}

export default Navigation
