import React, { useState, useEffect } from "react";
import axios from "axios";
import BotonAgregarProductos from "../components/BotonAgregarProductos";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import "./header.css";

const Header = () => {
  const [productos, setProductos] = useState([]);
  const [formulario, setFormularioDatos] = useState([]);
  const [editarForm, setEditarForm] = useState(false);
  const [filtroNombre, setFiltroNombre] = useState(""); // Nuevo estado para el filtro de búsqueda

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const token = localStorage.getItem("jwt-token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get("http://localhost:3000/api/v1/inventario", { headers });
      setProductos(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const agregarProducto = (producto) => {
    setProductos([...productos, producto]);
  };

  const cerrarModalActualizar = () => {
    setEditarForm(false);
  };

  const seleccionarElemento = (elemento) => {
    setFormularioDatos({
      id: elemento.idInventario,
      nombre: elemento.nombre,
      precio: elemento.precio,
      cantidad: elemento.cantidad,
      descripcion: elemento.descripcion,
    });
    setEditarForm(true);
  };
  
  const eliminarProducto = async (id) => {
    try {
      const token = localStorage.getItem("jwt-token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.delete(`http://localhost:3000/api/v1/inventario/${id}`, { headers });
      const nuevosProductos = productos.filter((producto) => producto.id !== id);
      setProductos(nuevosProductos);
      cargarProductos();
    } catch (error) {
      console.log(error);
    }
  };

  const editarProducto = async (id, productoEditado) => {
    try {
      const token = localStorage.getItem("jwt-token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.patch(`http://localhost:3000/api/v1/inventario/${id}`, productoEditado, { headers });
      const nuevosProductos = productos.map((producto) =>
        producto.id === id ? productoEditado : producto
      );
      setProductos(nuevosProductos);
      cerrarModalActualizar();
      cargarProductos();

    } catch (error) {
      console.log(error);
    }
  };

  const totalProductos = productos.length;
  const costoTotal = productos.reduce((total, producto) => {
    return total + producto.precio * producto.cantidad;
  }, 0);

  const titulo = productos.length === 0 ? "No hay Productos" : "";

  const filtrarProductosPorNombre = (productos, filtroNombre) => {
    return productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
    );
  };

  const productosFiltrados = filtrarProductosPorNombre(productos, filtroNombre);

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Inventario
          </a>
          <nav className="navbar bg-body-tertiary">
            <div>
              <BotonAgregarProductos agregarProducto={agregarProducto} />
            </div>
          </nav>
        </div>
      </nav>
      <div className="grilla">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
        />

      <div className="card-1">
        <h3>
          Total de productos <i className="fa-solid fa-boxes-stacked"></i>
        </h3>
        <p className="card-info">
          <i className="fas fa-2x fa-shopping-cart"></i>
          {totalProductos}
        </p>
      </div>

      <div className="card-1">
        <h3>
          Costo total de productos <i className="fas fa-dollar-sign"></i>
        </h3>
        <p className="card-info">
          <i className="fa-sharp fa-solid fa-sack-dollar"></i>${costoTotal}
        </p>
      </div>

   

        <Table>
          <thead>
            <tr>
              <th data-titulo="nombre">Nombre del Producto</th>
              <th data-titulo="Precio">Precio</th>
              <th data-titulo="Cantidad">Stock</th>
              <th data-titulo="Descripcion">Descripción</th>
              <th data-titulo="Acciones">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((elemento) => (
              <tr key={elemento.id}>
                <td>{elemento.nombre}</td>
                <td>{elemento.precio}</td>
                <td>{elemento.cantidad}</td>
                <td>{elemento.descripcion}</td>
                <td>
                  <Button color="primary" onClick={() => seleccionarElemento(elemento)}>
                    Editar
                  </Button>
                  <Button color="danger" onClick={() => eliminarProducto(elemento.idInventario)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal isOpen={editarForm} toggle={cerrarModalActualizar}>
        <ModalHeader>Editar Producto</ModalHeader>
        <ModalBody>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre del Producto</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={formulario.nombre}
                onChange={(e) =>
                  setFormularioDatos({ ...formulario, nombre: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="precio">Precio</label>
              <input
                type="number"
                className="form-control"
                id="precio"
                name="precio"
                value={formulario.precio}
                onChange={(e) =>
                  setFormularioDatos({ ...formulario, precio: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="cantidad">Cantidad</label>
              <input
                type="number"
                className="form-control"
                id="cantidad"
                name="cantidad"
                value={formulario.cantidad}
                onChange={(e) =>
                  setFormularioDatos({ ...formulario, cantidad: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                className="form-control"
                id="descripcion"
                name="descripcion"
                value={formulario.descripcion}
                onChange={(e) =>
                  setFormularioDatos({ ...formulario, descripcion: e.target.value })
                }
              ></textarea>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => editarProducto(formulario.id, formulario)}>
            Guardar
          </Button>{" "}
          <Button color="secondary" onClick={cerrarModalActualizar}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Header;
