import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { Chip, Typography } from "@mui/material";
import {
  getUsuariosNuevos,
  validarUsuario,
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

export default function OperadoresNuevos() {
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [operadores, setOperadores] = React.useState([]);
  React.useEffect(() => {
    const listaOperadores = getUsuariosNuevos(setOperadores);
  }, [getUsuariosNuevos]);

  const handlerBienvenida = (id) => {
    validarUsuario(id);
    navigate("/panel-control/usuarios");
  };

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
      <Typography variant="h6" gutterBottom>
        Operadores Turisticos Registrados {operadores.length}
      </Typography>
      {operadores.length > 0 ? (
        operadores.map((operador) => (
          <>
            <ListItem
              alignItems="flex-start"
              key={operador.id}
              disableGutters
              secondaryAction={
                <>
                  <IconButton
                    aria-label="comment"
                    onClick={() => {
                      setInfo(operador);
                      handleOpen();
                    }}
                  >
                    <CommentIcon />
                  </IconButton>
                </>
              }
            >
              <div className="bodypaneluno">
                <ListItemAvatar>
                  <Avatar alt="Foto del Usuario" src={operador.imagen} />
                </ListItemAvatar>
                <Rating
                  name="simple-controlled"
                  size="small"
                  value={operador.rating}
                />
              </div>
              <ListItemText
                primary={`${operador.nombre} `}
                secondary={
                  <div>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Empresa:
                      <Chip
                        color="primary"
                        size="small"
                        label={operador.empresa}
                      />
                      Direccion:
                      <Chip
                        color="primary"
                        size="small"
                        label={operador.direccion}
                      />
                      email :{" "}
                      <Chip
                        color="primary"
                        size="small"
                        label={operador.email}
                      />{" "}
                      telefono :{" "}
                      <Chip
                        color="primary"
                        size="small"
                        label={operador.telefono}
                      />{" "}
                    </Typography>
                  </div>
                }
              />
            </ListItem>
            <Divider />
          </>
        ))
      ) : (
        <h6 className="titulo">No hay Operadores Turisticos Registrados</h6>
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
                Operador : {info.nombre}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Empresa:{info.empresa}
              </Typography>
              <div className="bodypaneluno">
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Direccion:{info.direccion}
                </Typography>
                <Typography>email : {info.email} </Typography>
                <Typography>telefono : {info.telefono} </Typography>
              </div>
              <Button
                onClick={() => {
                  validarUsuario(info.id);
                  navigate("/panel-control/usuarios");
                }}
              >
                Antes de validar, enviar Email de Bienvenida
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </List>
  );
}
