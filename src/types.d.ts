export interface IClient {
  _id: string
  name: string
  lastname: string
  email: string
  company: string
  phone: string
}

export interface IProduct {
  _id: string
  name: string
  price: number
  image: string
}

export interface IProductResult extends IProduct {
  product: string
  quantity: number
}

export interface IOrder {
  _id: string
  client: IClient
  products: IProduct[]
  total: number
}
