import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import {
  conductorARecompensar,
  getConductoresPorRecompensar,
  totalPayReward,
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

const VALOR = [import.meta.env.VITE_REFERIDOS_VALOR];

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

export default function Recompensas() {
  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = React.useState();
  const [number, setNumber] = React.useState("");
  const [referente, setReferente] = React.useState(null);
  const handleOpen = (referidoPor) => {
    // Aquí busca el al conductor que refirió y actualiza su data
    // Modificar el estado con la info del conductor que refirió
    conductorARecompensar(referidoPor, setReferente)
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [recompensas, setRecompensas] = React.useState([]);
  React.useEffect(() => {
    const listaRecompensas = getConductoresPorRecompensar(setRecompensas);
  }, [getConductoresPorRecompensar]);

  let navigate = useNavigate();
  const handlerRecompensas = async() => {
    if (info.id && info.referidoPor) {
      let datosReferente = referente[0];
      await totalPayReward(info.id, number, datosReferente);
      toast("Pago de recompensa registrada con exito");
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
      <h5 className="titulo">CONDUCTORES QUE HAN GENERADO RECOMPENSA</h5>
      {recompensas.length > 0 ? (
        recompensas.map((recompensa) => (
          <>
            <ListItem
              alignItems="flex-start"
              key={recompensa.id}
              disableGutters
              secondaryAction={
                <IconButton
                  aria-label="comment"
                  onClick={() => {
                    setInfo(recompensa);
                    handleOpen(recompensa.referidoPor);
                  }}
                >
                  <CommentIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar alt="Foto del Conductor" src={recompensa.imagen} />
              </ListItemAvatar>
              <ListItemText
                primary={`${recompensa.nombre} Referido por No. ${recompensa.referidoPor}`}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "flex" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <b>
                        placas: {recompensa.placas} tipo: {recompensa.tipo}{" "}
                        pasajeros: {recompensa.capacidad}
                      </b>
                    </Typography>
                    <Typography>
                      <b>
                        Viajes Realizados:
                        {recompensa.viajesRealizados}
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
        <h6 className="titulo">No hay Recompensas Por Pagar</h6>
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
                Registre No. documento de tranferencia para pago
              </Typography>
              {referente !== null && (
                <>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <b>
                      Conductor que invitó : {info.referidoPor} nombre{" "}
                      {referente[0].nombre}
                    </b>
                    <b>
                      Transferir el valor de
                      {new Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                      }).format(VALOR.toFixed(0))}
                    </b>
                  </Typography>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    <b>
                      Recompensa a la cuenta: No. {referente[0].cuenta}
                      Banco:
                      {referente[0].banco} | {referente[0].tipocuenta} | Titular: {referente[0].titular}
                    </b>
                  </Typography>
                  <Typography>
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
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handlerRecompensas}
                  >
                    Registrar Pago de recompensa
                  </Button>
                </>
              )}
            </>
          )}
        </Box>
      </Modal>
    </List>
  );
}
