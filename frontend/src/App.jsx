import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import ListarM from './pages/ListarM';
import 'tailwindcss/tailwind.css';
import AdicionarM from './pages/AdicionarM';
import ModificarM from './pages/ModificarM';
import ConsultarM from './pages/ConsultarM';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />} >  
          <Route path="/ListarM" element={<ListarM />} />
        <Route path="/AdicionarM" element={<AdicionarM />} />
        <Route path="/ModificarM/:id_mascota" element={<ModificarM />} />
        {/* Ajusta la ruta para incluir el parámetro id_mascota */}
        <Route path="/ConsultarM/:id_mascota" element={<ConsultarM />} />  </Route>
        
      </Routes>
    </BrowserRouter>
  );
}


export default App;
