import "./App.css";
import LoadingPage from "./components/LoadingPage";
import { Routes, Route, Outlet } from "react-router-dom";
import PanelDeControl from "./components/PanelDeControl";
import Registro from "./components/Registro";
import CambiarPassword from "./components/CambiarPassword";
import Login from "./components/Login";
import Home from "./components/Home";
import Cotizaciones from "./components/Cotizaciones";
import Seleccion from "./components/Seleccion";
import Reservaciones from "./components/Reservaciones";
import Confirmaciones from "./components/Confirmaciones";
import Mapa from "./components/Mapa";
import Historial from "./components/Historial";
import Perfil from "./components/Perfil";
import Salir from "./components/Salir";
import BuscarVehiculo from "./components/BuscarVehiculo";
import MapLeaflet from "./components/MapLeaflet";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/cambiar-password" element={<CambiarPassword />} />        
        <Route path="panel-control" element={<PanelDeControl />}>
          <Route path="buscar-vehiculos" element={<BuscarVehiculo />} />
          <Route path="home" element={<Home />} />
          <Route path="cotizaciones" element={<Cotizaciones />} />
          <Route path="seleccion" element={<Seleccion />} />
          <Route path="reservaciones" element={<Reservaciones />} />
          <Route path="confirmaciones" element={<Confirmaciones />} />
          <Route path="mapa" element={<Mapa />} />
          <Route path="historial" element={<Historial />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="salir" element={<Salir />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
