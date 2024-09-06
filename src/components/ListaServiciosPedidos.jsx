import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import { getForPedidosPendientes } from "../assets/firebase/configuracion";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";

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

export default function ListaServiciosPedidos() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [info, setInfo] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [pedidos, setPedidos] = React.useState([]);
  React.useEffect(() => {
    const listaPedidos = getForPedidosPendientes(setPedidos);
  }, [getForPedidosPendientes]);

  const handlerValidacion = (e) => {};

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        mt: "50px",
      }}
    >
      <h5 className="titulo">Lista de pedidos</h5>
      {pedidos.length > 0 ? (
        pedidos.map((pedido) => (
          <>
            <ListItem
              alignItems="flex-start"
              key={pedido.id}
              disableGutters
              secondaryAction={
                <IconButton
                  aria-label="comment"
                  onClick={() => {
                    setInfo(pedido);
                    handleOpen();
                  }}
                >
                  <CommentIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar alt="Foto del Conductor" src={pedido.imagenCliente} />
              </ListItemAvatar>
              <ListItemText
                primary={`Servicio No. ${pedido.id}`}
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
                        }).format(pedido.pago)}
                      </b>
                    </Typography>
                    <Typography>Clase de Servicio: {pedido.clase}</Typography>
                    <Typography>
                      Saliendo desde: {pedido.origen}                      
                    </Typography>
                    <Typography>
                      Viajando Hacia : {pedido.destino}                      
                    </Typography>
                    <Typography>Tipo de Vehiculo: {pedido.tipo}</Typography>
                  </>
                }
              />
            </ListItem>
            <Divider />
          </>
        ))
      ) : (
        <h6 className="titulo">No hay pedidos Activos</h6>
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
                MAPA DE TRAYECTORIA DEL SERVICIO CONTRATADO
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <b>
                  El servicio No. {info.id} se encuentra :                 
                </b>
                Componente de Mapa de trayectoria.
              </Typography>              
              <Button
                variant="contained"
                size="small"
                onClick={handleClose}
              >
                Cerrar Mapa
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </List>
  );
}
