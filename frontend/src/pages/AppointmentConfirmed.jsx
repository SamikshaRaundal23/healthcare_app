import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

const AppointmentConfirmed = () => {
  const { appointment_id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [error, setError] = useState(null);
  const { authState } = useContext(AuthContext);
  const { isAuthenticated, userType, accessToken } = authState;
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Auth state:", authState);
    if (!isAuthenticated || userType !== 'patient') {
      console.warn("User not authenticated or not patient.");
      navigate('/login');
      return;
    }

    const fetchAppointment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/patient/appointment_confirmed/${appointment_id}/`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        console.log("Fetched appointment:", response.data);
        setAppointment(response.data);
      } catch (err) {
        console.error("Fetch appointment error:", err.response?.data);
        setError(err.response?.data?.error || 'Failed to fetch appointment details');
      }
    };

    fetchAppointment();
  }, [appointment_id, isAuthenticated, userType, accessToken, navigate]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  if (!appointment && !error) {
    return (
      <motion.div style={{ textAlign: 'center', padding: '20px', fontFamily: "'Inter', sans-serif" }}>
        Loading appointment details...
      </motion.div>
    );
  }


  return (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #d1fae5, #bfdbfe)',
      fontFamily: "'Inter', sans-serif",
    }}
  >
    <div
      style={{
        backgroundColor: '#ffffff',
        padding: '30px 40px',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        width: '90%',
        maxWidth: '400px',
      }}
    >
    
      <h2
        style={{
          fontSize: '1.8rem',
          color: '#059669', 
          marginBottom: '25px',
          fontWeight: '700',
        }}
      >
        🎉 Appointment Confirmed!
      </h2>

      {/* Appointment Details */}
      <p style={{ fontSize: '1rem', color: '#374151', marginBottom: '12px' }}>
        <strong>Doctor:</strong> Dr. {appointment?.doctor?.first_name} {appointment?.doctor?.last_name}
      </p>
      <p style={{ fontSize: '1rem', color: '#374151', marginBottom: '12px' }}>
        <strong>Date:</strong> {appointment?.date}
      </p>
      <p style={{ fontSize: '1rem', color: '#374151', marginBottom: '12px' }}>
        <strong>Start Time:</strong> {appointment?.start_time}
      </p>
      <p style={{ fontSize: '1rem', color: '#374151', marginBottom: '20px' }}>
        <strong>End Time:</strong> {appointment?.end_time}
      </p>

      {/* Dashboard Button */}
      <button
        onClick={() => navigate('/patient/dashboard')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#3b82f6',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: '600',
        }}
      >
        Go to Dashboard
      </button>
    </div>
  </div>
);

};

export default AppointmentConfirmed;