import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, getUsuario } from "../assets/firebase/configuracion";
import toast from "react-hot-toast";

function Login() {
  let navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        if (userCredential.user.emailVerified === true) {
          // Signed in usuario existe
          const userData = getUsuario(userCredential.user.uid);
          userData.then((usuario) => {
            // Ingresa al panel que corresponde
            if (usuario.perfil) {
              toast.success("Bievenido !!");
              navigate("/panel-control/monitor-map");
            } else {
              toast.error("Completa tu perfil");
              navigate("/panel-control/perfil");
            }
          });
        } else {
          toast("Por favor verifica tu correo");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`${errorMessage}`);
      });
  };

  return (
    <div className={styles.bordes}>
      <div>
        <h2 className={styles.textcolor}>Ingresar</h2>
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
            <input type="submit" value="Login" className={styles.myButton} />
          </div>
        </form>
        <p className={styles.link}>-- ó --</p>
      </div>

      <div className={styles.footer}>
        <div className={styles.textcolor}>
          No tiene cuenta?{" "}
          <Link to="/registro" className={styles.link}>
            Regístrate aquí !
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

export default Login;
