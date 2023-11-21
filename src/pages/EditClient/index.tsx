import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import axiosClient from '../../config/axios'

const EditClient = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [client, setClient] = useState({
    name: '',
    lastname: '',
    email: '',
    company: '',
    phone: ''
  })

  const getClient = async () => {
    const client = await axiosClient.get(`/clients/${id}`)
    setClient(client.data.client)
  }

  useEffect(() => {
    getClient()
  }, [])

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setClient({ ...client, [e.currentTarget.name]: e.currentTarget.value })
  }

  // Validate form
  const validateForm = () => {
    const { name, lastname, email, company, phone } = client
    if (
      name === '' ||
      lastname === '' ||
      email === '' ||
      company === '' ||
      phone === ''
    ) {
      return true
    } else {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await axiosClient.put(`/clients/${id}`, client)
      Swal.fire({
        title: 'Éxito',
        text: 'Cliente actualizado correctamente',
        icon: 'success'
      })
    } catch (error) {
      if ((error as any).response?.data?.message === 'Email already used') {
        Swal.fire({
          title: 'Error',
          text: 'El correo ya esta en uso',
          icon: 'error'
        })
      } else {
        console.log(error)
      }
    }
    navigate('/')
  }

  return (
    <>
      <h2>Editar Cliente</h2>

      <form onSubmit={handleSubmit}>
        <legend>Llena todos los campos</legend>

        <div className='campo'>
          <label>Nombre:</label>
          <input
            type='text'
            placeholder='Nombre Cliente'
            name='name'
            value={client.name}
            onChange={handleChange}
          />
        </div>

        <div className='campo'>
          <label>Apellido:</label>
          <input
            type='text'
            placeholder='Apellido Cliente'
            name='lastname'
            value={client.lastname}
            onChange={handleChange}
          />
        </div>

        <div className='campo'>
          <label>Email:</label>
          <input
            type='email'
            placeholder='Email Cliente'
            name='email'
            value={client.email}
            onChange={handleChange}
          />
        </div>

        <div className='campo'>
          <label>Empresa:</label>
          <input
            type='text'
            placeholder='Empresa Cliente'
            name='company'
            value={client.company}
            onChange={handleChange}
          />
        </div>

        <div className='campo'>
          <label>Teléfono:</label>
          <input
            type='number'
            placeholder='Teléfono Cliente'
            name='phone'
            value={client.phone}
            onChange={handleChange}
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

export default EditClient
