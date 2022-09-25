import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./FormCotizar.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useForm } from "react-hook-form";

export default function FormCotizar() {
  let navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      tipo: "",
      clase: "",
      ciudadorigen: "",
      direccionorigen: "",
      ciudaddestino: "",
      direcciondestino: "",
      fechasalida: "",
      horasalida: "",
      fecharegreso: "",
      adultos: 1,
      menores: 0,
      bebes: 0,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    navigate("/panel-control/home");
  };

  const handlerCotizacion = (e) => {
    e.preventDefault();
    // Maneja lo datos para enviarlos a la BD
    alert("Datos enviados");
    //history.push("/panel-control/home");
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
            <div className={styles.divdata}>
              <div className={styles.formgroup}>
                <span className={styles.formlabel}>Tipo de vehículo</span>
                <select
                  {...register("tipo")}
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
              </div>

              <div className={styles.formgroup}>
                <span className={styles.formlabel}>Tipo de servicio</span>
                <select
                  {...register("clase")}
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
              </div>
            </div>
            <div>
              <div className={styles.formgroup}>
                <span className={styles.formlabel}>Origen</span>
                <input
                  {...register("ciudadorigen", { required: true })}
                  className={styles.formcontrol}
                  type="text"
                  placeholder="Ciudad de Origen"
                />
                <input
                  {...register("direccionorigen", { required: true })}
                  className={styles.formcontrol}
                  type="text"
                  placeholder="Dirección o lugar de Origen"
                />
              </div>

              <div className={styles.formgroup}>
                <span className={styles.formlabel}>Destino</span>
                <input
                  {...register("ciudaddestino", { required: true })}
                  className={styles.formcontrol}
                  type="text"
                  placeholder="Ciudad de Destino"
                />
                <input
                  {...register("direcciondestino", { required: true })}
                  className={styles.formcontrol}
                  type="text"
                  placeholder="Dirección o lugar de Destino"
                />
              </div>
            </div>

            <div className={styles.divdata}>
              <div className={styles.formgroup}>
                <span className={styles.formlabel}>fecha salida:</span>
                <input
                  {...register("fechasalida", { required: true })}
                  className={styles.formcontroldata}
                  type="date"
                />
              </div>

              <div className={styles.formgroup}>
                <span className={styles.formlabel}>Hora salida</span>
                <input
                  {...register("horasalida", { required: true })}
                  className={styles.formcontroltime}
                  type="time"
                />
              </div>

              <div className={styles.formgroup}>
                <span className={styles.formlabel}>Regreso el día:</span>
                <input
                  {...register("fecharegreso", { required: true })}
                  className={styles.formcontroldata}
                  type="date"
                />
              </div>
            </div>

            <div className={styles.divdata}>
              <div className={styles.formgroup}>
                <span className={styles.formlabel}>Adultos (13+)</span>
                <input
                  {...register("adultos", { required: true })}
                  className={styles.formcontroldata}
                  type="number"
                  placeholder={1}
                  min="1"
                  pattern="^[0-9]+"
                  required
                />
              </div>

              <div className={styles.formgroup}>
                <span className={styles.formlabel}>Menores (3-13)</span>
                <input
                  {...register("menores", { required: true })}
                  className={styles.formcontroldata}
                  type="number"
                  placeholder={0}
                  min="0"
                  pattern="^[0-9]+"
                  required
                />
              </div>

              <div className={styles.formgroup}>
                <span className={styles.formlabel}>Bebés (-3)</span>
                <input
                  {...register("bebes", { required: true })}
                  className={styles.formcontroldata}
                  type="number"
                  placeholder={0}
                  min="0"
                  pattern="^[0-9]+"
                  required
                />
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
