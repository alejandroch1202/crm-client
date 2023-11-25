import type { IOrder, IProduct } from '../../../types'

const OrderProduct = ({ product }: { product: IProduct }) => {
  return (
    <li>
      <p>{product.name}</p>
      <p>Precio: {product.product.price}</p>
      <p>Cantidad: {product.quantity}</p>
    </li>
  )
}

const Order = ({ order }: { order: IOrder }) => {
  return (
    <li className='pedido'>
      <div className='info-pedido'>
        <p className='id'>ID: {order._id}</p>
        <p className='nombre'>
          Cliente: {order.client.name} {order.client.lastname}
        </p>

        <div className='articulos-pedido'>
          <p className='productos'>Artículos Pedido: </p>
          <ul>
            {order.products.map((product) => (
              <OrderProduct
                key={product._id}
                product={product}
              />
            ))}
          </ul>
        </div>
        <p className='total'>Total: ${order.total} </p>
      </div>
      <div className='acciones'>
        <a
          href='#'
          className='btn btn-azul'
        >
          <i className='fas fa-pen-alt'></i>
          Editar Pedido
        </a>

        <button
          type='button'
          className='btn btn-rojo btn-eliminar'
        >
          <i className='fas fa-times'></i>
          Eliminar Pedido
        </button>
      </div>
    </li>
  )
}

export default Order