import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import {
  getForAdvance,
  advance,
  getForAdvanceGuias,
  advanceGuia,
} from "../assets/firebase/configuracion";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Anticipos() {
  const [open, setOpen] = React.useState(false);
  const [openGuia, setOpenGuia] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [valueGuia, setValueGuia] = React.useState("");
  const [info, setInfo] = React.useState();
  const [infoGuia, setInfoGuia] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleOpenGuia = () => setOpenGuia(true);
  const handleClose = () => setOpen(false);
  const handleCloseGuia = () => setOpenGuia(false);
  /*
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleChangeGuia = (event) => {
    setValueGuia(event.target.value);
  };
*/
  const [anticipos, setAnticipos] = React.useState([]);
  React.useEffect(() => {
    const listaAnticipos = getForAdvance(setAnticipos);
  }, [getForAdvance]);
  const [anticiposGuias, setAnticiposGuias] = React.useState([]);
  React.useEffect(() => {
    const listaAnticipos = getForAdvanceGuias(setAnticiposGuias);
  }, [getForAdvanceGuias]);
  let navigate = useNavigate();
  const handlerAnticipo = () => {
    if (info.id) {
      const valorAnticipoPagado = (info.valorOferta * 0.9 * 0.5).toFixed(0);
      advance(info.id, value, valorAnticipoPagado);
      toast("Pago de anticipo registrado exitosamente");
      handleClose();
    } else {
      toast.error("No se pudo hacer el registro del pago. Vuelva a intentar");
      handleClose();
    }
    navigate("/panel-control/pagos");
  };
  const handlerAnticipoGuias = () => {
    if (infoGuia.id) {
      const valorAnticipoPagado = (
        infoGuia.valorOfertaGuia *
        0.9 *
        0.5
      ).toFixed(0);
      advanceGuia(infoGuia.id, valueGuia, valorAnticipoPagado);
      toast("Pago de anticipo registrado exitosamente");
      handleCloseGuia();
    } else {
      toast.error("No se pudo hacer el registro del pago. Vuelva a intentar");
      handleCloseGuia();
    }
    navigate("/panel-control/pagos");
  };    
  return (
    <Box>
      <List
        sx={{
          width: "100%",
          minWidth: 360,
          bgcolor: "background.paper",
          mt: "50px",
          mb: "5px"
        }}
      >
        <Typography variant="h6" gutterBottom>
          Servicios de Vehículos Por Pago de Anticipo 50%
        </Typography>
        {anticipos.length > 0 ? (
          anticipos.map((anticipo) => (
            <>
              <>
                <ListItem
                  alignItems="flex-start"
                  key={anticipo.id}
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
                  <ListItemAvatar>
                    <Avatar
                      alt="Foto del Conductor"
                      src={anticipo.imagenConductor}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Servicio No. ${anticipo.id}`}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          <b>
                            Anticipo pagadero a: Conductor :{" "}
                            {anticipo.conductor}
                            vehiculo de placas:
                            {anticipo.placas}
                          </b>
                        </Typography>
                        <Typography>
                          <b>
                            Transferir el valor de:
                            {new Intl.NumberFormat("es-CO", {
                              style: "currency",
                              currency: "COP",
                            }).format(
                              (anticipo.valorOferta * 0.9 * 0.5).toFixed(0)
                            )}
                          </b>
                        </Typography>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          <b>
                            Anticipo a la cuenta: No. {anticipo.cuenta} | Banco:
                            {anticipo.banco} | {anticipo.tipocuenta} | Titular:{" "}
                            {anticipo.titular}
                          </b>
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </>
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
                  Registre el No. de Comprobante de Pago del Anticipo
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <b>
                    Conductor : {info.conductor} vehiculo de placas:{" "}
                    {info.placas}
                  </b>
                  <b>
                    Servicio No. {info.id} Transferir el valor de:
                    {new Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                    }).format((info.valorOferta * 0.9 * 0.5).toFixed(0))}
                  </b>
                </Typography>

                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  <b>
                    Anticipo a la cuenta: No. {info.cuenta} | Banco:
                    {info.banco} | {info.tipocuenta} | Titular: {info.titular}
                  </b>
                </Typography>

                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Escriba el numero del documento que certifica la transaccion
                  bancaria con la que hizo el pago del anticipo.
                </Typography>
                <TextField
                  id="standard-basic"
                  label="No. Transacion Bancaria"
                  variant="standard"
                  value={value}
                  onChange={(event) => {
                    setValue(event.target.value);
                  }}
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
      <List
        sx={{
          width: "100%",
          minWidth: 360,
          bgcolor: "background.paper",
          mt: "50px",
          mb: "5px"
        }}
      >
        <Typography variant="h6" gutterBottom>Servicios de Guias Por Pago deAnticipo 50%</Typography>
        {anticiposGuias.length > 0 ? (
          anticiposGuias.map((anticipo) => (
            <>
              <>
                <ListItem
                  alignItems="flex-start"
                  key={anticipo.id}
                  disableGutters
                  secondaryAction={
                    <IconButton
                      aria-label="comment"
                      onClick={() => {
                        setInfoGuia(anticipo);
                        handleOpenGuia();
                      }}
                    >
                      <CommentIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar alt="Foto del Guia" src={anticipo.imagenGuia} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Servicio No. ${anticipo.id}`}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          <b>
                            Anticipo pagadero a: Guía : {anticipo.nombreGuia}
                            RNT:
                            {anticipo.rntGuia}
                          </b>
                        </Typography>
                        <Typography>
                          <b>
                            Transferir el valor de:
                            {new Intl.NumberFormat("es-CO", {
                              style: "currency",
                              currency: "COP",
                            }).format(
                              (anticipo.valorOfertaGuia * 0.9 * 0.5).toFixed(0)
                            )}
                          </b>
                        </Typography>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          <b>
                            Anticipo a la cuenta: No. {anticipo.cuentaGuia} |
                            Banco:
                            {anticipo.bancoGuia} | {anticipo.tipocuentaGuia} |
                            Verificar Titular de la cuenta con certificado
                          </b>
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </>
            </>
          ))
        ) : (
          <h6 className="titulo">No hay anticipos Por Pagar</h6>
        )}
        <Modal
          open={openGuia}
          onClose={handleCloseGuia}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {infoGuia && (
              <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Registre el No. de Comprobante de Pago del Anticipo
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <b>
                    Guia : {infoGuia.nombreGuia} RNT: {infoGuia.rntGuia}
                  </b>
                  <b>
                    Servicio No. {infoGuia.id} Transferir el valor de:
                    {new Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                    }).format(
                      (infoGuia.valorOfertaGuia * 0.9 * 0.5).toFixed(0)
                    )}
                  </b>
                </Typography>

                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  <b>
                    Anticipo a la cuenta: No. {infoGuia.cuentaGuia} | Banco:
                    {infoGuia.bancoGuia} | {infoGuia.tipocuentaGuia} | Verificar
                    Titular de la cuenta con certificado
                  </b>
                </Typography>

                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Escriba el numero del documento que certifica la transaccion
                  bancaria con la que hizo el pago del anticipo.
                </Typography>
                <TextField
                  id="standard-basic-1"
                  label="No. Transacion Bancaria"
                  variant="standard"
                  value={valueGuia}
                  onChange={(event) => {
                    setValueGuia(event.target.value);
                  }}
                />
                <Button
                  variant="contained"
                  size="small"
                  onClick={handlerAnticipoGuias}
                >
                  Registrar Anticipo
                </Button>
              </>
            )}
          </Box>
        </Modal>
      </List>
    </Box>
  );
}
