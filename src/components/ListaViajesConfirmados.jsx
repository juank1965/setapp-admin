import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MapIcon from "@mui/icons-material/Map";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import { getForConfirmados } from "../assets/firebase/configuracion";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ListaViajesConfirmados() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [info, setInfo] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handlerValidacion = (e) => {};

  const [viajesConfirmados, setViajesConfirmados] = React.useState([]);
  React.useEffect(() => {
    const listaConfirmados = getForConfirmados(setViajesConfirmados);
  }, [getForConfirmados]);  
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        mt: "50px",
      }}
    >
      <Typography variant="h6" gutterBottom>Servicios Confirmados</Typography>
      {viajesConfirmados.length > 0 ? (
        viajesConfirmados.map((viaje) => (
          <>
            <ListItem
              alignItems="flex-start"
              key={viaje.id}
              disableGutters
              secondaryAction={
                <IconButton
                  aria-label="comment"
                  onClick={() => {
                    setInfo(viaje);
                    handleOpen();
                  }}
                >
                  <MapIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar alt="Foto del Conductor" src={viaje.imagenCliente} />
              </ListItemAvatar>
              <ListItemText
                primary={`Servicio No. ${viaje.id}`}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <b>
                        Valor TRANSFERIDO :
                        {new Intl.NumberFormat("es-CO", {
                          style: "currency",
                          currency: "COP",
                        }).format(viaje.pago)}
                      </b>
                    </Typography>
                    <Typography>Clase de Servicio: {viaje.clase}</Typography>
                    <Typography>
                      Saliendo desde: {viaje.origen}
                    </Typography>
                    <Typography>
                      Viajando Hacia : {viaje.destino}
                    </Typography>
                    <Typography>Tipo de Vehiculo: {viaje.tipo}</Typography>
                  </>
                }
              />
            </ListItem>
            <Divider />
          </>
        ))
      ) : (
        <h6 className="titulo">No hay Viajes Confirmados Registrados</h6>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {info && info.metodPago === "transferencia" && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                MAPA DE TRAYECTORIA DEL SERVICIO CONTRATADO
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <b>
                  El servicio No. {info.id} se encuentra :                 
                </b>
                Componente de Mapa de trayectoria.
              </Typography>              
              <Button
                variant="contained"
                size="small"
                onClick={handleClose}
              >
                Cerrar Mapa
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </List>
  );
}
