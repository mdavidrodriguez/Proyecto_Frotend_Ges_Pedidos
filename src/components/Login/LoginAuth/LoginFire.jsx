import styles from './Login.module.css'
import { InputControl } from '../InputControl/InputControl.jsx'
import { Link, useNavigate } from 'react-router-dom'


export function LoginFire() {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <form className={styles.innerBox}>
            <h1 className={styles.heading}>Login</h1>
                <InputControl label="Email" 
                  value={username}
                  onChange={(e) => validateUsername(e.target.value)}
                  isinvalid={isUsernameValid ? "false" : "true"}
                  required
                placeholder="Ingrese su correo"/>
                <InputControl label="Contraseña"
                 onChange={(e) => validatePassword(e.target.value)}
                 isinvalid={isPasswordValid ? "false" : "true"}
                 required
                placeholder="Ingrese su Contraseña"/>
                
                <div className={styles.footer}>
                 <input type="submit" value="Ingresar" />
                    <p>Crear Cuenta
                        <span>
                            <Link to="/signup">Ir</Link>
                        </span>
                    </p>
                </div>
            </form>
        
        </div>
    )
}

