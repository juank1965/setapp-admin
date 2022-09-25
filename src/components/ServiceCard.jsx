import * as React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "./ServiceCard.module.css";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Badge from "@mui/material/Badge";
import OffertCard from "./OffertCard";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  //transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ServiceCard({ info }) {
  const [expandirPendientes, setExpandirPendientes] = React.useState(false);
  const [procesarReserva, setProcesarReserva] = React.useState(false);
  const [confirmarSalida, setConfirmarSalida] = React.useState(false);

  const handleExpandirPendientes = () => {
    setExpandirPendientes(!expandirPendientes);
  };
  const handleProcesarReserva = () => {
    setProcesarReserva(!procesarReserva);
  };
  const handleConfirmarSalida = () => {
    setConfirmarSalida(!confirmarSalida);
  };

  return (
    <Card sx={{ minWidth: 275 }} className={styles.margen}>
      <CardContent className={styles.content}>
        <Typography sx={{ fontSize: 16 }} gutterBottom>
          Tipo : <span className={styles.resaltar}>{info.tipo}</span>
        </Typography>
        <Typography variant="h6" component="div">
          Salida: <span className={styles.resaltar}>{info.salida}</span>
          regreso: <span className={styles.resaltar}>{info.regreso}</span>
        </Typography>
        <Typography sx={{ mb: 1.5 }}>
          Desde: <span className={styles.resaltar}>{info.origen}</span> hacia:
          <span className={styles.resaltar}>{info.destino}</span>
        </Typography>
        <Typography variant="body2">
          Pasajeros: <span className={styles.resaltar}>{info.adultos}</span>
          adultos, <span className={styles.resaltar}>{info.menores}</span> niños
        </Typography>
        <Typography variant="body2">
          Tipo de vehículo:
          <span className={styles.resaltar}>{info.vehiculo}</span>
        </Typography>
      </CardContent>
      <CardActions className={styles.pie}>
        {info.estado === "pendiente" && (
          <>
            <Badge badgeContent={4} color="primary">
              <ExpandMore
                expand={expandirPendientes}
                onClick={handleExpandirPendientes}
                aria-expanded={expandirPendientes}
                aria-label="ver mas..."
              >
                {expandirPendientes === false ? (
                  <Typography size="small" color="primary">
                    Ver Ofertas
                  </Typography>
                ) : (
                  <Typography size="small" color="error">
                    Cerrar Ofertas
                  </Typography>
                )}
              </ExpandMore>
            </Badge>
          </>
        )}
        {info.estado === "reservado" && (
          <>
            <Link to="/panel-control/home">
              <Button size="small">Completar Reserva</Button>
            </Link>
          </>
        )}
        {info.estado === "confirmado" && (
          <>
            <Link to="/panel-control/home">
              <Button size="small">Agendar Salida</Button>
            </Link>
          </>
        )}
        <Link to="/panel-control/home">
          <Button size="small">Home</Button>
        </Link>
      </CardActions>
      <Collapse in={expandirPendientes} timeout="auto" unmountOnExit>
        <CardContent>
          <OffertCard />
          <OffertCard />
        </CardContent>
      </Collapse>
    </Card>
  );
}
