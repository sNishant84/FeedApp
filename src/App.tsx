import React, { useState } from 'react';
import {LoginPage} from './Components/Login';
import Feed from './Components/Feed';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'; 
import './App.css';

function App() {

  return (
    <Router>
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Feed />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
    </AuthProvider>
  </Router>
   
    );  
}

export default App;
