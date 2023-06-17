import React, { useState } from 'react';
import axios from 'axios';
import './gestionPedidos.css';

const RegistroPedido = ({ clienteId, setIdPedido }) => {
  const [nroOrden, setNroOrden] = useState('');
  const [fechaPedido, setFechaPedido] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async (event) => {
    const registroPedido = {
      nroOrden,
      fechaPedido,
      descripcion,
      clienteId
    }
    event.preventDefault();
    try {
      const t = localStorage.getItem("jwt-token");
      const response = await axios.post(`https://backend-gestion-pedidos.onrender.com/api/v1/pedidos`, registroPedido,{
        headers: {
          Authorization: `Bearer ${t}`,
        },
      });
      const { idPedido } = response.data.data;
      console.log(idPedido);
      setIdPedido(idPedido.toString());

      console.log(response);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold">Información del Pedido</h1>
      <h2 className="text-xl font-bold">Completar Campos</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label htmlFor="nroOrden" className="block mb-2 text-sm font-semibold">Número de orden</label>
          <input
            type="text"
            className="border border-gray-300 py-2 px-3 rounded-lg w-full"
            id="nroOrden"
            value={nroOrden}
            onChange={(e) => setNroOrden(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="fechaPedido" className="block mb-2 text-sm font-semibold">Fecha de pedido</label>
          <input
            type="date"
            className="border border-gray-300 py-2 px-3 rounded-lg w-full"
            id="fechaPedido"
            value={fechaPedido}
            onChange={(e) => setFechaPedido(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="descripcion" className="block mb-2 text-sm font-semibold res">Descripción</label>
          <textarea
            className="border border-gray-300 py-2 px-3 rounded-lg w-full resize-none"
            id="descripcion"
            rows="3"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="clienteId" className="block mb-2 text-sm font-semibold">ID del cliente</label>
          <input
            type="text"
            className="border border-gray-300 py-2 px-3 rounded-lg w-full"
            id="clienteId"
            value={clienteId}
            onChange={(e) => setIdcliente(e.target.value)}
            required
            disabled
          />
        </div>
        <div className='flex justify-end'>
          <button type="submit" className="btn-primary absolute right-10 ">
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistroPedido;
