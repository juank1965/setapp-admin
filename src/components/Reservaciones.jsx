import React from "react";
import ServiceCard from "./ServiceCard";
import { servicios } from "../assets/datos";

function Reservaciones() {
  const reservas = servicios.filter(function (element) {
    return element.estado === "reservado";
  });

  return (
    <div>
      <h3>Sus Reservaciones</h3>
      {reservas.map((servicio) => {
        return (
          <div key={servicio.id}>
            <ServiceCard info={servicio} />{" "}
          </div>
        );
      })}
    </div>
  );
}

export default Reservaciones;
