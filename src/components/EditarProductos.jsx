import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import { useState } from 'react';

const EditarProductos = ({ modalActualizar, cerrarModalActualizar, form, editar }) => {
  const [cambios, setCambios] = useState({
    nombre: "",
    precio: "",
    cantidad: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    setCambios({
      ...cambios,
      [e.target.name]: e.target.value
    });
  }

  return (
    <Modal isOpen={modalActualizar}>
      <ModalHeader>
        <div>
          <h3>Editar Registro</h3>
        </div>
      </ModalHeader>

      <ModalBody>
        <FormGroup>
          <label>Nombre del Producto</label>
          <input
            className="form-control"
            type="text"
            name="nombre"
            placeholder="Coca-Cola"
            value={cambios.nombre}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <label>Precio *</label>
          <input
            className="form-control"
            type="text"
            name="precio"
            placeholder="$ 0"
            value={cambios.precio}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <label>Cantidad</label>
          <input
            className="form-control"
            type="number"
            name="cantidad"
            placeholder="0"
            value={cambios.cantidad}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <label>Descripción</label>
          <input
            className='form-control'
            type="text"
            name="descripcion"
            value={cambios.descripcion}
            onChange={handleChange}
          />
        </FormGroup>
      </ModalBody>

      <ModalFooter>
        <Button color="primary" onClick={() => editar(cambios)}>
          Editar
        </Button>
        <Button color="danger" onClick={() => cerrarModalActualizar()}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditarProductos;
