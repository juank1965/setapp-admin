import React, { useEffect, useState } from "react";
import Logo from "../assets/icon-512x512.png";
import Loader from "./Loader";
import Login from "./Login";

function LoadingPage() {
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setCargando(false);
    }, 3000);
  }, []);

  return (
    <>
      <img
        src={Logo}
        alt="Logotipo"
        height="100px"
        width="100px"
        className="logoCars"
      />
      {cargando === true ? (
        <div className="loader">
          <Loader type="spinningBubbles" color="#ea042c" />
        </div>
      ) : (
        <div>
          <h2>Bienvenido a SET APP</h2>
          <h3>ADMINISTRACION DEL SISTEMA</h3>
          <Login />
        </div>
      )}
    </>
  );
}

export default LoadingPage;
