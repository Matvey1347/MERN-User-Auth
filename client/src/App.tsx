import { Navigate, Routes, Route, Outlet } from 'react-router-dom'
import RegisterPage from './pages/auth/Register'
import LoginPage from './pages/auth/Login'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from './pages/profile/Profile'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import CheckEmail from './pages/auth/CheckEmail'
import MainLayout from './layouts/MainLayout'

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth">
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="check-email" element={<CheckEmail />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={<MainLayout>
          <Outlet />
        </MainLayout>}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
