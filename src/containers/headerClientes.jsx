import React, { useState, useEffect } from "react";
import axios from "axios";
import BotonAgregarClientes from "../components/BotonAgregarCliente";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import "./header.css";

const Header = () => {
  const [clientes, setClientes] = useState([]);
  const [formulario, setFormulario] = useState([]);
  const [editarForm, setEditarForm] = useState(false);
  const [filtrocedula, setFiltroCedula] = useState("");
  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      const token = localStorage.getItem("jwt-token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        "https://backend-gestion-pedidos.onrender.com/api/v1/clientes",
        { headers }
      );
      setClientes(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const agregarCliente = (cliente) => {
    setClientes([...clientes, cliente]);
  };

  const cerrarModalActualizar = () => {
    setEditarForm(false);
  };

  const seleccionarElemento = (elemento) => {
    setFormulario({
      id: elemento.idCliente,
      nombre: elemento.nombre,
      direccion: elemento.direccion,
      telefono: elemento.telefono,
      email: elemento.email,
    });
    setEditarForm(true);
  };
  const eliminarCliente = async (id) => {
    try {
      const token = localStorage.getItem("jwt-token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.delete(`https://backend-gestion-pedidos.onrender.com/api/v1/clientes/${id}`, {
        headers,
      });
      const nuevosClientes = clientes.filter((cliente) => cliente.id !== id);
      setClientes(nuevosClientes);
      cargarClientes();
    } catch (error) {
      console.log(error);
    }
  };

  const editarCliente = async (id, clienteEditado) => {
    try {
      const token = localStorage.getItem("jwt-token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.patch(
        `https://backend-gestion-pedidos.onrender.com/api/v1/clientes/${id}`,
        clienteEditado,
        { headers }
      );
      const nuevosClientes = clientes.map((cliente) =>
        cliente.id === id ? clienteEditado : cliente
      );
      setClientes(nuevosClientes);
      cerrarModalActualizar();
      cargarClientes();
    } catch (error) {
      console.log(error);
    }
  };

  const titulo = clientes.length === 0 ? "No hay Clientes registrados" : "";

  const filtrarClientesCedula = (clientes, filtroCedula) => {
    return clientes.filter((cliente) =>
      cliente.nombre.toLowerCase().includes(filtroCedula.toLowerCase())
    );
  };

  const clientesFiltrados = filtrarClientesCedula(clientes, filtrocedula);

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand font-bold shadow-2xl" href="#">
            Clientes
          </a>
          <nav className="navbar bg-body-tertiary">
            <div>
              <BotonAgregarClientes agregarCliente={agregarCliente} />
            </div>
          </nav>
        </div>
      </nav>
      <div className="grilla">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={filtrocedula}
          onChange={(e) => setFiltroCedula(e.target.value)}
        />

        <Table className="mt-7">
          <thead>
            <tr>
              <th data-titulo="cedula">Cedula</th>
              <th data-titulo="nombre">Nombre del Cliente</th>
              <th data-titulo="direccion">Dirección</th>
              <th data-titulo="telefono">Telefono</th>
              <th data-titulo="email">Email</th>
              <th data-titulo="Acciones">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map((elemento) => (
              <tr key={elemento.id}>
                <td>{elemento.idCliente}</td>
                <td>{elemento.nombre}</td>
                <td>{elemento.direccion}</td>
                <td>{elemento.telefono}</td>
                <td>{elemento.email}</td>
                <td>
                  <Button
                    color="primary"
                    onClick={() => seleccionarElemento(elemento)}
                  >
                    Editar
                  </Button>
                  <Button
                  className="ml-2"
                    color="danger"
                    onClick={() => eliminarCliente(elemento.idCliente)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal isOpen={editarForm} toggle={cerrarModalActualizar}>
        <ModalHeader>Editar Cliente</ModalHeader>
        <ModalBody>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre del Cliente</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={formulario.nombre}
                onChange={(e) =>
                  setFormulario({ ...formulario, nombre: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="direccion">Direccion</label>
              <input
                type="text"
                className="form-control"
                id="direccion"
                name="direccion"
                value={formulario.direccion}
                onChange={(e) =>
                  setFormulario({ ...formulario, direccion: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="cantidad">Telefono</label>
              <input
                type="number"
                className="form-control"
                id="telefono"
                name="telefono"
                value={formulario.telefono}
                onChange={(e) =>
                  setFormulario({ ...formulario, telefono: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <textarea
                className="form-control"
                id="email"
                name="email"
                value={formulario.email}
                onChange={(e) =>
                  setFormulario({ ...formulario, email: e.target.value })
                }
              ></textarea>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => editarCliente(formulario.id, formulario)}
          >
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
