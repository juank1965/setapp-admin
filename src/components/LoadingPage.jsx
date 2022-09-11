import React, { useEffect, useState } from "react";
import Logo from "../assets/icon-512x512.png";
import Loader from "./Loader";
import Login from "./Login";

function LoadingPage() {
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setCargando(false);
    }, 5000);
  }, []);

  return (
    <>
      <img
        src={Logo}
        alt="Logotipo"
        height="128px"
        width="128px"
        className="logoCars"
      />

      {cargando ? (
        <div className="loader">
          <Loader type="cylon" color="#ffff" />
        </div>
      ) : (
        <div>
          <h2>CARS FINDER</h2>
          <h3>Panel de Administración</h3>
          <Login />
        </div>
      )}
    </>
  );
}

export default LoadingPage;
