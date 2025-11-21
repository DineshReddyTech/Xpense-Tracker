import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Welcome from './components/Welcome';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Expense from './pages/Expense';
import MyCalculations from './pages/MyCalculations';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/list" element={<MyCalculations />} />
      </Routes>
    </Router>
  );
}

export default App;
