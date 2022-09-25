import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/icon-512x512.png";
import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../assets/firebase/configuracion";

function Registro() {
  let navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        alert(
          "Hemos enviado instrucciones a tu correo para que puedas cambiar tu contraseña"
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
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
        <h2 className={styles.textcolor}>Olvidaste tu contraseña</h2>
        <p className={styles.textcolor}>
          Registra tu email y te enviaremos instrucciones para que la cambies
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              autoFocus
              type="email"
              className={styles.myInput}
              placeholder="email"
              {...register("email", {
                required: true,
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            {errors.email && (
              <p className={styles.errores}>Un email válido es requerido</p>
            )}
          </div>
          <div>
            <input type="submit" value="Enviar" className={styles.myButton} />
          </div>
        </form>
      </div>
      <div>
        <div className={styles.textcolor}>
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
