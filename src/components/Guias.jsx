import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import { getGuias } from "../assets/firebase/configuracion";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";

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

export default function Guias() {
  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [guias, setGuias] = React.useState([]);
  React.useEffect(() => {
    const listaGuias = getGuias(setGuias);
  }, [getGuias]);
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
      <h5 className="titulo">Guias Registrados {guias.length}</h5>
      {guias.length > 0 ? (
        guias.map((guia) => (
          <>
            <ListItem
              alignItems="flex-start"
              key={guia.id}
              disableGutters
              secondaryAction={
                <IconButton
                  aria-label="comment"
                  onClick={() => {
                    setInfo(guia);
                    handleOpen();
                  }}
                >
                  <CommentIcon />
                </IconButton>
              }
            >
              <div className="bodypaneluno">
                <ListItemAvatar>
                  <Avatar alt="Foto del Usuario" src={guia.imagen} />
                </ListItemAvatar>
                <Rating
                  name="simple-controlled"
                  size="small"
                  value={guia.rating}
                />
              </div>
              <ListItemText
                primary={`Guia ${guia.nombre}`}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >                     
                     RNT:
                      <Chip
                        color="primary"
                        size="small"
                        label={guia.rnt}
                      />
                      RUT:
                      <Chip
                        color="primary"
                        size="small"
                        label={guia.rut}
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
                        label={guia.direccion}
                      />
                      Email:
                      <Chip
                        color="secondary"
                        size="small"
                        label={guia.email}
                      />
                      Telefono:
                      <Chip
                        color="secondary"
                        size="small"
                        label={guia.telefono}
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
                        label={guia.banco}
                      />
                      Tipo Cuenta:
                      <Chip
                        color="success"
                        size="small"
                        label={guia.tipocuenta}
                      />
                      No. Cuenta:
                      <Chip
                        color="success"
                        size="small"
                        label={guia.cuenta}
                      />
                      Titular:
                      <Chip
                        color="success"
                        size="small"
                        label={guia.titular}
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
        <h6 className="titulo">No hay Guias Registrados</h6>
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
                RNT {info.rnt} RUT : {info.rut}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </List>
  );
}
