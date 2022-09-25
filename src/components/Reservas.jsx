import * as React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import { styled } from "@mui/material/styles";
import PolicyIcon from "@mui/icons-material/Policy";
import styles from "./Cotizar.module.css";
import reservar from "../assets/reservar.jpeg";

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
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function Reservas() {
  const [abrirCondiciones, setAbrirCondiciones] = React.useState(false);
  const handleAbrirCondiciones = () => setAbrirCondiciones(true);
  const handleCerrarCondiciones = () => setAbrirCondiciones(false);

  return (
    <Card sx={{ maxWidth: 250 }} className="cardstyle">
      <CardActionArea component={Link} to="/panel-control/reservaciones">
        <CardMedia
          component="img"
          height="100"
          image={reservar}
          alt="Reservaciones"
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle2" component="div">
            FINALIZA EL PROCESO DE RESERVA
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Haciendo click aqui podes completar las reservas de los vehiculos
            que hayas seleccionado al cotizar. Este proceso lo realizas maximo
            48 horas antes del viaje programado para gestionar la cancelación
            del 50% restante del servicio programado.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={styles.cardfooter}>
        <IconButton aria-label="ley" onClick={handleAbrirCondiciones}>
          <PolicyIcon />
        </IconButton>
        <Link to="/panel-control/reservaciones">
          <IconButton aria-label="crash">
            <StyledBadge badgeContent={2} color="secondary">
              <NoCrashIcon />
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
            Documento legal de terminos y condiciones de la reserva.
          </Typography>
        </Box>
      </Modal>
    </Card>
  );
}
