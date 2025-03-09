import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import { getForValidate, validate } from "../assets/firebase/configuracion";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

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

export default function Validar() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [info, setInfo] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [validar, setValidar] = React.useState([]);
  React.useEffect(() => {
    const listaPorValidar = getForValidate(setValidar);
  }, [getForValidate]);

  const handlerValidacion = async () => {
    if (info.id) {
      validate(info.id, value);
      toast("Pago Registrado exitosamente, Servicio en estado RESERVADO");
    } else {
      toast.error("No se pudo hacer la validacion del pago. Vuelva a intentar");
    }
    handleClose();
  };
  return (
    <>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          mt: "50px",
        }}
      >
        <Typography variant="h6" gutterBottom>Validar Pagos de Reservas vía EPAYCO</Typography>
        {validar.length > 0 ? (
          validar.map((valida, i) => (
            <>
              {valida.metodPago === "epayco" && (
                <>
                  <ListItem
                    alignItems="flex-start"
                    key={i}
                    disableGutters
                    secondaryAction={
                      <IconButton
                        aria-label="comment"
                        onClick={() => {
                          setInfo(valida);
                          handleOpen();
                        }}
                      >
                        <CommentIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt="Foto del Cliente"
                        src={valida.imagenCliente}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`Servicio No. ${valida.id}`}
                      secondary={
                        <div>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Valor a contrastar pagado a Epayco : $
                            {valida.pago.toFixed(2)}
                          </Typography>
                          <Typography>
                            Clase de Servicio: {valida.clase}
                          </Typography>
                          <Typography>
                            Saliendo desde: {info.origen}                            
                          </Typography>
                          <Typography>
                            Viajando Hacia : {valida.destino}                            
                          </Typography>
                          <Typography>
                            Tipo de Vehiculo: {valida.tipo}
                          </Typography>
                        </div>
                      }
                    />
                  </ListItem>
                  <Divider />
                </>
              )}
            </>
          ))
        ) : (
          <h6 className="titulo">No hay Pagos para Validar</h6>
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
                  Ingrese el numero epayco de transaccion
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <b>
                    Para el servicio No. {info.id} se pagaron : ${" "}
                    {info.pago.toFixed(2)}
                  </b>
                  Escriba el numero del documento Equivalente que certifica la
                  transaccion Epayco con la que se recibio el pago del servicio.
                </Typography>
                <TextField
                  id="standard-basic"
                  label="Factura o Documento Equivalente #"
                  variant="standard"
                  value={value}
                  onChange={handleChange}
                />
                <Button
                  variant="contained"
                  size="small"
                  onClick={handlerValidacion}
                >
                  Validar Pago Por EPAYCO
                </Button>
              </>
            )}
          </Box>
        </Modal>
      </List>
      <Divider />
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          mt: "50px",
        }}
      >
        <h5 className="titulo">Validar Pagos de Reserva vía transferencias</h5>
        {validar.length > 0 ? (
          validar.map((valida, i) => (
            <>
              {valida.metodPago === "transferencia" && (
                <>
                  <ListItem
                    alignItems="flex-start"
                    key={i}
                    disableGutters
                    secondaryAction={
                      <IconButton
                        aria-label="comment"
                        onClick={() => {
                          setInfo(valida);
                          handleOpen();
                        }}
                      >
                        <CommentIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt="Foto del Conductor"
                        src={valida.imagenCliente}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`Servicio No. ${valida.id}`}
                      secondary={
                        <div>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            <b>Valor TRANSFERIDO : ${valida.pago.toFixed(2)}</b>
                          </Typography>
                          <Typography>
                            Clase de Servicio: {valida.clase}
                          </Typography>
                          <Typography>
                            Saliendo desde: {info.ciudadOrigen},
                            {info.direccionOrigen}
                          </Typography>
                          <Typography>
                            Viajando Hacia : {valida.ciudadDestino},
                            {valida.direccionDestino}
                          </Typography>
                          <Typography>
                            Tipo de Vehiculo: {valida.tipo}
                          </Typography>
                        </div>
                      }
                    />
                  </ListItem>
                  <Divider />
                </>
              )}
            </>
          ))
        ) : (
          <h6 className="titulo">No hay Pagos para Validar</h6>
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
                  Ingrese el numero de transferencia o consignación
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <b>
                    Para el servicio No. {info.id} se tranfiere : $
                    {info.pago.toFixed(2)}
                  </b>
                  Escriba el numero del documento Equivalente que certifica la
                  transaccion con la que se registra la consignación o
                  transferencia.
                </Typography>
                <TextField
                  id="standard-basic"
                  label="Consignación o tranferencia #"
                  variant="standard"
                  value={value}
                  onChange={handleChange}
                />
                <Button
                  variant="contained"
                  size="small"
                  onClick={handlerValidacion}
                >
                  Validar Pago por TRANSFERENCIA
                </Button>
              </>
            )}
          </Box>
        </Modal>
      </List>
    </>
  );
}
