import  { useState } from "react";
import axios from "axios";
import './gestionPedidos.css';

const Pedidos = ({ setClienteId }) => {
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt-token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.get(`http://localhost:3000/api/v1/clientes/${formData.id}`,{ headers });
      const { idCliente, nombre, direccion, telefono, email } = res.data.data;
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: idCliente,
        nombre,
        direccion,
        telefono,
        email,
      }));
      setClienteId(idCliente.toString());
      
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Datos del Pedido</h1>
      <form onSubmit={handleSubmit} className="form-cliente">
        <h2 className="text-xl font-bold">Verificar Cliente</h2>
        <div className="form-group mb-4">
          <label htmlFor="id" className="block mb-2 text-sm font-semibold">ID</label>
          <input
            type="number"
            className="border border-gray-300 py-2 px-3 rounded-lg w-full"
            id="id"
            name="id"
            onChange={handleChange}
            value={formData.id}
            required
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="nombre" className="block mb-2 text-sm font-semibold">Nombre</label>
          <input
            type="text"
            className="border border-gray-300 py-2 px-3 rounded-lg w-full"
            id="nombre"
            name="nombre"
            onChange={handleChange}
            value={formData.nombre || ""}
            disabled
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="direccion" className="block mb-2 text-sm font-semibold">Dirección</label>
          <input
            type="text"
            className="border border-gray-300 py-2 px-3 rounded-lg w-full"
            id="direccion"
            name="direccion"
            onChange={handleChange}
            value={formData.direccion || ""}
            disabled
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="telefono" className="block mb-2 text-sm font-semibold">Teléfono</label>
          <input
            type="number"
            className="border border-gray-300 py-2 px-3 rounded-lg w-full"
            id="telefono"
            name="telefono"
            onChange={handleChange}
            value={formData.telefono || ""}
            disabled
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-semibold">Correo Electrónico</label>
          <input
            type="email"
            className="border border-gray-300 py-2 px-3 rounded-lg w-full"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email || ""}
            disabled
          />
        </div>

        <button type="submit" className="btn btn-active btn-primary w-30     bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Buscar
        </button>
      </form>
    </div>
  );
};

export default Pedidos;
