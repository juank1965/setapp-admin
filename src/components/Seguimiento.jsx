import * as React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import styles from "./Cotizar.module.css";
import mapa from "../assets/mapa.jpeg";

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

export default function Seguimiento() {
  const [abrirCondiciones, setAbrirCondiciones] = React.useState(false);
  const handleAbrirCondiciones = () => setAbrirCondiciones(true);
  const handleCerrarCondiciones = () => setAbrirCondiciones(false);

  return (
    <Card sx={{ maxWidth: 250 }} className="cardstyle">
      <CardActionArea component={Link} to="/panel-control/mapa">
        <CardMedia component="img" height="100" image={mapa} alt="Mapa" />
        <CardContent>
          <Typography gutterBottom variant="subtitle2" component="div">
            MAPA EN TIEMPO REAL
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Haciendo click aqui podes ver en un mapa el recorrido de los
            servicios en ejecucion
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={styles.cardfooter}>
        <Button size="small" color="primary" onClick={handleAbrirCondiciones}>
          Info
        </Button>
      </CardActions>
      <Modal
        open={abrirCondiciones}
        onClose={handleCerrarCondiciones}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Muestra Datos del viaje distancia tiempo etc
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Info estadistica del viaje.
          </Typography>
        </Box>
      </Modal>
    </Card>
  );
}
