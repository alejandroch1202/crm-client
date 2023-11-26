import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axiosClient from '../../../config/axios'

const CreateProduct = () => {
  const navigate = useNavigate()

  const [product, setProduct] = useState({
    name: '',
    price: ''
  })

  const [image, setImage] = useState<File>()

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
    if (name === '' || price === '' || image === undefined) {
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
    formData.append('image', image as File)

    try {
      await axiosClient.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      Swal.fire({
        title: 'Éxito',
        text: 'Producto creado correctamente',
        icon: 'success'
      })
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al crear el producto',
        icon: 'error'
      })
    }
    navigate('/products')
  }

  return (
    <>
      <h2>Nuevo Producto</h2>

      <form onSubmit={handleSubmit}>
        <legend>Llena todos los campos</legend>

        <div className='campo'>
          <label>Nombre:</label>
          <input
            type='text'
            placeholder='Nombre Producto'
            name='name'
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
            onChange={handleChange}
          />
        </div>

        <div className='campo'>
          <label>Imagen:</label>
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
            value='Agregar Producto'
            disabled={validateForm()}
          />
        </div>
      </form>
    </>
  )
}

export default CreateProduct
