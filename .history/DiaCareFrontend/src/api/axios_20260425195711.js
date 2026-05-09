import axios from 'axios'
import { authStore } from '../store/authStore'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // sends httpOnly refresh token cookie automatically
})

// ── Request: attach in-memory access token ────────────────────────────────
api.interceptors.request.use((config) => {
  const token = authStore.getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Response: silent refresh on 401 ──────────────────────────────────────
let isRefreshing = false
let queue = []

const processQueue = (error, token = null) => {
  queue.forEach((p) => error ? p.reject(error) : p.resolve(token))
  queue = []
}

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config

    if (err.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        // Queue requests while refresh is in progress
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject })
        }).then((token) => {
          original.headers.Authorization = `Bearer ${token}`
          return api(original)
        })
      }

      original._retry = true
      isRefreshing = true

      try {
        // Refresh token is in httpOnly cookie — just call the endpoint
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        )
        const newToken = data.access_token
        authStore.setToken(newToken)
        processQueue(null, newToken)
        original.headers.Authorization = `Bearer ${newToken}`
        return api(original)
      } catch (refreshErr) {
        processQueue(refreshErr, null)
        authStore.clear()
        window.location.href = '/login'
        return Promise.reject(refreshErr)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(err)
  }
)

export default api
