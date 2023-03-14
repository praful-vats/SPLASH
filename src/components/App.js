import React, { useState, useEffect } from 'react';
import Launch from './Launch'
import Login from './Login'
import Signup from './Signup'
import Tabs from './Tabs'
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { FirebaseProvider } from '../contexts/FirebaseContext';
import './App.css';

function App() {
  const [showLaunch, setShowLaunch] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLaunch(false);
    }, 3000);
  }, []);

  return (
    <div className='body'>
      {showLaunch ? (
        <Launch />
      ) : (
    <>
      <Container className="d-flex justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Router>
            <AuthProvider>
            <FirebaseProvider>
            <Routes>
              <Route path="/" element={<Signup/>} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/tabs" element={<Tabs />} />
            </Routes>
            </FirebaseProvider>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </>
  )}
  </div>
);
}

export default App;

