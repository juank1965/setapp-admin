import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { Chip, Typography } from "@mui/material";
import {
  getGuiasNuevos,  
} from "../assets/firebase/configuracion";
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

export default function GuiasNuevos() {
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [guiasNuevos, setGuiasNuevos] = React.useState([]);
  React.useEffect(() => {
    const listaGuiasNuevos = getGuiasNuevos(setGuiasNuevos);
  }, [getGuiasNuevos]); 
  
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
        Guias Registrados Nuevos: {guiasNuevos.length}
      </Typography>
      {guiasNuevos.length > 0 ? (
        guiasNuevos.map((guiaNuevo) => (
          <>
            <ListItem
              alignItems="flex-start"
              key={guiaNuevo.id}
              disableGutters
              secondaryAction={
                <IconButton
                  aria-label="comment"
                  onClick={() => {
                    setInfo(guiaNuevo);
                    handleOpen();
                  }}
                >
                  <CommentIcon />
                </IconButton>
              }
            >
              <div className="bodypaneluno">
                <ListItemAvatar>
                  <Avatar alt="Foto del Usuario" src={guiaNuevo.imagen} />
                </ListItemAvatar>
                <Rating
                  name="simple-controlled"
                  size="small"
                  value={guiaNuevo.rating}
                />
              </div>
              <ListItemText
                primary={`Guía ${guiaNuevo.nombre}`}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      RNT:
                      <Chip color="primary" size="small" label={guiaNuevo.rnt} />
                      RUT: <Chip color="primary" size="small" label={guiaNuevo.rut} />                      
                    </Typography>
                    <br />
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="inherit"
                      color="text.primary"
                    >
                      Direccion:
                      <Chip color="secondary" size="small" label={guiaNuevo.direccion} />
                      Email: <Chip color="secondary" size="small" label={guiaNuevo.email} />
                      Telefono: <Chip color="secondary" size="small" label={guiaNuevo.telefono} />
                    </Typography>
                    <br />
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="inherit"
                      color="text.primary"
                    >
                      Banco: <Chip color="success" size="small" label={guiaNuevo.banco} />
                      Tipo Cuenta:
                      <Chip color="success" size="small" label={guiaNuevo.tipocuenta} />
                      No. Cuenta: <Chip color="success" size="small" label={guiaNuevo.cuenta} />
                      Titular: <Chip color="success" size="small" label={guiaNuevo.titular} />
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider />
          </>
        ))
      ) : (
        <h6 className="titulo">No hay Guías Nuevos Registrados</h6>
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
                RNT {info.rnt} rut : {info.rut}
              </Typography>
            </>
          )}
          <Button
            onClick={() => {              
              navigate("/panel-control/usuarios");
            }}
          >
            Enviar email de Bienvenida para q suba docs
          </Button>
        </Box>
      </Modal>
    </List>
  );
}
