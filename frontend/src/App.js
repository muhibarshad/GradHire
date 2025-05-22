// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { Suspense, lazy } from "react";

import Spinner from "./pages/Spinner";
import { PrivateRoute, PublicRoute } from "./routes/authRoutes";

import LoginForm from "./pages/Login";
const SignUp = lazy(() => import("./pages/Signup/SignUp"));
const ResetPassword = lazy(() =>
  import("./pages/ForgetPassword/ResetPassword")
);
const ForgetPassword = lazy(() =>
  import("./pages/ForgetPassword/ForgetPassword")
);
const EmailOtp = lazy(() =>
  import("./pages/EmailandPhoneConfirmation/EmailOtp")
);
const DashBoard = lazy(() => import("./pages/UserDashBoard/DashBoard"));
const CompanyDash = lazy(() => import("./pages/CompanyDashboard/Dashboard"));
const LandingPage = lazy(() => import("./pages/LandingPage/Landing"));
const PageNotFound = lazy(() => import("./pages/ErrorTemplates/PageNotFound"));

function App() {
  return (
    <>
      <CssBaseline />
      <StyledEngineProvider>
        <Suspense fallback={<Spinner />}>
          <Routes>
            {/* Public routes: only visible if NOT authenticated */}
            <Route
              path="/"
              element={
                <PublicRoute>
                  <LandingPage />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginForm />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              }
            />
            <Route
              path="/verifyEmail"
              element={
                <PublicRoute>
                  <EmailOtp />
                </PublicRoute>
              }
            />
            <Route
              path="/forgetPassword"
              element={
                <PublicRoute>
                  <ForgetPassword />
                </PublicRoute>
              }
            />
            <Route
              path="/resetPassword/:token"
              element={
                <PublicRoute>
                  <ResetPassword />
                </PublicRoute>
              }
            />

            {/* Private routes: only visible if authenticated */}
            <Route
              path="user/*"
              element={
                <PrivateRoute>
                  <DashBoard />
                </PrivateRoute>
              }
            />
            <Route
              path="company/*"
              element={
                <PrivateRoute>
                  <CompanyDash />
                </PrivateRoute>
              }
            />

            {/* Fallback for 404s */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </StyledEngineProvider>
    </>
  );
}

export default App;
