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
import PatientGlucoseLog from "./pages/patient/GlucoseLog";
import PatientAppointments from "./pages/patient/Appointments";
import PatientPrescriptions from "./pages/patient/Prescriptions";
import PatientMealPlans from "./pages/patient/MealPlans";
import PatientLabResults from "./pages/patient/LabResults";
import PatientSettings from "./pages/patient/Settings";

// ── AuthInit: restore session from localStorage on app mount ──────────────
function AuthInit({ children }) {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = authStore.getToken();
    const user = authStore.getUser();

    if (token && !user) {
      // Token exists but user was lost (e.g. localStorage corruption) — try to restore
      getMe()
        .then(({ data }) => {
          authStore.setUser({
            name: data.name,
            email: data.email,
            role: data.role,
          });
          setReady(true);
        })
        .catch(() => {
          authStore.clear();
          if (!window.location.pathname.includes("/login")) {
            navigate("/login");
          }
          setReady(true);
        });
    } else {
      setReady(true);
    }
  }, [navigate]);

  if (!ready) return null;
  return children;
}

// ── Route guards ──────────────────────────────────────────────────────────
function RequireAuth({ children, allowedRoles = [] }) {
  const navigate = useNavigate();
  const isAuth = authStore.isAuthenticated();
  const role = authStore.getRole();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login", { replace: true });
    } else if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      navigate(authStore.getHomePath(), { replace: true });
    }
  }, [isAuth, role, navigate, allowedRoles]);

  if (!isAuth) return null;
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) return null;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthInit>
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin */}
          <Route
            element={
              <RequireAuth allowedRoles={["ADMIN"]}>
                <AppLayout />
              </RequireAuth>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/glucose" element={<GlucoseLog />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/lab" element={<LabResults />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Doctor */}
          <Route
            path="/doctor"
            element={
              <RequireAuth allowedRoles={["DOCTOR"]}>
                <DoctorLayout />
              </RequireAuth>
            }
          >
            <Route
              index
              element={<Navigate to="/doctor/dashboard" replace />}
            />
            <Route path="dashboard" element={<DoctorDashboard />} />
            <Route path="patients" element={<MyPatients />} />
            <Route path="glucose" element={<DoctorGlucoseLog />} />
            <Route path="appointments" element={<DoctorAppointments />} />
            <Route path="patient-care" element={<PatientCare />} />
            <Route path="lab" element={<DoctorLabResults />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Patient */}
          <Route
            path="/patient"
            element={
              <RequireAuth allowedRoles={["PATIENT"]}>
                <PatientLayout />
              </RequireAuth>
            }
          >
            <Route
              index
              element={<Navigate to="/patient/dashboard" replace />}
            />
            <Route path="dashboard" element={<PatientDashboard />} />
            <Route path="glucose" element={<PatientGlucoseLog />} />
            <Route path="appointments" element={<PatientAppointments />} />
            <Route path="prescriptions" element={<PatientPrescriptions />} />
            <Route path="meal-plans" element={<PatientMealPlans />} />
            <Route path="lab" element={<PatientLabResults />} />
            <Route path="settings" element={<PatientSettings />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthInit>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </BrowserRouter>
  );
}
