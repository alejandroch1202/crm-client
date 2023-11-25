interface ProductSearchProps {
  searchProducts: (e: React.FormEvent<HTMLFormElement>) => void
  readSearchData: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ProductSearch = ({
  searchProducts,
  readSearchData
}: ProductSearchProps) => {
  return (
    <form onSubmit={searchProducts}>
      <legend>Busca un Producto y agrega una cantidad</legend>

      <div className='campo'>
        <label>Productos:</label>
        <input
          type='text'
          placeholder='Nombre Productos'
          name='productos'
          onChange={readSearchData}
        />
      </div>
      <input
        type='submit'
        className='btn btn-azul btn-block'
        value='Buscar Producto'
      />
    </form>
  )
}

export default ProductSearch
