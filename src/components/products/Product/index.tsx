import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'
import axiosClient from './../../../config/axios'
import type { IProduct } from './../../../types'

const Product = ({
  product,
  setRefresh
}: {
  product: IProduct
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const handleDelete = (id: string) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El producto eliminado no se puede recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00487c',
      cancelButtonColor: '#a01c48',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient
          .delete(`/products/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then(() => {
            Swal.fire({
              title: 'Eliminado',
              text: 'Producto eliminado correctamente',
              icon: 'success'
            })
          })
        setRefresh(true)
      }
    })
  }

  return (
    <li className='producto'>
      <div className='info-producto'>
        <p className='nombre'>{product.name}</p>
        <p className='precio'>$ {product.price} </p>
        <img
          src={`http://localhost:4000/${product.image}`}
          alt={`imagen $${product.name}`}
        />
      </div>

      <div className='acciones'>
        <NavLink
          to={`/products/edit/${product._id}`}
          className='btn btn-azul'
        >
          <i className='fas fa-pen-alt'></i>
          Editar Producto
        </NavLink>

        <button
          onClick={() => {
            handleDelete(product._id)
          }}
          type='button'
          className='btn btn-rojo btn-eliminar'
        >
          <i className='fas fa-times'></i>
          Eliminar Producto
        </button>
      </div>
    </li>
  )
}

export default Product
