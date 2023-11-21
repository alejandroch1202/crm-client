import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axiosClient from '../../config/axios'
import Client from '../../components/Client'
import type { IClient } from '../../types'

const Clients = () => {
  const [clients, setClients] = useState<IClient[]>([])

  const getClients = async () => {
    const clients = await axiosClient.get('/clients')
    setClients(clients.data.clients)
  }

  useEffect(() => {
    getClients()
  }, [clients])

  return (
    <>
      <h2>Clientes</h2>
      <NavLink
        to='/clients/new'
        className='btn btn-verde nvo-cliente'
      >
        <i className='fas fa-plus-circle'></i>
        Nuevo Cliente
      </NavLink>
      <ul className='listado-clientes'>
        {clients.map((client) => (
          <Client
            key={client._id}
            client={client}
          />
        ))}
      </ul>
    </>
  )
}

export default Clients
