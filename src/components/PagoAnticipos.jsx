import * as React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { styled } from "@mui/material/styles";
import PolicyIcon from "@mui/icons-material/Policy";
import FormCotizar from "./FormCotizar";
import styles from "./Cotizar.module.css";
import presupuesto from "../assets/solicitar-presupuesto.png";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  color: "black",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: "75%",
  overflow: "auto",
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function PagoAnticipos() {
  const [abrirCotizacion, setAbrirCotizacion] = React.useState(false);
  const handleAbrirCotizacion = () => setAbrirCotizacion(true);
  const handleCerrarCotizacion = () => setAbrirCotizacion(false);

  const [abrirCondiciones, setAbrirCondiciones] = React.useState(false);
  const handleAbrirCondiciones = () => setAbrirCondiciones(true);
  const handleCerrarCondiciones = () => setAbrirCondiciones(false);

  return (
    <Card sx={{ maxWidth: 250 }} className="cardstyle">
      <CardActionArea component={Link} to="/panel-control/anticipos">
        <CardMedia
          component="img"
          height="100"
          image={presupuesto}
          alt="Presupuesto"
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle2" component="div">
            LISTADO PARA GESTIONAR PAGO DE ANTICIPOS A CONDUCTORES
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Aca podes listar los usuarios conductores que han subido el FUEC a
            su repectivo servicio reservado y pagado a los que se debe
            transferir el pago del anticipo de u viaje.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={styles.cardfooter}>
        <Link to="/panel-control/anticipos">
          <IconButton aria-label="price">
            <Badge badgeContent={0} color="secondary">
              <MonetizationOnIcon />
            </Badge>
          </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
}
