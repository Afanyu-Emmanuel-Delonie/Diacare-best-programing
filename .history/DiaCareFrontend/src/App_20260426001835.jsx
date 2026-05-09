import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from 'react'

import { authStore } from './store/authStore'
import { getMe } from './api/auth'

// Auth
import Login    from './pages/auth/Login'
import Register from './pages/auth/Register'

// Admin
import AppLayout     from './layout/AppLayout'
import Dashboard     from './pages/admin/Dashboard'
import Patients      from './pages/admin/Patients'
import Doctors       from './pages/admin/Doctors'
import GlucoseLog    from './pages/admin/GlucoseLog'
import LabResults    from './pages/admin/LabResults'
import Appointments  from './pages/admin/Appointments'
import Reports       from './pages/admin/Reports'
import Settings      from './pages/admin/Settings'

// Doctor
import DoctorLayout       from './layout/DoctorLayout'
import DoctorDashboard    from './pages/doctor/Dashboard'
import MyPatients         from './pages/doctor/MyPatients'
import DoctorGlucoseLog   from './pages/doctor/GlucoseLog'
import DoctorAppointments from './pages/doctor/Appointments'
import DoctorLabResults   from './pages/doctor/LabResults'
import PatientCare        from './pages/doctor/PatientCare'

// Patient
import PatientLayout       from './layout/PatientLayout'
import PatientDashboard    from './pages/patient/Dashboard'
import PatientGlucoseLog   from './pages/patient/GlucoseLog'
import PatientAppointments from './pages/patient/Appointments'
import PatientPrescriptions from './pages/patient/Prescriptions'
import PatientMealPlans    from './pages/patient/MealPlans'
import PatientLabResults   from './pages/patient/LabResults'
import PatientSettings     from './pages/patient/Settings'

// ── AuthInit: restore session from localStorage on app mount ──────────────
function AuthInit({ children }) {
  const navigate = useNavigate()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const token = authStore.getToken()
    const user  = authStore.getUser()

    if (token && !user) {
      // Token exists but user was lost (e.g. localStorage corruption) — try to restore
      getMe()
        .then(({ data }) => {
          authStore.setUser({ name: data.name, email: data.email, role: data.role })
          setReady(true)
        })
