
// // import React, { useState } from "react";
// // import axios from "axios";

// // const Prueba = () => {

// //     const [nroOrden, setNroOrden] = useState("");
// //     const [descripcion, setDescripcion] = useState("");
// //     const [clienteId, setClienteId] = useState("");
  
// //     const handleSubmit = async (event) => {
// //       event.preventDefault();
// //       const newPedido = {
// //         nroOrden,
// //         descripcion,
// //         clienteId,
// //       };
// //       try {
// //         const response = await axios.post("http://localhost:3000/api/v1/pedidos", newPedido, {
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //         });
// //         console.log(response.data);
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     };
  
// //     return (
// //       <form onSubmit={handleSubmit}>
// //         <label>
// //           Nro. de orden:
// //           <input
// //             type="text"
// //             value={nroOrden}
// //             onChange={(e) => setNroOrden(e.target.value)}
// //           />
// //         </label>
// //         <label>
// //           Descripción:
// //           <input
// //             type="text"
// //             value={descripcion}
// //             onChange={(e) => setDescripcion(e.target.value)}
// //           />
// //         </label>
// //         <label>
// //           ID del cliente:
// //           <input
// //             type="text"
// //             value={clienteId}
// //             onChange={(e) => setClienteId(e.target.value)}
// //           />
// //         </label>
// //         <button type="submit">Crear pedido</button>
// //       </form>
// //     );





// //     // Metodo get

// // // axios.get('http://localhost:3000/api/v1/productos')
// // //   .then(response => {
// // //     console.log(response);
// // //   })
// // //   .catch(error => {
// // //     console.log(error);
// // //   });
// // //   return (
// // //     <div>
        
// // //     </div>
// // //   )
// // }

// // export default Prueba


// // import { Link } from "react-router-dom";
// // import { useState } from "react";
// // import axios from "axios";

// // export function Signup() {
// //   const [nombre, setNombre] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [rol, setRol] = useState("");

// //   const handleFormSubmit = async (event) => {
// //     event.preventDefault();

// //     const data = {
// //       nombre: nombre,
// //       email: email,
// //       password: password,
// //       rol: rol,
// //     };
// //     console.log(data)
// //     try {
// //       const response = await axios.post("http://localhost:3000/api/v1/auth/signup", data);
// //       console.log(response.data);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   return (
// //     <div className="container">
// //       <form onSubmit={handleFormSubmit}>
// //         <h1 className="heading">Registro</h1>
// //         <div className="mb-3">
// //           <label htmlFor="nombre" className="form-label">
// //             Nombre
// //           </label>
// //           <input
// //             type="text"
// //             className="form-control"
// //             id="nombre"
// //             value={nombre}
// //             onChange={(e) => setNombre(e.target.value)}
// //             placeholder="Ingrese un nombre"
// //           />
// //         </div>
// //         <div className="mb-3">
// //           <label htmlFor="email" className="form-label">
// //             Email
// //           </label>
// //           <input
// //             type="email"
// //             className="form-control"
// //             id="email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             placeholder="Ingrese un correo"
// //           />
// //         </div>
// //         <div className="mb-3">
// //           <label htmlFor="password" className="form-label">
// //             Contraseña
// //           </label>
// //           <input
// //             type="password"
// //             className="form-control"
// //             id="password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             placeholder="Ingrese una contraseña"
// //           />
// //         </div>
// //         <div className="mb-3">
// //           <label htmlFor="rol" className="form-label">
// //             Rol
// //           </label>
// //           <input
// //             type="text"
// //             className="form-control"
// //             id="rol"
// //             value={rol}
// //             onChange={(e) => setRol(e.target.value)}
// //             placeholder="Ingrese un rol"
// //           />
// //         </div>
// //         <div className="mb-3">
// //           <button type="submit" className="btn btn-primary">
// //             Registrarse
// //           </button>
// //         </div>
// //         <p>
// //           Si ya tienes una Cuenta, Inicia Sesión
// //           <span>
// //             <Link to="/">Login</Link>
// //           </span>
// //         </p>
// //       </form>
// //     </div>
// //   );
// // }





// // import React, { useState } from "react";
// // import { Form, Button } from "react-bootstrap";

// // const SignUp = () => {
// //   const [username, setUsername] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [role, setRole] = useState("");

// //   const handleSignUp = async (e) => {
// //     e.preventDefault();
// //     const response = await fetch("/signup", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({ username, email, password, role }),
// //     });
// //     const { status, data } = await response.json();
// //     if (status === "OK") {
// //       console.log("Signup successful!", data);
// //     } else {
// //       console.error("Signup failed!", data);
// //     }
// //   };

// //   return (
// //     <Form onSubmit={handleSignUp}>
// //       <Form.Group controlId="formBasicUsername">
// //         <Form.Label>Username</Form.Label>
// //         <Form.Control
// //           type="text"
// //           placeholder="Enter username"
// //           value={username}
// //           onChange={(e) => setUsername(e.target.value)}
// //           required
// //         />
// //       </Form.Group>

// //       <Form.Group controlId="formBasicEmail">
// //         <Form.Label>Email</Form.Label>
// //         <Form.Control
// //           type="email"
// //           placeholder="Enter email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           required
// //         />
// //       </Form.Group>

// //       <Form.Group controlId="formBasicPassword">
// //         <Form.Label>Password</Form.Label>
// //         <Form.Control
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           required
// //         />
// //       </Form.Group>

// //       <Form.Group controlId="formBasicRole">
// //         <Form.Label>Role</Form.Label>
// //         <Form.Control
// //           as="select"
// //           value={role}
// //           onChange={(e) => setRole(e.target.value)}
// //           required
// //         >
// //           <option value="">Select Role</option>
// //           <option value="admin">Admin</option>
// //           <option value="user">User</option>
// //         </Form.Control>
// //       </Form.Group>

// //       <Button variant="primary" type="submit">
// //         Sign Up
// //       </Button>
// //     </Form>
// //   );
// // };

// // export default SignUp;



// import styles from "../components/Login/LoginAuth/Login.module.css";
// import { InputControl } from "../components/Login/InputControl/InputControl";
// import { Link, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const [isUsernameValid, setUsernameValid] = useState(false);
//   const [isPasswordValid, setPasswordValid] = useState(false);

//   const navigate = useNavigate();

//   const handlesignIn = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/v1/auth/signin",{
//         username: this.state.username,
//         password: this.state.password
//       }
//       );
//       const {
//         data: { token },
//       } = response;
//       localStorage.setItem("token", token);
//       console.log("Login Successful!", token);
//       navigate("/principal");
//     } catch (error) {
//       console.error("Login Failed", error.response.data);
//       // Display error message or handle login failure
//     }
//   };

//   const validateUsername = (value) => {
//     setUsernameValid(value.length > 0);
//     setUsername(value);
//   };

//   const validatePassword = (value) => {
//     setPasswordValid(value.length > 0);
//     setPassword(value);
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     } else {
//       navigate("/principal");
//     }
//   }, []);

//   return (
//     <div className={styles.container}>
//       <form action="" className={styles.innerBox} onSubmit={handlesignIn}>
//         <h1 className={styles.heading}>Login</h1>
//         <InputControl
//           label="Username"
//           value={username}
//           onChange={(e) => validateUsername(e.target.value)}
//           isinvalid={isUsernameValid ? "false" : "true"}
//           required
//         />
//         <InputControl
//           label="Contraseña"
//           value={password}
//           onChange={(e) => validatePassword(e.target.value)}
//           isinvalid={isPasswordValid ? "false" : "true"}
//           required
//           placeholder="Ingrese su Contraseña"
//         />
//         <div className={styles.footer}>
//           <input className="btn btn-primary" type="submit" />
//           <p>
//             ¿No tienes Cuenta?
//             <span>
//               <Link to="/registro">Registrate</Link>
//             </span>
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;
