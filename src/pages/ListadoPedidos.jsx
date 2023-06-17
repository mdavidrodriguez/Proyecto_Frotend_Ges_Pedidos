import React, { useState, useEffect } from "react";
import axios from "axios";

const ListadoPedidos = () => {
  const [datosJoin, setDatosJoin] = useState([]);
  const [idClienteFiltro, setIdClienteFiltro] = useState("");
  const [datosFiltrados, setDatosFiltrados] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("jwt-token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get("https://backend-gestion-pedidos.onrender.com/api/v1/pedidos/listado", { headers });
      const datosJoin = response.data.data;
      setDatosJoin(datosJoin);
      console.log(datosJoin);
    } catch (error) {
      console.error(error);
    }
  };

  const filtrarPorIdCliente = () => {
    if (idClienteFiltro.trim() === "") {
      setDatosFiltrados([]);
    } else {
      const datosFiltrados = datosJoin.filter((data) => data.Cliente.idCliente == idClienteFiltro);
      setDatosFiltrados(datosFiltrados);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-3xl font-bold mb-4">Listado de Pedidos</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="w-1/3 border border-gray-300 px-4 py-2 mr-2 rounded-md"
          placeholder="ID Cliente"
          value={idClienteFiltro}
          onChange={(e) => setIdClienteFiltro(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={filtrarPorIdCliente}
        >
          Filtrar
        </button>
      </div>
      <table className="w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-700 text-white border-b">Id Pedido</th>
            <th className="py-2 px-4 bg-gray-700 text-white border-b">Fecha Pedido</th>
            <th className="py-2 px-4 bg-gray-700 text-white border-b">Cedula</th>
            <th className="py-2 px-4 bg-gray-700 text-white border-b">Nombre Cliente</th>
            <th className="py-2 px-4 bg-gray-700 text-white border-b">Correo</th>
            <th className="py-2 px-4 bg-gray-700 text-white border-b">Productos</th>
          </tr>
        </thead>
        <tbody>
          {idClienteFiltro.trim() === "" && datosFiltrados.length === 0
            ? datosJoin.map((data) => (
                <tr key={data.idPedido}>
                  <td className="py-2 px-4 border-b text-gray-800">{data.idPedido}</td>
                  <td className="py-2 px-4 border-b text-gray-800">{data.fechaPedido}</td>
                  <td className="py-2 px-4 border-b text-gray-800">{data.Cliente.idCliente}</td>
                  <td className="py-2 px-4 border-b text-gray-800">{data.Cliente.nombre}</td>
                  <td className="py-2 px-4 border-b text-gray-800">{data.Cliente.email}</td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {data.Productos.length > 0 ? (
                      data.Productos.map((producto, index) => (
                        <span key={index}>
                          {producto.nombre}: {producto.precio}
                          {index !== data.Productos.length - 1 && ", "}
                        </span>
                      ))
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))
            : datosFiltrados.map((data) => (
                <tr key={data.idPedido}>
                  <td className="py-2 px-4 border-b text-gray-800">{data.idPedido}</td>
                  <td className="py-2 px-4 border-b text-gray-800">{data.fechaPedido}</td>
                  <td className="py-2 px-4 border-b text-gray-800">{data.Cliente.idCliente}</td>
                  <td className="py-2 px-4 border-b text-gray-800">{data.Cliente.nombre}</td>
                  <td className="py-2 px-4 border-b text-gray-800">{data.Cliente.email}</td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {data.Productos.length > 0 ? (
                      data.Productos.map((producto, index) => (
                        <span key={index}>
                          {producto.nombre}: {producto.precio}
                          {index !== data.Productos.length - 1 && ", "}
                        </span>
                      ))
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoPedidos;
