import "./App.css";
import LoadingPage from "./components/LoadingPage";
import { Routes, Route, Outlet } from "react-router-dom";
import PanelDeControl from "./components/PanelDeControl";
import Registro from "./components/Registro";
import CambiarPassword from "./components/CambiarPassword";
import Login from "./components/Login";
import Home from "./components/Usuarios";
import Cotizaciones from "./components/Cotizaciones";
import Seleccion from "./components/Seleccion";
import Reservaciones from "./components/Reservaciones";
import Confirmaciones from "./components/Confirmaciones";
import Mapa from "./components/Mapa";
import Historial from "./components/Historial";
import Perfil from "./components/Perfil";
import Salir from "./components/Salir";
import MapLeaflet from "./components/MapLeaflet";
import Usuarios from "./components/Usuarios";
import GestionaReservas from "./components/GestionaReservas";
import GestionaPagos from "./components/GestionaPagos";
import Operadores from "./components/Operadores";
import Conductores from "./components/Conductores";
import ValidarEpayco from "./components/ValidarEpayco";
import ValidarTransferencia from "./components/ValidarTransferencia";
import Anticipos from "./components/Anticipos";
import Saldos from "./components/Saldos";
import toast, { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/cambiar-password" element={<CambiarPassword />} />
        <Route path="panel-control" element={<PanelDeControl />}>
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="reservas" element={<GestionaReservas />} />
          <Route path="pagos" element={<GestionaPagos />} />
          <Route path="operadores" element={<Operadores />} />
          <Route path="conductores" element={<Conductores />} />
          <Route path="validarEpayco" element={<ValidarEpayco />} />
          <Route
            path="validarTransferencia"
            element={<ValidarTransferencia />}
          />
          <Route path="anticipos" element={<Anticipos />} />
          <Route path="saldos" element={<Saldos />} />
          <Route path="mapa" element={<Mapa />} />
          <Route path="historial" element={<Historial />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="salir" element={<Salir />} />
        </Route>
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#6c6e6d",
            color: "#fff",
          },
          // Default options for specific types
          success: {
            duration: 5000,
            style: {
              background: "#1ba31e",
              border: "1px solid #713200",
              padding: "16px",
              color: "#fff",
            },
          },
          error: {
            duration: 5000,
            style: {
              background: "#dd0329",
              border: "1px solid #713200",
              padding: "16px",
              color: "#fff",
            },
          },
        }}
      />
    </>
  );
}

export default App;
