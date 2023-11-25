import { useRoutes, BrowserRouter } from 'react-router-dom'
import Header from './layout/Header'
import Navigation from './layout/Navigation'
import Clients from './pages/Clients'
import CreateClient from './components/clients/Create'
import EditClient from './components/clients/Edit'
import Products from './pages/Products'
import CreateProduct from './components/products/Create'
import EditProduct from './components/products/Edit'
import Orders from './pages/Orders'
import CreateOrder from './components/orders/Create'

const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <Clients /> },
    { path: '/clients/new', element: <CreateClient /> },
    { path: '/clients/edit/:id', element: <EditClient /> },
    { path: '/products', element: <Products /> },
    { path: '/products/new', element: <CreateProduct /> },
    { path: '/products/edit/:id', element: <EditProduct /> },
    { path: '/orders', element: <Orders /> },
    { path: '/orders/new/:id', element: <CreateOrder /> }
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
