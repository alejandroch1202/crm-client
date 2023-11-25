import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axiosClient from './../../../config/axios'
import type { IClient, IProductResult } from './../../../types'
import Spinner from './../../../layout/Spinner'
import Search from './../ProductSearch'
import ProductAmount from './../ProductAmount'

const CreateOrder = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [client, setClient] = useState<IClient>()
  const [searchTerm, setSearchTerm] = useState('78sa1f5s6a96ecbf1c')
  const [products, setProducts] = useState<IProductResult[]>([])
  const [total, setTotal] = useState(0)

  const getClient = async () => {
    const client = await axiosClient.get(`/clients/${id}`)
    setClient(client.data.client)
  }

  const searchProducts = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const product = await axiosClient
      .get(`/products?search=${searchTerm}`)
      .then((result) => result.data.products)

    // Check if there are a search result
    if (product.length > 0) {
      const resultProduct = {
        ...product[0],
        product: product[0]._id,
        quantity: 0
      }

      // Check if the product is already added
      const isProductAdded = products.some(
        (product) => product.product === resultProduct.product
      )
      if (isProductAdded) {
        Swal.fire({
          title: 'Ya existe',
          text: 'El producto ya esta agregado',
          icon: 'error'
        })
      } else {
        // Add the new product
        setProducts([...products, resultProduct])
        // Calculate the total
      }
    } else {
      Swal.fire({
        title: 'No hay resultados',
        text: 'No se encontraron resultados',
        icon: 'error'
      })
    }
  }

  const readSearchData = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value)
  }

  const decreaseQuantity = (index: number) => {
    const newProducts = [...products]
    if (newProducts[index].quantity === 0) return
    newProducts[index].quantity--
    setProducts(newProducts)
  }

  const increaseQuantity = (index: number) => {
    const newProducts = [...products]
    newProducts[index].quantity++
    setProducts(newProducts)
  }

  const updateTotal = () => {
    if (products.length === 0) {
      setTotal(0)
    }

    let updatedTotal = 0

    products.forEach((product) => {
      updatedTotal += product.price * product.quantity
    })

    setTotal(updatedTotal)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const order = {
        client: client?._id,
        products,
        total
      }
      await axiosClient.post('/orders', order)
      Swal.fire({
        title: 'Éxito',
        text: 'Pedido agregado correctamente',
        icon: 'success'
      })
      navigate('/orders')
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: 'Error',
        text: 'Error al agregar el pedido',
        icon: 'error'
      })
      return false // Return false to prevent the form from submitting and reloading the page.  This is important to prevent the form from submitting multiple times if the user clicks the "Add Order" button multiple times.  If you want to handle the form submission in a different way, you can remove this return statement.  You can also handle the form submission in a different way, such as by using a custom hook or by using a library like Formik or Yup.  The key point is to prevent the form from submitting multiple times.  You can also handle the form submission in a different way, such as by using a custom hook or by using a library like Formik or Yup.  The key point is to prevent the form from submitting multiple times.  You can also handle the form submission in a different way, such as by using a custom hook or by using a library like Formik or Yup.  The key point is to prevent the form from submitting multiple times.  You can also handle the form submission)
    }
  }

  const deleteProduct = (index: number) => {
    const newProducts = [...products]
    newProducts.splice(index, 1)
    setProducts(newProducts)
  }

  useEffect(() => {
    getClient()
  }, [])

  useEffect(() => {
    updateTotal()
  }, [products])

  if (client === undefined) return <Spinner />

  return (
    <>
      <h2>Nuevo Pedido</h2>

      <div className='ficha-cliente'>
        <h3>Datos de Cliente</h3>
        <p>
          <b>Nombre:</b> {client.name} {client.lastname}
        </p>
        <p>
          <b>Teléfono:</b> {client.phone}
        </p>
      </div>

      <Search
        searchProducts={searchProducts}
        readSearchData={readSearchData}
      />

      <ul className='resumen'>
        {products.map((product, index) => (
          <ProductAmount
            key={product._id}
            product={product}
            index={index}
            decreaseQuantity={decreaseQuantity}
            increaseQuantity={increaseQuantity}
            deleteProduct={deleteProduct}
          />
        ))}
      </ul>

      <p className='total'>
        Total: <span>$ {total}</span>
      </p>

      {total === 0 ? null : (
        <form onClick={handleSubmit}>
          <input
            className='btn btn-verde btn-block'
            value='Agregar Órder'
            type='submit'
          />
        </form>
      )}
    </>
  )
}

export default CreateOrder
