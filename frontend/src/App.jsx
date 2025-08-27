import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute'; 

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorBlogList from './pages/DoctorBlogList';
import DoctorBlogCreate from './pages/DoctorBlogCreate';
import DoctorBlogEdit from './pages/DoctorBlogEdit';
import PatientBlogList from './pages/PatientBlogList';
import PatientBlogDetail from './pages/PatientBlogDetail';
import DoctorList from './pages/DoctorList';
import BookAppointment from './pages/BookAppointment';
import AppointmentConfirmed from './pages/AppointmentConfirmed';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #e0f2fe 0%, #f5faff 100%)',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}>
          <Navbar />
          <main style={{
            flex: 1,
            padding: 0,
            margin: 0,
            width: '100%',
            maxWidth: 'none',
          }}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<MotionWrapper><Home /></MotionWrapper>} />
                <Route path="/signup" element={<MotionWrapper><Signup /></MotionWrapper>} />
                <Route path="/login" element={<MotionWrapper><Login /></MotionWrapper>} />

                {/* ✅ Protected Routes */}
                <Route path="/patient/dashboard" element={
                  <PrivateRoute>
                    <MotionWrapper><PatientDashboard /></MotionWrapper>
                  </PrivateRoute>
                } />
                <Route path="/doctor/dashboard" element={
                  <PrivateRoute>
                    <MotionWrapper><DoctorDashboard /></MotionWrapper>
                  </PrivateRoute>
                } />

                <Route path="/doctor/blogs" element={
                  <PrivateRoute>
                    <MotionWrapper><DoctorBlogList /></MotionWrapper>
                  </PrivateRoute>
                } />
                <Route path="/doctor/blogs/create" element={
                  <PrivateRoute>
                    <MotionWrapper><DoctorBlogCreate /></MotionWrapper>
                  </PrivateRoute>
                } />
                <Route path="/doctor/blogs/edit/:blog_id" element={
                  <PrivateRoute>
                    <MotionWrapper><DoctorBlogEdit /></MotionWrapper>
                  </PrivateRoute>
                } />
                <Route path="/patient/blogs" element={
                  <PrivateRoute>
                    <MotionWrapper><PatientBlogList /></MotionWrapper>
                  </PrivateRoute>
                } />
                <Route path="/patient/blogs/:blog_id" element={
                  <PrivateRoute>
                    <MotionWrapper><PatientBlogDetail /></MotionWrapper>
                  </PrivateRoute>
                } />
                <Route path="/patient/doctors" element={
                  <PrivateRoute>
                    <MotionWrapper><DoctorList /></MotionWrapper>
                  </PrivateRoute>
                } />
                <Route path="/patient/book_appointment/:doctor_id" element={
                  <PrivateRoute>
                    <MotionWrapper><BookAppointment /></MotionWrapper>
                  </PrivateRoute>
                } />
                <Route path="/patient/appointment_confirmed/:appointment_id" element={
                  <PrivateRoute>
                    <MotionWrapper><AppointmentConfirmed /></MotionWrapper>
                  </PrivateRoute>
                } />
              </Routes>
            </AnimatePresence>
          </main>
          <footer style={{
            backgroundColor: '#1e3a8a',
            color: '#fff',
            padding: '20px',
            textAlign: 'center',
            fontSize: '0.875rem',
            boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
          }}>
            © 2025 Healthcare App. All rights reserved.
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}


const MotionWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20, scale: 0.98 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

export default App;
