import React from "react";
import ServiceCard from "./ServiceCard";
import { servicios } from "../assets/datos";

function Confirmaciones() {
  const confirmados = servicios.filter(function (element) {
    return element.estado === "confirmado";
  });

  return (
    <div className="bodypanel bodycontent">
      <h3>Sevicios confirmados</h3>
      <div className="cardcontainerstyle">
        {confirmados?.map((servicio) => {
          return (
            <div key={servicio.id}>
              <ServiceCard info={servicio} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Confirmaciones;
