import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Components
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import UploadContent from './components/UploadContent'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="app">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <main className="container">
          <Routes>
            <Route path="/login" element={
              !isAuthenticated ? 
                <Login setIsAuthenticated={setIsAuthenticated} /> : 
                <Navigate to="/dashboard" />
            } />
            <Route path="/register" element={
              !isAuthenticated ? 
                <Register setIsAuthenticated={setIsAuthenticated} /> : 
                <Navigate to="/dashboard" />
            } />
            <Route path="/dashboard" element={
              isAuthenticated ? 
                <Dashboard /> : 
                <Navigate to="/login" />
            } />
            <Route path="/upload" element={
              isAuthenticated ? 
                <UploadContent /> : 
                <Navigate to="/login" />
            } />
            <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
