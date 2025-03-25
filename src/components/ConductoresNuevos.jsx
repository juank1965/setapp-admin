import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { Chip, Typography } from "@mui/material";
import { getConductoresNuevos } from "../assets/firebase/configuracion";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";

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

export default function ConductoresNuevos() {
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [conductoresNuevos, setConductoresNuevos] = React.useState([]);
  React.useEffect(() => {
    const listaConductoresNuevos = getConductoresNuevos(setConductoresNuevos);
  }, [getConductoresNuevos]);

  return (
    <List
      sx={{
        width: "90%",
        maxWidth: "90%",
        bgcolor: "background.paper",
        mt: "50px",
        mb: "50px",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Conductores Registrados Nuevos: {conductoresNuevos.length}
      </Typography>      
      {conductoresNuevos.length > 0 ? (
        conductoresNuevos.map((conductorNuevo) => (
          <>
            <ListItem
              alignItems="flex-start"
              key={conductorNuevo.id}
              disableGutters
              secondaryAction={
                <IconButton
                  aria-label="comment"
                  onClick={() => {
                    setInfo(conductorNuevo);
                    handleOpen();
                  }}
                >
                  <CommentIcon />
                </IconButton>
              }
            >
              <div className="bodypaneluno">
                <ListItemAvatar>
                  <Avatar alt="Foto del Usuario" src={conductorNuevo.imagen} />
                </ListItemAvatar>
                <Rating
                  name="simple-controlled"
                  size="small"
                  value={conductorNuevo.rating}
                />
              </div>
              <ListItemText
                primary={`Conductor ${conductorNuevo.nombre}`}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <Chip
                        color="primary"
                        size="small"
                        label={conductorNuevo.tipo}
                      />{" "}
                      Placas:
                      <Chip
                        color="primary"
                        size="small"
                        label={conductorNuevo.placas}
                      />
                      Marca:{" "}
                      <Chip
                        color="primary"
                        size="small"
                        label={conductorNuevo.marca}
                      />
                      Modelo:
                      <Chip
                        color="primary"
                        size="small"
                        label={conductorNuevo.modelo}
                      />{" "}
                      Pasajeros:
                      <Chip
                        color="primary"
                        size="small"
                        label={conductorNuevo.capacidad}
                      />
                      Afiliado a:
                      <Chip
                        color="primary"
                        size="small"
                        label={conductorNuevo.empresa}
                      />{" "}
                      Código Referidos:
                      <Chip
                        color="primary"
                        size="small"
<<<<<<< HEAD
                        label={conductorNuevo.codigo}
=======
                        label={conductorNuevo.numeroInterno}
>>>>>>> dbd5f5555036f987592748616dfb985b6f69daf3
                      />
                    </Typography>
                    <br />
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="inherit"
                      color="text.primary"
                    >
                      Direccion:
                      <Chip
                        color="secondary"
                        size="small"
                        label={conductorNuevo.direccion}
                      />
                      Email:{" "}
                      <Chip
                        color="secondary"
                        size="small"
                        label={conductorNuevo.email}
                      />
                      Telefono:{" "}
                      <Chip
                        color="secondary"
                        size="small"
                        label={conductorNuevo.telefono}
                      />
                    </Typography>
                    <br />
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="inherit"
                      color="text.primary"
                    >
                      Banco:{" "}
                      <Chip
                        color="success"
                        size="small"
                        label={conductorNuevo.banco}
                      />
                      Tipo Cuenta:
                      <Chip
                        color="success"
                        size="small"
                        label={conductorNuevo.tipocuenta}
                      />
                      No. Cuenta:{" "}
                      <Chip
                        color="success"
                        size="small"
                        label={conductorNuevo.cuenta}
                      />
                      Titular:{" "}
                      <Chip
                        color="success"
                        size="small"
                        label={conductorNuevo.titular}
                      />
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider />
          </>
        ))
      ) : (
        <h6 className="titulo">No hay Conductores Nuevos Registrados</h6>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {info && (
            <>
              <div className="bodypaneluno">
                <ListItemAvatar>
                  <Avatar alt="Foto del Usuario" src={info.imagen} />
                </ListItemAvatar>
                <Rating
                  name="simple-controlled"
                  size="small"
                  value={info.rating}
                />
              </div>
              <Typography
                id="modal-modal-title"
                variant="inherit"
                component="h4"
              >
                {info.nombre}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Vehiculo {info.placas} tipo : {info.tipo} capacidad :
                {info.capacidad} Pasajeros
              </Typography>
            </>
          )}
          <Button
            onClick={() => {
              navigate("/panel-control/usuarios");
            }}
          >
            Enviar email de Bienvenida para que suba fotos y docs
          </Button>
        </Box>
      </Modal>
    </List>
  );
}
