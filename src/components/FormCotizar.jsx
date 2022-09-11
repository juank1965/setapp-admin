import * as React from "react";
import { Link } from "react-router-dom";
import styles from "./FormCotizar.module.css";

export default function FormCotizar() {
  const handlerCotizacion = (e) => {
    e.preventDefault();
    // Maneja lo datos para enviarlos a la BD
    alert("Datos enviados");
    //history.push("/panel-control/home");
  };
  return (
    <div className={styles.bookingform}>
      <div className={styles.header}>
        <h3 className={styles.titulo}>SOLICITAR PRESUPUESTO</h3>
        <Link to="/panel-control/home">
          <button className={styles.btnheader}>MENU</button>
        </Link>
      </div>
      <form onSubmit={handlerCotizacion} className={styles.form}>
        <div className={styles.formgroup}>
          <div className={styles.formcheckbox}>
            <label htmlFor="viaje-redondo">
              <input type="radio" id="viaje-redondo" name="viaje-tipo" />
              <span></span>Ida y Vuelta
            </label>
            <label htmlFor="solo-ida">
              <input type="radio" id="solo-ida" name="viaje-tipo" />
              <span></span>Solo Ida
            </label>
            <label htmlFor="multi-ciudad">
              <input type="radio" id="multi-ciudad" name="viaje-tipo" />
              <span></span>Multi-Destino
            </label>
          </div>
        </div>

        <div>
          <div className={styles.formgroup}>
            <span className={styles.formlabel}>Dirección de salida</span>
            <input
              className={styles.formcontrol}
              type="text"
              placeholder="Dirección y Ciudad"
            />
          </div>

          <div className={styles.formgroup}>
            <span className={styles.formlabel}>Dirección de destino</span>
            <input
              className={styles.formcontrol}
              type="text"
              placeholder="Dirección y ciudad"
            />
          </div>
        </div>

        <div className={styles.divdata}>
          <div className={styles.formgroup}>
            <span className={styles.formlabel}>Salida el día:</span>
            <input className={styles.formcontroldata} type="date" required />
          </div>

          <div className={styles.formgroup}>
            <span className={styles.formlabel}>Hora salida</span>
            <input className={styles.formcontroltime} type="time" required />
          </div>

          <div className={styles.formgroup}>
            <span className={styles.formlabel}>Regreso el día:</span>
            <input className={styles.formcontroldata} type="date" required />
          </div>
        </div>

        <div className={styles.divdata}>
          <div className={styles.formgroup}>
            <span className={styles.formlabel}>Adultos (18+)</span>
            <input
              className={styles.formcontroldata}
              type="number"
              placeholder={0}
              required
            />
          </div>

          <div className={styles.formgroup}>
            <span className={styles.formlabel}>Menores (0-17)</span>
            <input
              className={styles.formcontroldata}
              type="number"
              placeholder={0}
              required
            />
          </div>
        </div>

        <div className={styles.formgroup}>
          <span className={styles.formlabel}>Tipo de vehículo</span>
          <select className={styles.formcontrol}>
            <option>Bus</option>
            <option>Busetón</option>
            <option>Van</option>
            <option>Mini Van</option>
            <option>4 x 4</option>
            <option>Automóvil</option>
          </select>
          <span className={styles.selectarrow}></span>
        </div>

        <div className={styles.formbtn}>
          <Link to="/panel-control/home">
            <button type="submit" className={styles.submitbtn}>
              Buscar Ofertas
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
