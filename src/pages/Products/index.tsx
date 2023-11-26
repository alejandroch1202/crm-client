import { useState, useEffect, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context'
import axiosClient from './../../config/axios'
import type { IProduct } from './../../types'
import Product from './../../components/products/Product'
import Spinner from './../../layout/Spinner'

const Products = () => {
  const { auth } = useContext(AppContext)
  const navigate = useNavigate()
  const [products, setProducts] = useState<IProduct[]>([])
  const [refresh, setRefresh] = useState(false)

  const getProducts = async () => {
    const products = await axiosClient.get('/products', {
      headers: { Authorization: `Bearer ${auth.token}` }
    })
    setProducts(products.data.products)
  }

  useEffect(() => {
    if (auth.token !== '') {
      try {
        getProducts()
      } catch (error) {
        console.log(error)
        navigate('/auth/login')
      }
    } else {
      navigate('/auth/login')
    }
  }, [refresh])

  if (products.length === 0) return <Spinner />

  return (
    <>
      <h2>Productos</h2>

      <NavLink
        to='/products/new'
        className='btn btn-verde nvo-cliente'
      >
        <i className='fas fa-plus-circle'></i>
        Nuevo Producto
      </NavLink>

      <ul className='listado-clientes'>
        {products.map((product) => (
          <Product
            key={product._id}
            product={product}
            setRefresh={setRefresh}
          />
        ))}
      </ul>
    </>
  )
}

export default Products
