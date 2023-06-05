import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import { Signup } from "../components/Login/Signup/Signup";
import Dasboard from "../components/Dasboard";
import GestionPedidos from "../pages/GestionPedidos";
import { NavBar } from "../components/NavBar";
import { useState,useEffect } from "react";
import ListadoPedidos from "../pages/ListadoPedidos";
import Header from '../containers/Header'
import HeaderClientes from '../containers/headerClientes'

export function MyRoutes () {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Aquí puedes agregar cualquier otra lógica de cierre de sesión, como borrar el token almacenado.
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <BrowserRouter>
       {isLoggedIn && <NavBar onLogout={handleLogout} />}
      <Routes>
      <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/registro" element={<Signup />} />
        <Route path="/principal" element={<Dasboard />} />
        <Route path="/gestionpedidos" element={<GestionPedidos />} />
        <Route path="/listado" element={<ListadoPedidos />} />
        <Route path="/productos" element={<Header />} />
        <Route path="/clientes" element={<HeaderClientes />} />

        {/* <Route path="/regispedidos" element={<RegistroPedido />} /> */}
        {/* <Route path="/productos" element={<Productos />} /> */}
      </Routes>
    </BrowserRouter>
  )
}
