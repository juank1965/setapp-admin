import React from "react";
import ServiceCard from "./ServiceCard";
import { servicios } from "../assets/datos";

function Seleccion() {
  const seleccionados = servicios.filter(function (element) {
    return element.estado === "seleccionado";
  });

  return (
    <div>
      <h3>Sevicios Con Vehiculo Seleccionado</h3>
      {seleccionados.map((servicio) => {
        return (
          <div key={servicio.id}>
            <ServiceCard info={servicio} />{" "}
          </div>
        );
      })}
    </div>
  );
}

export default Seleccion;
