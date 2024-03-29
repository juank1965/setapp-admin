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

export default function Cotizar() {
  const [abrirCotizacion, setAbrirCotizacion] = React.useState(false);
  const handleAbrirCotizacion = () => setAbrirCotizacion(true);
  const handleCerrarCotizacion = () => setAbrirCotizacion(false);

  const [abrirCondiciones, setAbrirCondiciones] = React.useState(false);
  const handleAbrirCondiciones = () => setAbrirCondiciones(true);
  const handleCerrarCondiciones = () => setAbrirCondiciones(false);

  return (
    <Card sx={{ maxWidth: 250 }} className="cardstyle">
      <CardActionArea component={Link} to="/panel-control/cotizaciones">
        <CardMedia
          component="img"
          height="100"
          image={presupuesto}
          alt="Presupuesto"
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle2" component="div">
            SELECCIONA LA MEJOR OFERTA
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Busca el mejor precio, selecciona el vehiculo adecuado a tus
            necesidades y presupesto. HAZ TU RESERVA!
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={styles.cardfooter}>
        <IconButton aria-label="ley" onClick={handleAbrirCondiciones}>
          <PolicyIcon />
        </IconButton>
        <Link to="/panel-control/cotizaciones">
          <IconButton aria-label="price">
            <StyledBadge badgeContent={2} color="secondary">
              <MonetizationOnIcon />
            </StyledBadge>
          </IconButton>
        </Link>
      </CardActions>
      <Modal
        open={abrirCondiciones}
        onClose={handleCerrarCondiciones}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Terminos y Condiciones
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Las solicitudes de cotizaciones tienen una validez de 24 horas
            despues de las cuales deberás realizar una nueva solicitud si no has
            recibido alguna oferta o no has seleccionado alguna de la lista de
            ofertas. Para garantizar el servicio deberas cancelar el 50% del
            valor ofrecido por el vehículo seleccionado.
          </Typography>
        </Box>
      </Modal>
    </Card>
  );
}
