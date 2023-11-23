import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axiosClient from './../../config/axios'
import type { IClient } from './../../types'
import Client from './../../components/clients/Client'
import Spinner from './../../layout/Spinner'

const Clients = () => {
  const [clients, setClients] = useState<IClient[]>([])
  const [refresh, setRefresh] = useState(false)

  const getClients = async () => {
    const clients = await axiosClient.get('/clients')
    setClients(clients.data.clients)
  }

  useEffect(() => {
    getClients()
  }, [refresh])

  if (clients.length === 0) return <Spinner />

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
            setRefresh={setRefresh}
          />
        ))}
      </ul>
    </>
  )
}

export default Clients
