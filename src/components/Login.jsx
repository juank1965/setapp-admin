import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {
  auth,  
  googleProvider,
  facebookProvider,
  db,
} from "../assets/firebase/configuracion";

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
          const refDoc = doc(db, "admin", userCredential.user.uid);
          const userData = getDoc(refDoc);
          userData.then((usuario) => {
            // Ingresa al panel que corresponde
            if (usuario.data().perfil) {
              navigate("/panel-control/buscar-vehiculos");
              alert("Bienvenido !");
            } else {
              navigate("/panel-control/perfil");
              alert("Debes completar tu perfil");
            }
          });
        } else {
          alert("Por favor verifica tu correo");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`${errorMessage}`);
      });
  };

  const handlerGoogleAuth = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const usuario = result.user;
        console.log(usuario.metadata);
        const { uid, displayName, email, photoURL } = usuario;
        // Crea al usuario en la BD
        if (usuario.metadata.creationTime === usuario.metadata.lastSignInTime) {
          setDoc(doc(db, "admin", uid), {
            name: displayName,
            email: email,
            image: photoURL,
            rating: 5,
            perfil: false,
          });
        }else {
          // Signed in usuario existe
          const refDoc = doc(db, "admin", uid);
          const userData = getDoc(refDoc);
          userData.then((usuario) => {
            // Ingresa al panel que corresponde
            if (usuario.data().perfil) {
              navigate("/panel-control/buscar-vehiculos");
              alert("Bienvenido !");
            } else {
              navigate("/panel-control/perfil");
              alert("Debes completar tu perfil");
            }
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`${errorMessage}`);
      });
  };

  const handlerFacebookAuth = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const usuario = result.user;
        const { uid, displayName, email, photoURL } = usuario;
        // Crea al usuario en  la BD
        if (usuario.metadata.creationTime === usuario.metadata.lastSignInTime) {
          setDoc(doc(db, "admin", uid), {
            name: displayName,
            email: email,
            image: photoURL,
            rating: 5,
            perfil: false,
          });
        }else {
          // Signed in usuario existe
          const refDoc = doc(db, "admin", uid);
          const userData = getDoc(refDoc);
          userData.then((usuario) => {
            // Ingresa al panel que corresponde
            if (usuario.data().perfil) {
              navigate("/panel-control/buscar-vehiculos");
              alert("Bienvenido !");
            } else {
              navigate("/panel-control/perfil");
              alert("Debes completar tu perfil");
            }
          });
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

      <Stack direction="column" spacing={2}>
        <Button
          onClick={handlerGoogleAuth}
          variant="contained"
          color="inherit"
          startIcon={<GoogleIcon />}
        >
          Ingresa con Google
        </Button>
        <Button
          onClick={handlerFacebookAuth}
          variant="contained"
          startIcon={<FacebookIcon />}
        >
          Ingresa con Facebook
        </Button>
      </Stack>
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
