import React, { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ProtectedRoute() {
  const auth = window.localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      Swal.fire({
        title: 'Error!',
        text: 'Error! Debes validarte para poder acceder a la ruta',
        icon: 'error',
        confirmButtonText: 'Cool'
      }).then(() => {
        navigate('/');
      });
    }
  }, [auth, navigate]);

  if (!auth) {
    return null; // Retorna null mientras el useEffect maneja la redirección
  }

  return <Outlet />;
}

export default ProtectedRoute;