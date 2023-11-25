import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'
import axiosClient from './../../../config/axios'
import type { IClient } from './../../../types'

const Client = ({
  client,
  setRefresh
}: {
  client: IClient
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const handleDelete = (id: string) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El cliente eliminado no se puede recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00487c',
      cancelButtonColor: '#a01c48',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient.delete(`/clients/${id}`).then(() => {
          Swal.fire({
            title: 'Eliminado',
            text: 'Cliente eliminado correctamente',
            icon: 'success'
          })
        })
      }
      setRefresh(true)
    })
  }

  return (
    <li
      key={client._id}
      className='cliente'
    >
      <div className='info-cliente'>
        <p className='nombre'>
          {client.name} {client.lastname}
        </p>
        <p className='empresa'>{client.company}</p>
        <p>{client.email}</p>
        <p>{client.phone}</p>
      </div>
      <div className='acciones'>
        <NavLink
          to={`/clients/edit/${client._id}`}
          className='btn btn-azul'
        >
          <i className='fas fa-pen-alt'></i>
          Editar Cliente
        </NavLink>
        <NavLink
          to={`/orders/new/${client._id}`}
          className='btn btn-amarillo'
        >
          <i className='fas fa-plus'></i>
          Nueva Órden
        </NavLink>
        <button
          onClick={() => {
            handleDelete(client._id)
          }}
          type='button'
          className='btn btn-rojo btn-eliminar'
        >
          <i className='fas fa-times'></i>
          Eliminar Cliente
        </button>
      </div>
    </li>
  )
}

export default Client
