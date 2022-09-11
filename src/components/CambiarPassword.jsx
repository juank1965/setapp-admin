import React from "react";
import { Link, useNavigate } from "react-router-dom";
import carsFinderLogo from "../assets/CarsFinder.png";
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
          src={carsFinderLogo}
          alt="Logotipo"
          height="128px"
          width="128px"
          className="logoCars"
        />
        <h2>Olvidaste tu contraseña</h2>
        <p>
          Registra tu email y te enviaremos instrucciones para que lo actualices{" "}
        </p>
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
            <input type="submit" value="Enviar" className={styles.myButton} />
          </div>
        </form>
      </div>
      <div>
        <div>
          Si la recordaste :
          <Link to="/" className={styles.link}>
            Ingresa a la App
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Registro;
