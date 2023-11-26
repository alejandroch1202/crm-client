import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const axiosClient = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`
})

export default axiosClient
