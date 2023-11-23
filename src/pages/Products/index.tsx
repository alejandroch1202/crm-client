import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axiosClient from './../../config/axios'
import type { IProduct } from './../../types'
import Product from './../../components/products/Product'
import Spinner from './../../layout/Spinner'

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [refresh, setRefresh] = useState(false)

  const getProducts = async () => {
    const products = await axiosClient.get('/products')
    setProducts(products.data.products)
  }

  useEffect(() => {
    getProducts()
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
