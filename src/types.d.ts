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

export interface IProductApi {
  product: IProduct
  quantity: number
}

export interface IOrderProduct {
  _id: string
  product: IProduct._id
  quantity: number
}

export interface IOrder {
  _id: string
  client: IClient._id
  products: IOrderProduct[]
  total: number
}

export interface IOrderApi {
  _id: IOrder._id
  client: IClient
  products: IProductResult[]
  total: number
}
