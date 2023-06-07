import React, { useState } from "react";
import axios from "axios";
import "../style/AddProducts.css";



const AddClientes = ({ crearClientes }) => {
  const [clientes, setClientes] = useState({
    cedula: "",
    nombre: "",
    direccion: "",
    telefono: "",
    email: ""
  });

  const [error, setError] = useState(false);

  const actualizarEstado = (e) => {
    setClientes({
      ...clientes,
      [e.target.name]: e.target.value
    });
  };

  const {idCliente, nombre, direccion, telefono, email} = clientes;

  const submitCliente = (e) => {
    const t = localStorage.getItem("jwt-token");
    e.preventDefault();

    if (
      idCliente.trim() === "" ||
      nombre.trim() === "" ||
      direccion.trim() === "" ||
      email.trim() === ""
    ) {
      setError(true);
      return;
    }

    setError(false);

    axios
      .post("http://localhost:3000/api/v1/clientes", clientes, {
        headers: {
          Authorization: `Bearer ${t}`
        }
      })
      .then((response) => {
        console.log(response.data.data); // Maneja la respuesta del backend
        crearClientes(clientes);
        setClientes({
            cedula: "",
            nombre: "",
            direccion: "",
            telefono: "",
            email: ""
        });
      })
      .catch((error) => {
        console.error(error); // Maneja los errores en caso de que ocurran
      });
  };

  return (
    <form onSubmit={submitCliente}>
        <div>
            <label>
                Cedula
            </label>
            <input 
            type="text"
            name="idCliente"
            value={idCliente}
            onChange={actualizarEstado}
            required
            />

            <br />

            <label>
                Nombre
            </label>
            <input 
            type='text'
            name='nombre'
            value={nombre}
            onChange={actualizarEstado}
            required
            />

            <br />

            <label>
                Dirección
            </label>
            <input
            type='text'
            name="direccion"
            value={direccion}
            onChange={actualizarEstado}
            required
            />

           <br />

           <label>
                Telefono
            </label> 
            <input 
            className="p-2 border border-gray-600 rounded-2xl block shadow-2xl"
            type='number'
            name='telefono'
            value={telefono}
            onChange={actualizarEstado}
            />

            <br />

            <label>
                Email
            </label>
            <input
            className="p-2 border border-gray-600 rounded-2xl block shadow-2xl"
            type='email'
            name='email'
            value={email}
            onChange={actualizarEstado}
            required
            />

            <br /> 
        </div>

        <button type="submit" className="btn btn-outline-success">
            CREAR 
        </button>
    </form>
  );
};

export default AddClientes;
