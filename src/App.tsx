import { useContext } from 'react'
import { useRoutes, BrowserRouter } from 'react-router-dom'
import { AppProvider, AppContext } from './context'
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
import EditOrder from './components/orders/Edit'
import Login from './pages/Login'

const AppRoutes = () => {
  const { auth } = useContext(AppContext)

  const routes = useRoutes([
    { path: '/', element: auth.auth ? <Clients /> : <Login /> },
    { path: '/clients/new', element: auth.auth ? <CreateClient /> : <Login /> },
    {
      path: '/clients/edit/:id',
      element: auth.auth ? <EditClient /> : <Login />
    },
    { path: '/products', element: auth.auth ? <Products /> : <Login /> },
    {
      path: '/products/new',
      element: auth.auth ? <CreateProduct /> : <Login />
    },
    {
      path: '/products/edit/:id',
      element: auth.auth ? <EditProduct /> : <Login />
    },
    { path: '/orders', element: auth.auth ? <Orders /> : <Login /> },
    {
      path: '/orders/new/:id',
      element: auth.auth ? <CreateOrder /> : <Login />
    },
    {
      path: '/orders/edit/:id',
      element: auth.auth ? <EditOrder /> : <Login />
    },
    { path: '/auth/login', element: <Login /> }
  ])
  return routes
}

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Header />

        <div className='grid contenedor contenido-principal'>
          <Navigation />

          <main className='caja-contenido col-9'>
            <AppRoutes />
          </main>
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
