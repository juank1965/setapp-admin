import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ListaDeReservas from "./ListaDeReservas";
import ListaServiciosConfirmados from "./ListaServiciosConfirmados";
import ListaServiciosFinalizados from "./ListaServiciosFinalizados";
import { Divider } from "@mui/material";
import ListaDePedidos from "./ListaDePedidos";
import ListaServiciosReservados from "./ListaServiciosReservados";
import ListaViajesConfirmados from "./ListaViajesConfirmados";
import ListaViajesFinalizados from "./ListaViajesFinalizados";
import ListaServiciosPedidos from "./ListaServiciosPedidos";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ServiciosEnCurso() {
  const [value, setValue] = React.useState(1);

  const handleValue = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="bodypanel bodycontent">
      <Box sx={{ display: 'flex', flexDirection: "row", margin: 1 }}>
        <ListaDePedidos change ={handleValue} />
        <ListaDeReservas change ={handleValue} />
        <ListaServiciosConfirmados change ={handleValue} />
        <ListaServiciosFinalizados change ={handleValue} />
      </Box>
      <Divider component="li" />
      <Box sx={{ display: 'flex', justifyContent: "center" }}>
      {value ===1 && (<ListaServiciosPedidos />)}      
      {value ===2 && (<ListaServiciosReservados />)}
      {value ===3 && (<ListaViajesConfirmados />)}
      {value ===4 && (<ListaViajesFinalizados />)}
      </Box>
    </div>
  );
}

export default ServiciosEnCurso;
