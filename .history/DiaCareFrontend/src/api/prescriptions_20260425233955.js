import api from './axios'

export const getMyPrescriptions = () => api.get('/prescriptions/my')
