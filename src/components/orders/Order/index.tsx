import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'
import axiosClient from '../../../config/axios'
import type { IOrder } from '../../../types'

const Order = ({
  order,
  setRefresh
}: {
  order: IOrder
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const handleDelete = (id: string) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Una órden eliminada no se puede recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00487c',
      cancelButtonColor: '#a01c48',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient.delete(`/orders/${id}`).then(() => {
          Swal.fire({
            title: 'Eliminado',
            text: 'Órden eliminada correctamente',
            icon: 'success'
          })
        })
      }
      setRefresh(true)
    })
  }

  return (
    <li className='pedido'>
      <div className='info-pedido'>
        <p className='id'>ID: {order._id}</p>
        <p className='nombre'>
          Cliente: {order.client.name} {order.client.lastname}
        </p>

        <div className='articulos-pedido'>
          <p className='productos'>Productos de la órden: </p>
          <ul>
            {order.products.map((product) => (
              <li key={order._id + product._id}>
                <p>{product.product.name}</p>
                <p>Precio: {product.product.price}</p>
                <p>Cantidad: {product.quantity}</p>
              </li>
            ))}
          </ul>
        </div>
        <p className='total'>Total: $ {order.total} </p>
      </div>
      <div className='acciones'>
        <NavLink
          to={`/orders/edit/${order._id}`}
          className='btn btn-azul'
        >
          <i className='fas fa-pen-alt'></i>
          Editar Órden
        </NavLink>

        <button
          onClick={() => {
            handleDelete(order._id)
          }}
          type='button'
          className='btn btn-rojo btn-eliminar'
        >
          <i className='fas fa-times'></i>
          Eliminar Órden
        </button>
      </div>
    </li>
  )
}

export default Order
