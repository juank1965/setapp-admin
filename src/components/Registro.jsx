import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/icon-512x512.png";
import styles from "./Login.module.css";

function Registro() {
  let navigate = useNavigate();
  const handlerGoogleAuth = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className={styles.bordes}>
      <div>
        <img
          src={Logo}
          alt="Logotipo"
          height="128px"
          width="128px"
          className="logoCars"
        />
        <h2>Registrate</h2>
        <h3>Con email y contraseña</h3>
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
            <input
              type="submit"
              value="Registrar"
              className={styles.myButton}
            />
          </div>
        </form>
      </div>
      <div>
        <div>
          Ya tiene una cuenta?
          <Link to="/" className={styles.link}>
            Ingresa a la App
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

export default Registro;
