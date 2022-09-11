import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
//import PersonIcon from "@mui/icons-material/Person";

function Login() {
  let navigate = useNavigate();
  const handlerGoogleAuth = (e) => {
    e.preventDefault();
    navigate("/panel-control/buscar-vehiculos");
  };

  return (
    <div className={styles.bordes}>
      <div>
        <h2>Ingresar</h2>
        <div>
          <span>
            <i className="fab fa-facebook-square"></i>
          </span>
          <span>
            <i className="fab fa-google-plus-square"></i>
          </span>
          <span>
            <i className="fab fa-twitter-square"></i>
          </span>
        </div>
      </div>
      <div>
        <form onSubmit={(e) => handlerGoogleAuth(e)}>
          <div>
            <div>
              <span>
                <i className="fas fa-user"></i>
              </span>
            </div>
            <input
              autoFocus
              type="email"
              className={styles.myInput}
              placeholder="email"
              required
            />
          </div>
          <div>
            <div>
              <span>
                <i className="fas fa-key"></i>
              </span>
            </div>
            <input
              type="password"
              className={styles.myInput}
              placeholder="contraseña"
              required
            />
          </div>
          <div>
            <input type="checkbox" />
            Recuerdame
          </div>
          <div>
            <input type="submit" value="Login" className={styles.myButton} />
          </div>
        </form>
      </div>
      <div>
        <div>
          No tiene cuenta?{" "}
          <Link to="/registro" className={styles.link}>
            Regístrate aquí !
          </Link>
        </div>
        <div>
          <Link to="/cambiar-password" className={styles.link}>
            Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
