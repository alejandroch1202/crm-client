import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import axiosClient from '../../../config/axios'
import Spinner from '../../../layout/Spinner'

const EditProduct = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [product, setProduct] = useState({
    name: '',
    price: '',
    image: ''
  })

  const [image, setImage] = useState<File>()

  const getproduct = async () => {
    const product = await axiosClient.get(`/products/${id}`)
    setProduct(product.data.product)
  }

  useEffect(() => {
    getproduct()
  }, [])

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.currentTarget.name]: e.currentTarget.value })
  }

  const handleChangeFile = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files !== null) {
      setImage(e.currentTarget.files[0])
    }
  }

  // Validate form
  const validateForm = () => {
    const { name, price } = product
    if (name === '' || price === '') {
      return true
    } else {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', product.name)
    formData.append('price', product.price)

    if (image !== undefined) {
      formData.append('image', image)
    } else {
      formData.append('image', product.image)
    }

    try {
      await axiosClient.put(`/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      Swal.fire({
        title: 'Éxito',
        text: 'Producto actualizado correctamente',
        icon: 'success'
      })
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al actualizar el producto',
        icon: 'error'
      })
    }
    navigate('/products')
  }

  if (product.name === '') return <Spinner />

  return (
    <>
      <h2>Editar Producto</h2>

      <form onSubmit={handleSubmit}>
        <legend>Llena todos los campos</legend>

        <div className='campo'>
          <label>Nombre:</label>
          <input
            type='text'
            placeholder='Nombre Producto'
            name='name'
            defaultValue={product.name}
            onChange={handleChange}
          />
        </div>

        <div className='campo'>
          <label>Precio:</label>
          <input
            type='number'
            name='price'
            min='0.00'
            step='0.01'
            placeholder='Precio'
            defaultValue={product.price}
            onChange={handleChange}
          />
        </div>

        <div className='campo'>
          <label>Imagen:</label>
          {image === undefined ? (
            <img
              src={`http://localhost:4000/${product.image}`}
              alt={`Imagen de ${product.name}`}
              width={'300px'}
            />
          ) : null}
          <input
            type='file'
            name='image'
            onChange={handleChangeFile}
          />
        </div>

        <div className='enviar'>
          <input
            type='submit'
            className='btn btn-azul'
            value='Guardar cambios'
            disabled={validateForm()}
          />
        </div>
      </form>
    </>
  )
}

export default EditProduct
