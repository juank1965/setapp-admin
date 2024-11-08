import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ListaUsuarios from "./ListaUsuarios";
import ListaUsuariosNuevos from "./ListaUsuariosNuevos";
import ListaConductores from "./ListaConductores";
import ListaConductoresPorValidar from "./ListaConductoresPorValidar";
import ListaConductoresNuevos from "./ListaConductoresNuevos";
import Divider from "@mui/material/Divider";
import ConductoresNuevos from "./ConductoresNuevos";
import ConductoresPorValidar from "./ConductoresPorValidar";
import Conductores from "./Conductores";
import GuiasNuevos from "./GuiasNuevos";
import GuiasPorValidar from "./GuiasPorValidar";
import Guias from "./Guias";
import OperadoresNuevos from "./OperadoresNuevos";
import Operadores from "./Operadores";
import ListaGuiasNuevos from "./ListaGuiasNuevos";
import ListaGuiasPorValidar from "./ListaGuiasPorValidar";
import ListaGuias from "./ListaGuias";

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

function Usuarios() {
  const [value, setValue] = React.useState(0);

  const handleValue = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="bodypanel bodycontent">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          margin: 1,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          <ListaConductoresNuevos change={handleValue} />
          <ListaConductoresPorValidar change={handleValue} />
          <ListaConductores change={handleValue} />
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          <ListaUsuariosNuevos change={handleValue} />
          <ListaUsuarios change={handleValue} />
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          <ListaGuiasNuevos change={handleValue} />
          <ListaGuiasPorValidar change={handleValue} />
          <ListaGuias change={handleValue} />
        </Box>
        
      </Box>
      <Divider />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {value === 1 && <ConductoresNuevos />}
          {value === 2 && <ConductoresPorValidar />}
          {value === 3 && <Conductores />}
          {value === 4 && <OperadoresNuevos />}
          {value === 5 && <Operadores />}
          {value === 6 && <GuiasNuevos />}
          {value === 7 && <GuiasPorValidar />}
          {value === 8 && <Guias />}
        </Box>
    </div>
  );
}

export default Usuarios;
