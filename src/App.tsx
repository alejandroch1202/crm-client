import { useRoutes, BrowserRouter } from 'react-router-dom'
import Header from './layout/Header'
import Navigation from './layout/Navigation'
import Clients from './pages/Clients'
import Products from './pages/Products'
import Orders from './pages/Orders'

const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <Clients /> },
    { path: '/products', element: <Products /> },
    { path: '/orders', element: <Orders /> }
  ])
  return routes
}

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <div className='grid contenedor contenido-principal'>
        <Navigation />

        <main className='caja-contenido col-9'>
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
