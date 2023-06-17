import styles from "./Signup.module.css";
import { Link } from "react-router-dom";
import { InputControl } from "../InputControl/InputControl";
import { useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";

export function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isUsernameValid, setUsernameValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isemailValid, setEmailValid] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!isUsernameValid || !isPasswordValid || !isemailValid) {
      console.log("Some fields are invalid.");
      return;
    }
    try {
      const response = await axios.post(
        "https://backend-gestion-pedidos.onrender.com/api/v1/auth/signup",
        {
          username,
          email,
          password,
        }
      );
      setShowToast(true);
      setToastVariant("success");
      setToastMessage("Registro Exitoso");
      setEmail("");
      setPassword("");
      setUsername("");
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      setShowToast(true);
      setToastVariant("danger");
      setToastMessage("Registro Fallido");
      console.error("Signup failed!", error.response.data);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  };

  const validateUsername = (value) => {
    setUsernameValid(value.length > 0);
    setUsername(value);
  };

  const validatePassword = (value) => {
    setPasswordValid(value.length > 0);
    setPassword(value);
  };
  const validateEmail = (value) => {
    setEmailValid(value.length > 0);
    setEmail(value);
  };

  const handleCloseToast = () => setShowToast(false);

  return (
    <div className={styles.container}>
      <Alert
        variant={toastVariant}
        show={showToast}
        onClose={handleCloseToast}
        dismissible
        style={{ position: "absolute", top: "0px" }}
      >
        <Alert.Heading>{toastMessage}</Alert.Heading>
      </Alert>
      <form onSubmit={handleSignUp} className={styles.innerBox}>
        <h1 className="text-black font-bold text-3xl">Registro</h1>
        <InputControl
          label="Nombre"
          placeholder="Ingrese un nombre"
          value={username}
          onChange={(e) => validateUsername(e.target.value)}
          isinvalid={isUsernameValid ? "false" : "true"}
          required
        />
        <InputControl
          label="Email"
          placeholder="Ingrese un correo"
          value={email}
          onChange={(e) => validateEmail(e.target.value)}
          isinvalid={isemailValid ? "false" : "true"}
          required
        />
        <InputControl
          label="Contraseña"
          placeholder="Ingrese una contraseña"
          type="password"
          value={password}
          onChange={(e) => validatePassword(e.target.value)}
          isinvalid={isPasswordValid ? "false" : "true"}
          required
        />

        <div className={styles.footer}>
          <button type="submit" className="btn btn-primary">
            Registrarse
          </button>
          <p>
            Si ya tienes una Cuenta, Inicia Sesión
            <span>
              <Link to="/"> Login</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
