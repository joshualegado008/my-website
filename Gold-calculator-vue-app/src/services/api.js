import axios from 'axios'

const BASE = 'https://gold-api-0rhb.onrender.com/api'

export const api = {
  async register(user) {
    const res = await axios.post(`${BASE}/register`, user)
    return res.data
  },

  async login(email, password) {
    const res = await axios.post(`${BASE}/login`, { email, password })
    return res.data
  },

  async calculate(data) {
    const res = await axios.post(`${BASE}/calc`, data)
    return res.data
  },
}
