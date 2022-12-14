import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import { getForAdvance, advance } from "../assets/firebase/configuracion";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";
import Divider from "@mui/material/Divider";

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

export default function Anticipos() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [info, setInfo] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [anticipos, setAnticipos] = React.useState([]);
  React.useEffect(() => {
    const listaAnticipos = getForAdvance(setAnticipos);
  }, [getForAdvance]);

  const handlerAnticipo = () => {
    if (info.id) {
      advance(info.id, value);
      toast("Pago de anticipo registrado exitosamente");
    } else {
      toast.error("No se pudo hacer el registro del pago. Vuelva a intentar");
    }
    handleClose();
  };
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        mt: "50px",
      }}
    >
      <h5 className="titulo">Servicios Por Pago de Anticipo</h5>
      {anticipos.length > 0 ? (
        anticipos.map((anticipo, i) => (
          <>
            <ListItem
              key={i}
              disableGutters
              secondaryAction={
                <IconButton
                  aria-label="comment"
                  onClick={() => {
                    setInfo(anticipo);
                    handleOpen();
                  }}
                >
                  <CommentIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={`Line item ${anticipo.id}`}
                secondary={
                  <div>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Ali Connors
                    </Typography>
                    {" ??? I'll be in your neighborhood doing errands this???"}
                    <Typography>Hola </Typography>
                  </div>
                }
              />
            </ListItem>
            <Divider />
          </>
        ))
      ) : (
        <h6 className="titulo">No hay anticipos Por Pagar</h6>
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
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Registrar el No. de Comprobante de Pago del Anticipo
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Escriba el numero del documento que certifica la transaccion
                bancaria con la que hizo el pago del anticipo.
              </Typography>
              <TextField
                id="standard-basic"
                label="No. Transacion Bancaria"
                variant="standard"
              />
              <Button
                variant="contained"
                size="small"
                onClick={handlerAnticipo}
              >
                Registrar Anticipo
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </List>
  );
}
