import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import { useState } from 'react';

const EditarClientes = ({ modalActualizar, cerrarModalActualizar, form, editar }) => {
  const [cambios, setCambios] = useState({
        idCliente: "",
        nombre: "",
        direccion: "",
        telefono: "",
        email: "",
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
            <label>Cedula</label>
            <input
              className="form-control"
              type="text"
                name="nombre"
                value={form.idCliente}
                onChange={handleChange}
            />
          </FormGroup>
  
          <FormGroup>
            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
            />
          </FormGroup>
           
          <FormGroup>

          <label>Dirección</label>
            <input
            className="form-control"
                type="text"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
              />
            
          </FormGroup>

          <FormGroup>
          <label>Telefono</label>
              <input
              className='form-control'
                type="number"
                name="descripcion"
                value={form.telefono}
                onChange={handleChange}
                />
          </FormGroup>

          <FormGroup>
            <label>
                Email
            </label>
            <input
            type='email'
            className='form-control'
            name='email'
            value={form.email}
            onChange={handleChange}
            />
          </FormGroup>

        </ModalBody>
  
        <ModalFooter>
          <Button color="primary" onClick={() => editar(form)}>
            Editar
          </Button>
          <Button color="danger" onClick={() => cerrarModalActualizar()}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
  );
};

export default EditarClientes;
