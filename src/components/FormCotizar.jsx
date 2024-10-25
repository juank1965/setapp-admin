import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./FormCotizar.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function FormCotizar() {
  const [dataUser, setDataUser] = useState(
    JSON.parse(localStorage.getItem("usuario"))
  );

  let navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      solicitante: dataUser.id,
      tipo: "",
      clase: "",
      ciudadOrigen: "",
      direccionOrigen: "",
      ciudadDestino: "",
      direccionDestino: "",
      fechaDalida: "",
      horaDalida: "",
      fechaRegreso: "",
      adultos: 1,
    },
  });
  const onSubmit = (data) => {    
    navigate("/panel-control/home");
  };

  return (
    <Card sx={{ minWidth: 275 }} className={styles.margen}>
      <CardContent className={styles.content}>
        <div className={styles.bookingform}>
          <div className={styles.header}>
            <h3 className={styles.titulo}>Qué vehículo necesitas?</h3>
            <Link to="/panel-control/home">
              <button className={styles.btnheader}>MENU</button>
            </Link>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <input
              {...register("solicitante")}
              className={styles.formcontrol}
              type="text"
              disabled
              hidden
            />

            <div className={styles.divdata}>
              <div className={styles.formgroup}>
                <span className={styles.formlabel}>Tipo de vehículo</span>
                <select
                  {...register("tipo", { required: true })}
                  className={styles.formcontroltipo}
                  autoFocus
                >
                  <option value="">Seleccione</option>
                  <option value="Bus">Bus</option>
                  <option value="Buseton">Busetón</option>
                  <option value="Van">Van</option>
                  <option value="Minivan">Mini Van</option>
                  <option value="4x4">4 x 4</option>
                  <option value="Automovil">Automóvil</option>
                </select>
                <span className={styles.selectarrow}></span>
                {errors.tipo && (
                  <p className={styles.errores}>Seleccione tipo de vehiculo</p>
                )}
              </div>
              <div className={styles.formgroup}>
                <span className={styles.formlabel}>Tipo de servicio</span>
                <select
                  {...register("clase", { required: true })}
                  className={styles.formcontroltipo}
                >
                  <option value="">Seleccione</option>
                  <option value="Pasadia">Pasadia</option>
                  <option value="Ida y Regreso">Ida y Regreso</option>
                  <option value="Multidestino">Varios destinos</option>
                  <option value="2 dias">2 dias</option>
                  <option value="Nacional">Nacional</option>
                  <option value="otro">Otro</option>
                </select>
                <span className={styles.selectarrow}></span>
                {errors.clase && (
                  <p className={styles.errores}>Seleccione tour</p>
                )}
              </div>
            </div>

            <div>
              <div className={styles.formgroup}>
                <span className={styles.formlabel}>Origen</span>
                <input
                  {...register("ciudadOrigen", { required: true })}
                  className={styles.formcontrol}
                  type="text"
                  placeholder="Ciudad de Origen"
                />
                {errors.ciudadOrigen && (
                  <p className={styles.errores}>De donde salimos?</p>
                )}
                <input
                  {...register("direccionOrigen", { required: true })}
                  className={styles.formcontrol}
                  type="text"
                  placeholder="Dirección o lugar de Origen"
                />
                {errors.direccionOrigen && (
                  <p className={styles.errores}>
                    Proporcione direccion de salida
                  </p>
                )}
              </div>

              <div className={styles.formgroup}>
                <span className={styles.formlabel}>Destino</span>
                <input
                  {...register("ciudadDestino", { required: true })}
                  className={styles.formcontrol}
                  type="text"
                  placeholder="Ciudad de Destino"
                />
                {errors.ciudadDestino && (
                  <p className={styles.errores}>A que ciudad vamos?</p>
                )}
                <input
                  {...register("direccionDestino", { required: true })}
                  className={styles.formcontrol}
                  type="text"
                  placeholder="Dirección o lugar de Destino"
                />
                {errors.direccionDestino && (
                  <p className={styles.errores}>
                    Proporcione direccion de llegada
                  </p>
                )}
              </div>
            </div>

            <div className={styles.divdata}>
              <div className={styles.formgroup}>
                <span className={styles.formlabel}>fecha salida:</span>
                <input
                  {...register("fechaSalida", { required: true })}
                  className={styles.formcontroldata}
                  type="date"
                />
                {errors.fechaSalida && (
                  <p className={styles.errores}>Fecha obligatoria</p>
                )}
              </div>

              <div className={styles.formgroup}>
                <span className={styles.formlabel}>Hora salida</span>
                <input
                  {...register("horaSalida", { required: true })}
                  className={styles.formcontroltime}
                  type="time"
                />
                {errors.horaSalida && (
                  <p className={styles.errores}>A que Hora?</p>
                )}
              </div>

              <div className={styles.formgroup}>
                <span className={styles.formlabel}>Regreso el día:</span>
                <input
                  {...register("fechaRegreso", { required: true })}
                  className={styles.formcontroldata}
                  type="date"
                />
                {errors.fechaRegreso && (
                  <p className={styles.errores}>Fecha obligatoria</p>
                )}
              </div>
            </div>

            <div className={styles.divdata}>
              <div className={styles.formgroup}>
                <span className={styles.formlabel}>Pasajeros (2+)</span>
                <input
                  {...register("pasajeros", { required: true })}
                  className={styles.formcontroldata}
                  type="number"
                  placeholder={1}
                  min="1"
                  pattern="^[0-9]+"
                  required
                />
                {errors.pasajeros && (
                  <p className={styles.errores}>Cuantos vamos?</p>
                )}
              </div>
            </div>
            <div className={styles.formbtn}>
              <button type="submit" className={styles.submitbtn}>
                Buscar
              </button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
