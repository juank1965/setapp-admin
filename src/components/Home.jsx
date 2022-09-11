import React from "react";
import Cotizar from "./Cotizar";
import Reservas from "./Reservas";
import Itinerario from "./Itinerario";
import Seguimiento from "./Seguimiento";
import FormCotizar from "./FormCotizar";

function Home() {
  return (
    <div className="bodypanel">
      <div className="cardcontainerstyle">
        <Cotizar />
        <Reservas />
        <Itinerario />
        <Seguimiento />
      </div>
    </div>
  );
}

export default Home;
