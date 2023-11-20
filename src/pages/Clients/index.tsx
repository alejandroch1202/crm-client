import { useState, useEffect } from 'react'
import axiosClient from '../../config/axios'

interface IClient {
  _id: string
  name: string
  lastname: string
  email: string
  company: string
  phone: string
}

const Clients = () => {
  const [clients, setClients] = useState<IClient[]>([])

  const getClients = async () => {
    const clients = await axiosClient.get('/clients')
    setClients(clients.data.clients)
  }

  useEffect(() => {
    getClients()
  }, [])

  return (
    <>
      <h2>Clientes</h2>
      <ul className='listado-clientes'>
        {clients.map((client) => (
          <li key={client._id}>{client.name}</li>
        ))}
      </ul>
    </>
  )
}

export default Clients
