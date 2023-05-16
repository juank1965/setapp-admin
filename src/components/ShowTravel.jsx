import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MapLeaflet from "./MapLeaflet";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";

export default function ShowTravel({
  info,
  geoInfo,
  cerrar,
  distAOrigen,
  distADestino,
}) {
  const [recorrido, setRecorrido] = React.useState(distAOrigen);
  React.useEffect(() => {
    if (
      info.recorridoIniciado === true &&
      info.tourIniciado === true &&
      regresoIniciado === false
    ) {
      setRecorrido(distADestino);
    }
  }, [distAOrigen, distADestino]);

  return (
    <Card sx={{ minWidth: 200, height: "100%" }}>
      <div id="mapa" className="displaymap">
        <MapLeaflet info={info} geoInfo={geoInfo} />
      </div>
      <CardContent>
        <div className="traveldiv">
          <Avatar
            sx={{ bgcolor: red[500], height: "25px", width: "25px" }}
            aria-label="viaje"
            alt={info.cliente}
            src={info.imagenCliente}
          />

          <span>Cliente:{info.cliente} </span>
          <span>Empresa:{info.empresa} </span>
        </div>
        <Typography
          variant="body2"
          padding="2px"
          borderRadius="10px"
          bgcolor="rgba(179, 168, 168, 0.495)"
          color="text.primary"
        >
          Posición: latitud:{geoInfo.coords.latitude.toFixed(4)} longitud:
          {geoInfo.coords.longitude.toFixed(4)} , Distancia por recorrer:
          {recorrido} kms, velocidad:
          {((geoInfo.coords.speed * 60 * 60) / 1000).toFixed(2)} k/h
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Cerrar Mapa">
          <IconButton color="error" aria-label="share" onClick={cerrar}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
