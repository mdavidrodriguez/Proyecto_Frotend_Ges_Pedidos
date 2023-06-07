import confirmacion from "../assets/FinalizarPedido.jpeg";
import { useNavigate } from "react-router-dom";

const ConfirmacionPedido = () => {
  const navigate= useNavigate();
  const handleClick = () => {
    navigate("/principal")
  };

  return (
    <div className="container-fondo    ">
      <img style={{backgroundPosition:"0%"}} src={confirmacion} alt="ConfirmacionPedido" />
      <button onClick={handleClick}
        className="btn btn-light absolute bottom-72  text-white"
        style={{
          padding: "20px",
          fontWeight: "700",
          fontSize: "40px",
          left: "50%",
          transform: "translateX(-50%) ",
          borderRadius: "20px",
          backgroundColor: "#FFD700",
          borderColor: "#FFD700",
          color: "#000",
          fontFamily: "consolas",
        }}
      >
        Volver al Inicio
      </button>
    </div>
  );
};

export default ConfirmacionPedido;
