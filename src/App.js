import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Component/Login';
import Dashboard from './Component/Dashboard';
import NotFound from "./Component/NotFound";
import Register from './Component/Register';

function App() {
  return (

      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
