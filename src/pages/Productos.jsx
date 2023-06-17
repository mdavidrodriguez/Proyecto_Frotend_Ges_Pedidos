import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Table } from "react-bootstrap";

const Productos = ({ pedidoId }) => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tableData, setTableData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const token = localStorage.getItem("jwt-token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get("https://backend-gestion-pedidos.onrender.com/api/v1/inventario",{headers});
        setTableData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTableData();
  }, []);

  const limpiarFormulario = () => {
    setNombre("");
    setPrecio("");
    setCantidad("");
    setDescripcion("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const productos = {
        nombre,
        precio,
        cantidad,
        descripcion,
        pedidoId,
      };

      const t = localStorage.getItem("jwt-token");
      const response = await axios.post(
        "https://backend-gestion-pedidos.onrender.com/api/v1/productos",
        productos,
        {
          headers: {
            Authorization: `Bearer ${t}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    } 
    limpiarFormulario();
  };

  const handleTableRowClick = (item) => {
    setSelectedItem(item);
    setNombre(item.nombre);
    setPrecio(item.precio);
    setCantidad(item.cantidad);
    setDescripcion(item.descripcion);
    setShowModal(false); // Cerrar el modal después de seleccionar un registro
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Agregar Productos</h1>
        <h2 className="text-xl font-bold">Completar Campos</h2>

        <Button variant="primary" onClick={() => setShowModal(true)}>
          Seleccionar del Inventario
        </Button>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Tabla de Registros</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => handleTableRowClick(item)}
                    className={selectedItem === item ? "selected" : ""}
                  >
                    <td>{item.nombre}</td>
                    <td>{item.precio}</td>
                    <td>{item.cantidad}</td>
                    <td>{item.descripcion}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block mb-2 text-sm font-semibold">
              Nombre
            </label>
            <input
              type="text"
              className="border border-gray-300 py-2 px-3 rounded-lg w-10/12"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="precio" className="block mb-2 text-sm font-semibold">
              Precio
            </label>
            <input
              type="number"
              className="border border-gray-300 py-2 px-3 rounded-lg w-10/12"
              id="precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cantidad" className="block mb-2 text-sm font-semibold">
              Cantidad
            </label>
            <input
              type="number"
              className="border border-gray-300 py-2 px-3 rounded-lg w-10/12"
              id="cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="descripcion" className="block mb-2 text-sm font-semibold">
              Descripción
            </label>
            <textarea
              className="border border-gray-300 py-2 px-3 rounded-lg w-10/12 resize-none"
              id="descripcion"
              rows="3"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="pedidoId" className="block mb-2 text-sm font-semibold">
              PedidoId
            </label>
            <input
              type="text"
              className="border border-gray-300 py-2 px-3 rounded-lg w-10/12"
              id="pedidoId"
              value={pedidoId}
              onChange={(e) => setIdPedido(e.target.value)}
              required
              disabled
            />
          </div>
          <button type="submit" className="btn btn-active btn-accent">
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Productos;
