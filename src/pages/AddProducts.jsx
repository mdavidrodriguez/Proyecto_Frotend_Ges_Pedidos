import React, { useState } from "react";
import axios from "axios";
import "../style/AddProducts.css";

const AddProducts = ({ crearProductos }) => {
  const [products, setProducts] = useState({
    nombre: "",
    precio: "",
    cantidad: "",
    descripcion: ""
  });

  const [error, setError] = useState(false);

  const actualizarEstado = (e) => {
    setProducts({
      ...products,
      [e.target.name]: e.target.value
    });
  };

  const { nombre, cantidad, precio, descripcion } = products;

  const submitProducto = (e) => {
    const t = localStorage.getItem("jwt-token");
    e.preventDefault();

    if (
      nombre.trim() === "" ||
      precio.trim() === "" ||
      cantidad.trim() === "" ||
      descripcion.trim() === ""
    ) {
      setError(true);
      return;
    }

    setError(false);

    // products.id = uuidv4();

    // Enviar el producto al backend
    axios
      .post("http://localhost:3000/api/v1/inventario", products, {
        headers: {
          Authorization: `Bearer ${t}`
        }
      })
      .then((response) => {
        console.log(response.data.data); // Maneja la respuesta del backend
        crearProductos(products);
        setProducts({
          nombre: "",
          precio: "",
          cantidad: "",
          descripcion: ""
        });
      })
      .catch((error) => {
        console.error(error); // Maneja los errores en caso de que ocurran
      });
  };

  return (
    <form onSubmit={submitProducto}>
      <div>
        <label>Nombre del Producto</label>
        <input
          type="text"
          name="nombre"
          placeholder="Coca-Cola"
          className="input input-name"
          value={nombre}
          onChange={actualizarEstado}
          required
        />

        <br />

        <label>Precio *</label>
        <input
          type="text"
          name="precio"
          placeholder="$ 0"
          value={precio}
          onChange={actualizarEstado}
          required
        />
        <br />

        <label htmlFor="cantidad">Cantidad</label>
        <input
          type="number"
          name="cantidad"
          placeholder="0"
          value={cantidad}
          onChange={actualizarEstado}
          required
        />
        <br />

        <label>Descripción</label>
        <input
          type="text"
          name="descripcion"
          value={descripcion}
          onChange={actualizarEstado}
        />

        <br />
      </div>

      <button type="submit" className="btn btn-outline-success">
        CREAR
      </button>
    </form>
  );
};

export default AddProducts;
