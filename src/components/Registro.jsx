import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/icon-512x512.png";
import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../assets/firebase/configuracion";

function Registro() {
  let navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Enviar correo de verificacion
        sendEmailVerification(auth.currentUser).then(() => {
          // Email verification sent!
          // ...
        });
        // Signed in
        const user = userCredential.user;        
        // Crea usuario en la base de datos
        const { uid, displayName, email, photoURL } = user;
        setDoc(
          doc(db, "admin", uid),
          {
            name: displayName,
            email: email,
            image: photoURL,
            rating: 5,
            perfil: false,
          },
          {
            merge: true,
          }
        );
        alert(
          "Usuario creado correctamente, revisa tu bandeja de entrada de tu correo y validalo para garantizar el acceso a los servicios de SETAPP"
        );
        // Regresa a login
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Error: ${errorMessage}`); // ..
      });
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
        <h2 className={styles.textcolor}>Registrate</h2>
        <h3 className={styles.textcolor}>Con email y contraseña</h3>
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
            <input
              name="password"
              type="password"
              className={styles.myInput}
              placeholder="contraseña"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className={styles.errores}>Contraseña requerida</p>
            )}
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
        <div className={styles.textcolor}>
          Ya tiene una cuenta?
          <Link to="/" className={styles.link}>
            Ingresa a la App
          </Link>
        </div>
        <div className={styles.textcolor}>
          <Link to="/cambiar-password" className={styles.link}>
            Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Registro;
