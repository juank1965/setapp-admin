import * as React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "./ServiceCard.module.css";

export default function ServiceCard({ info }) {
  return (
    <Card sx={{ minWidth: 275 }} className={styles.margen}>
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
          Tipo : <span className={styles.resaltar}>{info.tipo}</span>
        </Typography>
        <Typography variant="h6" component="div">
          Salida: <span className={styles.resaltar}>{info.salida}</span>{" "}
          regreso: <span className={styles.resaltar}>{info.regreso}</span>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Desde: <span className={styles.resaltar}>{info.origen}</span> hacia:{" "}
          <span className={styles.resaltar}>{info.destino}</span>
        </Typography>
        <Typography variant="body2">
          Pasajeros: <span className={styles.resaltar}>{info.adultos}</span>{" "}
          adultos, <span className={styles.resaltar}>{info.menores}</span> niños
        </Typography>
        <Typography variant="body2">
          Tipo de vehículo:{" "}
          <span className={styles.resaltar}>{info.vehiculo}</span>
        </Typography>
      </CardContent>
      <CardActions className={styles.pie}>
        {info.estado === "pendiente" && (
          <Button size="small">Seleccionar Oferta</Button>
        )}
        {info.estado === "seleccionado" && (
          <Button size="small">Reservar Vehiculo</Button>
        )}
        {info.estado === "reservado" && (
          <Button size="small">Confirmar Salida</Button>
        )}
        {info.estado === "confirmado" && (
          <Button size="small">Iniciar Servicio</Button>
        )}
        <Link to="/panel-control/home">
          <Button size="small">Home</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
