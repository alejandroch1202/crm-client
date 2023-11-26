import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context'
import axiosClient from './../../config/axios'
import Order from '../../components/orders/Order'
import Spinner from './../../layout/Spinner'
import type { IOrder } from '../../types'

const Orders = () => {
  const navigate = useNavigate()
  const { auth } = useContext(AppContext)
  const [orders, setOrders] = useState<IOrder[]>([])
  const [refresh, setRefresh] = useState(false)

  const getOrders = async () => {
    const orders = await axiosClient.get('/orders', {
      headers: { Authorization: `Bearer ${auth.token}` }
    })
    setOrders(orders.data.orders)
  }

  useEffect(() => {
    if (auth.token !== '') {
      try {
        getOrders()
      } catch (error) {
        console.log(error)
        navigate('/auth/login')
      }
    } else {
      navigate('/auth/login')
    }
  }, [refresh])

  if (orders.length === 0) return <Spinner />

  return (
    <>
      <h2>Órdenes</h2>

      <ul className='listado-pedidos'>
        {orders.map((order) => (
          <Order
            key={order._id}
            order={order}
            setRefresh={setRefresh}
          />
        ))}
      </ul>
    </>
  )
}

export default Orders
