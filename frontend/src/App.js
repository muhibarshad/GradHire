import { Route, Routes, Navigate } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { lazy, Suspense } from 'react'

import { CssBaseline, StyledEngineProvider } from '@mui/material'

import Spinner from './pages/Spinner'
import LoginForm from './pages/Login/index'
const SignUp = lazy(() => import('./pages/Signup/SignUp'))

const ResetPassword = lazy(() => import('./pages/ForgetPassword/ResetPassword'))
const PageNotFound = lazy(() => import('./pages/ErrorTemplates/PageNotFound'))
const DashBoard = lazy(() => import('./pages/UserDashBoard/DashBoard'))
const EmailOtp = lazy(() =>
  import('./pages/EmailandPhoneConfirmation/EmailOtp')
)

const CompanyDashBoard = lazy(() =>
  import('./pages/CompanyDashboard/Dashboard')
)
const LandingPage = lazy(() => import('./pages/LandingPage/Landing'))

const ForgetPassword = lazy(() =>
  import('./pages/ForgetPassword/ForgetPassword')
)

function App() {
  return (
    <>
      <CssBaseline />

      <StyledEngineProvider>
        <Suspense fallback={<Spinner />}>
          <Routes>
            {/* Authentication */}
            <Route path='/' exact element={<LandingPage />} />
            <Route path='/signup' exact element={<SignUp />} />
            <Route path='/login' exact element={<LoginForm />} />
            <Route path='/verifyEmail' exact element={<EmailOtp />} />
            <Route path='/forgetPassword' exact element={<ForgetPassword />} />
            <Route
              path='/resetPassword/:token'
              exact
              element={<ResetPassword />}
            />

            {/* User Routes */}
            <Route path='user/*' exact element={<DashBoard />} />

            <Route path='company/*' exact element={<CompanyDashBoard />} />

            <Route path='/' exact element={<Navigate replace to='/login' />} />
            <Route path='*' exact element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </StyledEngineProvider>
    </>
  )
}

export default App
