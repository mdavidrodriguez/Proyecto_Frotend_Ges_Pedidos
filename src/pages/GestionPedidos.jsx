import Pedidos from "../components/Pedidos";
import RegistroPedido from "../components/RegistroPedido";
import { Link,Navigate } from "react-router-dom";
import { useState } from "react";
import Productos from "./Productos";

const GestionPedidos = () => {
  const [clienteId, setClienteId] = useState("");
  const [pedidoId, setIdPedido] = useState("");
  const [mostrarProductos, setMostrarProductos] = useState(false); 

  const handleMostrarProductos = () => {
    setMostrarProductos(true); 
  };

  const handleFinalizar = () => {
    setClienteId(""); 
    setIdPedido(""); 
    setMostrarProductos(false);
  };

  return (
    <div className="container mx-auto ">
        <div className="container flex justify-center">
          <Pedidos setClienteId={setClienteId} />
          <RegistroPedido clienteId={clienteId} setIdPedido={setIdPedido} />
        </div>
        {mostrarProductos ? (
          <Productos pedidoId={pedidoId} />
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute right-64"
            onClick={handleMostrarProductos}
          >
            Siguiente
          </button>
        )}
        <button
          className="btn btn-outline btn-success right-4 top-4 fixed "
          onClick={handleFinalizar}
        >
          Finalizar
        </button>
    </div>
  );
};

export default GestionPedidos;
