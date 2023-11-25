import { useState, useEffect } from 'react'
import axiosClient from './../../config/axios'
import Order from '../../components/orders/Order'
import Spinner from './../../layout/Spinner'
import type { IOrder } from '../../types'

const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([])

  const getOrders = async () => {
    const orders = await axiosClient.get('/orders')
    setOrders(orders.data.orders)
  }

  useEffect(() => {
    getOrders()
  }, [])

  if (orders.length === 0) return <Spinner />

  return (
    <>
      <h2>Pedidos</h2>

      <ul className='listado-pedidos'>
        {orders.map((order) => (
          <Order
            key={order._id}
            order={order}
          />
        ))}
      </ul>
    </>
  )
}

export default Orders
