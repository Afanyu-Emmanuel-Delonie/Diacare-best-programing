import { Route, Navigate } from 'react-router-dom'
import RequireAuth from '../gaurd/RequireAuth'
import PatientLayout from '../layout/PatientLayout'

import PatientDashboard     from '../pages/patient/Dashboard'
import PatientGlucoseLog    from '../pages/patient/GlucoseLog'
import PatientAppointments  from '../pages/patient/Appointments'
import PatientPrescriptions from '../pages/patient/Prescriptions'
import PatientMealPlans     from '../pages/patient/MealPlans'
import PatientLabResults    from '../pages/patient/LabResults'
import PatientSettings      from '../pages/patient/Settings'

export default function PatientRoutes() {
  return (
    <Route path="/patient" element={<RequireAuth allowedRoles={['PATIENT']}><PatientLayout /></RequireAuth>}>
      <Route index                  element={<Navigate to="/patient/dashboard" replace />} />
