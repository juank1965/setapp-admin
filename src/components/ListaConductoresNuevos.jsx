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
import BallotIcon from '@mui/icons-material/Ballot';

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

export default function ListaConductoresNuevos() {
  const [abrirCotizacion, setAbrirCotizacion] = React.useState(false);
  const handleAbrirCotizacion = () => setAbrirCotizacion(true);
  const handleCerrarCotizacion = () => setAbrirCotizacion(false);

  const [abrirCondiciones, setAbrirCondiciones] = React.useState(false);
  const handleAbrirCondiciones = () => setAbrirCondiciones(true);
  const handleCerrarCondiciones = () => setAbrirCondiciones(false);

  return (
    <Card sx={{ maxWidth: 250 }} className="cardstyle">
      <CardActionArea component={Link} to="/panel-control/conductores-nuevos">
        <CardMedia
          component="img"
          height="100"
          image={presupuesto}
          alt="Presupuesto"
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle2" component="div">
            CONDUCTORES NUEVOS
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Aca podes listar los usuarios conductores registrados nuevos que aún no han subido documentos
            y fotos del vehículo.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={styles.cardfooter}>
        <Link to="/panel-control/conductores-nuevos">
          <IconButton aria-label="price">
            <Badge badgeContent={0} color="secondary">
              <BallotIcon />
            </Badge>
          </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
}
