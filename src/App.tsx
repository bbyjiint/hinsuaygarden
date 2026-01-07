import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import JobList from './pages/JobList'
import JobDetail from './pages/JobDetail'
import Appointment from './pages/Appointment'
import FileUpload from './pages/FileUpload'
import Quotation from './pages/Quotation'
import Payment from './pages/Payment'
import ForemanView from './pages/ForemanView'
import Layout from './components/Layout'

export type UserRole = 'admin' | 'foreman' | 'owner' | null

function App() {
  const [userRole, setUserRole] = useState<UserRole>(null)

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={
            userRole ? (
              <Navigate to="/" replace />
            ) : (
              <Login onLogin={setUserRole} />
            )
          } 
        />
        <Route
          path="/"
          element={
            userRole ? (
              <Layout userRole={userRole} onLogout={() => setUserRole(null)}>
                <Dashboard userRole={userRole} />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/jobs"
          element={
            userRole ? (
              <Layout userRole={userRole} onLogout={() => setUserRole(null)}>
                <JobList />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/jobs/:id"
          element={
            userRole ? (
              <Layout userRole={userRole} onLogout={() => setUserRole(null)}>
                <JobDetail />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/appointment/:jobId"
          element={
            userRole ? (
              <Layout userRole={userRole} onLogout={() => setUserRole(null)}>
                <Appointment />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/files/:jobId"
          element={
            userRole ? (
              <Layout userRole={userRole} onLogout={() => setUserRole(null)}>
                <FileUpload />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/quotation/:jobId"
          element={
            userRole ? (
              <Layout userRole={userRole} onLogout={() => setUserRole(null)}>
                <Quotation />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/payment/:jobId"
          element={
            userRole ? (
              <Layout userRole={userRole} onLogout={() => setUserRole(null)}>
                <Payment />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/foreman/:jobId"
          element={
            userRole === 'foreman' || userRole === 'admin' ? (
              <Layout userRole={userRole} onLogout={() => setUserRole(null)}>
                <ForemanView />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App

