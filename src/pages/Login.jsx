import styles from "../components/Login/LoginAuth/Login.module.css";
import { InputControl } from "../components/Login/InputControl/InputControl";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isUsernameValid, setUsernameValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const navigate = useNavigate();


  const handlesignIn = async (e) => {
    e.preventDefault();
    let credentials = { username, password };
    try {
      const response = await axios.post("https://backend-gestion-pedidos.onrender.com/api/v1/auth/signin",credentials)
      const token = response.data.data.token;
      localStorage.setItem("jwt-token", token);
      console.log(localStorage.getItem("jwt-token"));
      navigate("/principal");
    } catch (error) {
      toast.error("Falló: " + error.message);
     
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


  return (
    <div className={styles.container}>
      <form action="" className={styles.innerBox} onSubmit={handlesignIn}>
        <h1 className="text-black font-bold">Login</h1>
        <InputControl
          label="Username"
          placeholder="Ingrese su usuario"
          value={username}
          onChange={(e) => validateUsername(e.target.value)}
          isinvalid={isUsernameValid ? "false" : "true"}
          required
        />
        <InputControl
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => validatePassword(e.target.value)}
          isinvalid={isPasswordValid ? "false" : "true"}
          required
          placeholder="Ingrese su Contraseña"
        />
        <div className={styles.footer}>
          <input className="bg-cyan-600 p-2 rounded-full text-black font-bold cursor-pointer text-lg" type="submit" />
          <p>
            ¿No tienes Cuenta?
            <span>
              <Link to="/registro"> Registrate</Link>
            </span>
          </p>
        </div>
      </form>
      <div>
      <h1 className="absolute top-9  text-5xl text-white font-bold text-center">
</h1>
      </div>
    </div>
  );
};

export default Login;
