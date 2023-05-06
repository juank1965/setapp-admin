import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import { getConductores } from "../assets/firebase/configuracion";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";

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

export default function Conductores() {
  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [conductores, setConductores] = React.useState([]);
  React.useEffect(() => {
    const listaConductores = getConductores(setConductores);
  }, [getConductores]);
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: "100%",
        bgcolor: "background.paper",
        mt: "50px",
        mb: "50px",
      }}
    >
      <h5 className="titulo">Conductores Registrados {conductores.length}</h5>
      {conductores.length > 0 ? (
        conductores.map((conductor) => (
          <>
            <ListItem
              alignItems="flex-start"
              key={conductor.id}
              disableGutters
              secondaryAction={
                <IconButton
                  aria-label="comment"
                  onClick={() => {
                    setInfo(conductor);
                    handleOpen();
                  }}
                >
                  <CommentIcon />
                </IconButton>
              }
            >
              <div className="bodypaneluno">
                <ListItemAvatar>
                  <Avatar alt="Foto del Usuario" src={conductor.imagen} />
                </ListItemAvatar>
                <Rating
                  name="simple-controlled"
                  size="small"
                  value={conductor.rating}
                />
              </div>
              <ListItemText
                primary={`Conductor ${conductor.nombre}`}
                secondary={
                  <div>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {conductor.tipo} Placas:{conductor.placas}
                    </Typography>
                    --{conductor.marca} modelo:{conductor.modelo} capacidad:
                    {conductor.capacidad}
                    <Typography>
                      Afiliado a: {conductor.empresa} No.
                      {conductor.numeroInterno}
                    </Typography>
                    <Typography>Direccion: {conductor.direccion}</Typography>
                    <Typography>Email: {conductor.email}</Typography>
                    <Typography>Telefono: {conductor.telefono}</Typography>
                  </div>
                }
              />
            </ListItem>
            <Divider />
          </>
        ))
      ) : (
        <h6 className="titulo">No hay Coductores Registrados</h6>
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
        </Box>
      </Modal>
    </List>
  );
}
