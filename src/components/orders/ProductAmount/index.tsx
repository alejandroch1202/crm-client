import type { IProductResult } from '../../../types'

const ProductAmount = ({
  product,
  index,
  decreaseQuantity,
  increaseQuantity,
  deleteProduct
}: {
  product: IProductResult
  index: number
  decreaseQuantity: (index: number) => void
  increaseQuantity: (index: number) => void
  deleteProduct: (index: number) => void
}) => {
  return (
    <li>
      <div className='texto-producto'>
        <p className='nombre'>{product.name}</p>
        <p className='precio'>$ {product.price}</p>
      </div>
      <div className='acciones'>
        <div className='contenedor-cantidad'>
          <i
            className='fas fa-minus'
            onClick={() => {
              decreaseQuantity(index)
            }}
          ></i>
          <p className='no-select'>{product.quantity}</p>
          <i
            className='fas fa-plus'
            onClick={() => {
              increaseQuantity(index)
            }}
          ></i>
        </div>
        <button
          onClick={() => {
            deleteProduct(index)
          }}
          type='button'
          className='btn btn-rojo'
        >
          <i className='fas fa-minus-circle'></i>
          Eliminar Producto
        </button>
      </div>
    </li>
  )
}

export default ProductAmount
