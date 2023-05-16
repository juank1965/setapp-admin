import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import { getForTotalPay, totalPay } from "../assets/firebase/configuracion";
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
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Saldos() {
  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = React.useState();
  const [number, setNumber] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [saldos, setSaldos] = React.useState([]);
  React.useEffect(() => {
    const listaSaldos = getForTotalPay(setSaldos);
  }, [getForTotalPay]);

  let navigate = useNavigate();
  const handlerSaldos = () => {
    if (info.id) {
      const valorSaldoPagado = (info.valorOferta * 0.90 * 0.6).toFixed(2);
      totalPay(info.id, number, valorSaldoPagado);
      toast("Pago total del servicio registrado con exito");
    } else {
      toast.error("No se pudo hacer el registro del pago. Vuelva a intentar");
      handleClose();
    }
    navigate("/panel-control/pagos");
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
      <h5 className="titulo">
        Servicios Por Pago de Saldo Final a CONDUCTORES
      </h5>
      {saldos.length > 0 ? (
        saldos.map((saldo) => (
          <>
            <ListItem
              alignItems="flex-start"
              key={saldo.id}
              disableGutters
              secondaryAction={
                <IconButton
                  aria-label="comment"
                  onClick={() => {
                    setInfo(saldo);
                    handleOpen();
                  }}
                >
                  <CommentIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar alt="Foto del Conductor" src={saldo.imagenConductor} />
              </ListItemAvatar>
              <ListItemText
                primary={`Servicio No. ${saldo.id}`}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <b>
                        Saldo pagadero a: Conductor : {saldo.conductor}
                        vehiculo de placas:
                        {saldo.placas}
                      </b>
                    </Typography>
                    <Typography>
                      <b>
                        Transferir el valor de:
                        {new Intl.NumberFormat("es-CO", {
                          style: "currency",
                          currency: "COP",
                        }).format(saldo.valorOferta * 0.9 * 0.6)}
                      </b>
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider />
          </>
        ))
      ) : (
        <h6 className="titulo">No hay Saldos Por Pagar</h6>
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
                Registre No. documento de tranferencia para pago Total
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <b>
                  Conductor : {info.conductor} vehiculo de placas: {info.placas}
                </b>
                <b>
                  Servicio No. {info.id} Transferir el valor de
                  {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                  }).format(info.valorOferta * 0.9 * 0.6)}
                </b>
                Escriba el numero del documento que certifica la transaccion
                bancaria con la que hizo el pago del saldo.
              </Typography>
              <TextField
                id="standard-basic"
                label="No. Transaccion Bancaria"
                variant="standard"
                value={number}
                onChange={(event) => {
                  setNumber(event.target.value);
                }}
              />
              <Button variant="contained" size="small" onClick={handlerSaldos}>
                Registrar Pago Total
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </List>
  );
}
