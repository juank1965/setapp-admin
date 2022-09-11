import React from "react";
import ServiceCard from "./ServiceCard";
import { servicios } from "../assets/datos";

const Cotizaciones = () => {
  const pendientes = servicios.filter(function (element) {
    return element.estado === "pendiente";
  });

  return (
    <div>
      <h3>Sus Cotizaciones Pendientes</h3>
      {pendientes.map((servicio) => {
        return (
          <div key={servicio.id}>
            <ServiceCard info={servicio} />{" "}
          </div>
        );
      })}
    </div>
  );
};

export default Cotizaciones;
