import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode'; 
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' }); 
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/token/",
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { access, refresh, user_type } = response.data;
      const decoded = jwt_decode(access);
      console.log("Decoded JWT:", decoded); 

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("userType", user_type);


      localStorage.setItem("username", decoded.username);
      localStorage.setItem("email", decoded.email);
      localStorage.setItem("first_name", decoded.first_name);
      localStorage.setItem("last_name", decoded.last_name);
      localStorage.setItem("address_line1", decoded.address_line1);
      localStorage.setItem("city", decoded.city);
      localStorage.setItem("state", decoded.state);
      localStorage.setItem("pincode", decoded.pincode);
      localStorage.setItem("profile_picture", decoded.profile_picture);

      login({
        accessToken: access,
        refreshToken: refresh,
        userType: user_type,
      });

      setSuccessMessage("Login successful!");
      setError(null);

      if (user_type === "patient") navigate("/patient/dashboard");
      else if (user_type === "doctor") navigate("/doctor/dashboard");
      else setError("Invalid user type");

    } catch (err) {
      console.error("Login error:", err); 
      const backendError = err.response?.data?.detail || err.response?.data?.error;
      setError(backendError || "Invalid credentials");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("src/assets/Login.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              style={{
                backgroundColor: '#10b981',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '8px',
                marginBottom: '10px',
                textAlign: 'center',
              }}
            >
              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{ color: '#ef4444', textAlign: 'center', marginBottom: '16px' }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#1e3a8a' }}>Welcome Back</h2>

        <label>Username</label>
        <input
          type="text"npm 
          name="username"
          value={credentials.username}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '12px', marginBottom: '16px' }}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '12px', marginBottom: '16px' }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Sign In
        </button>

        <p style={{ textAlign: 'center', marginTop: '16px' }}>
          Not registered yet? <Link to="/signup" style={{ color: '#3b82f6' }}>Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
