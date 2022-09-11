import React from "react";
import ServiceCard from "./ServiceCard";
import { servicios } from "../assets/datos";

function Confirmaciones() {
  const confirmados = servicios.filter(function (element) {
    return element.estado === "confirmado";
  });

  return (
    <div>
      <h3>Sevicios confirmados</h3>
      {confirmados.map((servicio) => {
        return (
          <div key={servicio.id}>
            <ServiceCard info={servicio} />{" "}
          </div>
        );
      })}
    </div>
  );
}

export default Confirmaciones;
