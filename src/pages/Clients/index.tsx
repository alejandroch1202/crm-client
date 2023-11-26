import { useState, useEffect, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context'
import axiosClient from './../../config/axios'
import type { IClient } from './../../types'
import Client from './../../components/clients/Client'
import Spinner from './../../layout/Spinner'

const Clients = () => {
  const navigate = useNavigate()
  const { auth } = useContext(AppContext)
  const [clients, setClients] = useState<IClient[]>([])
  const [refresh, setRefresh] = useState(false)

  const getClients = async () => {
    const clients = await axiosClient.get('/clients', {
      headers: { Authorization: `Bearer ${auth.token}` }
    })
    setClients(clients.data.clients)
  }

  useEffect(() => {
    if (auth.token !== '') {
      try {
        getClients()
      } catch (error) {
        console.log(error)
        navigate('/auth/login')
      }
    } else {
      navigate('/auth/login')
    }
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
