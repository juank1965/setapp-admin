import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import {
  getForValidate,
  getForValidateGuias,
  validateGuias,
  validate,
} from "../assets/firebase/configuracion";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ValidarTransferencia() {
  const [open, setOpen] = React.useState(false);
  const [openGuia, setOpenGuia] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [valueGuia, setValueGuia] = React.useState("");
  const [info, setInfo] = React.useState();
  const [infoGuia, setInfoGuia] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenGuia = () => setOpenGuia(true);
  const handleCloseGuia = () => setOpenGuia(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleChangeGuia = (event) => {
    setValueGuia(event.target.value);
  };

  const [validar, setValidar] = React.useState([]);
  const [validarGuia, setValidarGuia] = React.useState([]);

  React.useEffect(() => {
    const listaPorValidar = getForValidate(setValidar);
  }, [getForValidate]);
  React.useEffect(() => {
    const listaPorValidarGuias = getForValidateGuias(setValidarGuia);
  }, [getForValidateGuias]);
  let navigate = useNavigate();
  const handlerValidacion = async () => {
    if (info.id) {
      validate(info.id, value);
      toast("Pago Registrado exitosamente, Servicio en estado RESERVADO");
      handleClose();
    } else {
      toast.error("No se pudo hacer la validacion del pago. Vuelva a intentar");
      handleClose();
    }
    navigate("/panel-control/reservas");
  };

  const handlerValidacionGuia = async () => {
    if (infoGuia.id) {
      validateGuias(infoGuia.id, value);
      toast("Pago Registrado exitosamente, Servicio en estado RESERVADO");
      handleCloseGuia();
    } else {
      toast.error("No se pudo hacer la validacion del pago. Vuelva a intentar");
      handleCloseGuia();
    }
    navigate("/panel-control/reservas");
  };

  return (
    <Box>
<<<<<<< HEAD
    <List
      sx={{
        width: "90%",
        minWidth: 320,
        bgcolor: "background.paper",
        mt: "50px",
        padding: "10px"
      }}
    >
      <Typography variant="h6" gutterBottom>Validar Pagos de Reserva Vehículos vía transferencias</Typography>
      {validar.length > 0 ? (
        validar.map((valida) => (
          <>
            {valida.metodPago === "transferencia" && (
              <>
                <ListItem
                  alignItems="flex-start"
                  key={valida.id}
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
                            }).format(valida.pago)}
                          </b>
                        </Typography>
                        <Typography>
                          Clase de Servicio: {valida.clase}
                        </Typography>
                        <Typography>
                          Saliendo desde: {valida.origen}
                        </Typography>
                        <Typography>
                          Viajando Hacia : {valida.destino}
                        </Typography>
                        <Typography>Tipo de Vehiculo: {valida.tipo}</Typography>
                      </>
=======
      <List
        sx={{
          width: "100%",
          minWidth: 360,
          bgcolor: "background.paper",
          mt: "50px",
          padding: "0px",
          alignItems: "center"
        }}
      >
        <Typography variant="h6" gutterBottom>
          Validar Reserva vía transferencias Servicios de Transporte
        </Typography>
        {validar.length > 0 ? (
          validar.map((valida) => (
            <>
              {valida.metodPago === "transferencia" && (
                <>
                  <ListItem
                    alignItems="flex-start"
                    key={valida.id}
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
>>>>>>> dbd5f5555036f987592748616dfb985b6f69daf3
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
                              }).format(valida.pago)}
                            </b>
                          </Typography>
                          <Typography>
                            Clase de Servicio: {valida.clase}
                          </Typography>
                          <Typography>
                            Saliendo desde: {valida.origen}
                          </Typography>
                          <Typography>
                            Viajando Hacia : {valida.destino}
                          </Typography>
                          <Typography>
                            Tipo de Vehiculo: {valida.tipo}
                          </Typography>
                        </>
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
            {info && info.metodPago === "transferencia" && (
              <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Ingrese el numero de transferencia o consignación
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <b>
                    Para el servicio No. {info.id} se tranfiere :
                    {new Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                    }).format(info.pago)}
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
      <List
        sx={{
          width: "90%",
          minWidth: 320,
          bgcolor: "background.paper",
          mt: "50px",
          padding: "10px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Validar Reservas Servicio de Guias vía transferencias
        </Typography>
        {validarGuia.length > 0 ? (
          validarGuia.map((valida) => (
            <>
<<<<<<< HEAD
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Ingrese el numero de transferencia o consignación
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <b>
                  Para el servicio No. {info.id} se tranfiere :
                  {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                  }).format(info.pago)}
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
    <List
      sx={{
        width: "90%",
        minWidth: 320,
        bgcolor: "background.paper",
        mt: "50px",
        padding: "10px",        
      }}
    >
      <Typography variant="h6" gutterBottom>Validar Pagos de Reserva Servicio de Guias vía transferencias</Typography>
      {validarGuia.length > 0 ? (
        validarGuia.map((valida) => (
          <>
            {valida.metodoPagoGuia === "transferencia" && (
              <>
                <ListItem
                  alignItems="flex-start"
                  key={valida.id}
                  disableGutters
                  secondaryAction={
                    <IconButton
                      aria-label="comment"
                      onClick={() => {
                        setInfoGuia(valida);
                        handleOpenGuia();
                      }}
                    >
                      <CommentIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      alt="Foto del Guia"
                      src={valida.imagenCliente}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Servicio No. ${valida.id}`}
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
                            }).format(valida.pagoGuia)}
                          </b>
                        </Typography>
                        <Typography>
                          Clase de Servicio: {valida.clase}
                        </Typography>
                        <Typography>
                          Saliendo desde: {valida.origen}
                        </Typography>
                        <Typography>
                          Viajando Hacia : {valida.destino}
                        </Typography>
                        <Typography>Tipo de Vehiculo: {valida.tipo}</Typography>
                      </>
=======
              {valida.metodoPagoGuia === "transferencia" && (
                <>
                  <ListItem
                    alignItems="center"
                    key={valida.id}
                    disableGutters
                    secondaryAction={
                      <IconButton
                        aria-label="comment"
                        onClick={() => {
                          setInfoGuia(valida);
                          handleOpenGuia();
                        }}
                      >
                        <CommentIcon />
                      </IconButton>
>>>>>>> dbd5f5555036f987592748616dfb985b6f69daf3
                    }
                  >
                    <ListItemAvatar>
                      <Avatar alt="Foto del Guia" src={valida.imagenCliente} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`Servicio No. ${valida.id}`}
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
                              }).format(valida.pagoGuia)}
                            </b>
                          </Typography>
                          <Typography>
                            Clase de Servicio: {valida.clase}
                          </Typography>
                          <Typography>
                            Saliendo desde: {valida.origen}
                          </Typography>
                          <Typography>
                            Viajando Hacia : {valida.destino}
                          </Typography>
                          <Typography>
                            Tipo de Vehiculo: {valida.tipo}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  <Divider />
                </>
              )}
            </>
          ))
        ) : (
          <h6 className="titulo">No hay Pagos a guías para Validar</h6>
        )}
        <Modal
          open={openGuia}
          onClose={handleCloseGuia}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {infoGuia && infoGuia.metodoPagoGuia === "transferencia" && (
              <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Ingrese el numero de transferencia o consignación
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <b>
                    Para el servicio No. {infoGuia.id} se tranfiere :
                    {new Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                    }).format(infoGuia.pagoGuia)}
                  </b>
                  Escriba el numero del documento Equivalente que certifica la
                  transaccion con la que se registra la consignación o
                  transferencia.
                </Typography>
                <TextField
                  id="standard-basic"
                  label="Consignación o transferencia #"
                  variant="standard"
                  value={valueGuia}
                  onChange={handleChangeGuia}
                />
                <Button
                  variant="contained"
                  size="small"
                  onClick={handlerValidacionGuia}
                >
                  Validar Pago por TRANSFERENCIA
                </Button>
              </>
            )}
          </Box>
        </Modal>
      </List>
    </Box>
  );
}
