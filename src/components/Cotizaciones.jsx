import React from "react";
import ServiceCard from "./ServiceCard";
import { servicios } from "../assets/datos";

const Cotizaciones = () => {
  const pendientes = servicios.filter(function (element) {
    return element.estado === "pendiente";
  });

  return (
    <div className="bodypanel bodycontent">
      <h3>Sus Cotizaciones Pendientes</h3>
      <div className="cardcontainerstyle">
        {pendientes ? (
          pendientes.map((servicio) => {
            return (
              <div key={servicio.id}>
                <ServiceCard info={servicio} />
              </div>
            );
          })
        ) : (
          <h3>No hay Cotizaciones Pendientes</h3>
        )}
      </div>
    </div>
  );
};

export default Cotizaciones;
