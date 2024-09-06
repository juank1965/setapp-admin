import React from "react";
import Cotizar from "./Cotizar";
import Reservas from "./ReservasTransferencia";
import Itinerario from "./Itinerario";
import Seguimiento from "./Seguimiento";
import FormCotizar from "./FormCotizar";
import BotonBuses from "./BotonBuses";
import BotonBusetones from "./BotonBusetones";
import BotonVanes from "./BotonVanes";
import BotonMiniVanes from "./BotonMiniVanes";
import BotonCamionetas from "./BotonCamionetas";
import BotonAutomoviles from "./BotonAutomoviles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ReservasEpayco from "./ReservasEpayco";
import ReservasTranferencia from "./ReservasTransferencia";
import ValidarEpayco from "./ValidarEpayco";
import ValidarTransferencia from "./ValidarTransferencia";
import { Divider } from "@mui/material";

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

function GestionaReservas() {
  const [value, setValue] = React.useState(0);

  const handleValue = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="bodypanel bodycontent">
      <Box sx={{ display: "flex", flexDirection: "row", margin: 1 }}>
        <ReservasEpayco change={handleValue} />
        <ReservasTranferencia change={handleValue} />
      </Box>
      <Divider component="li" />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {value === 1 && <ValidarEpayco />}
        {value === 2 && <ValidarTransferencia />}
      </Box>
    </div>
  );
}

export default GestionaReservas;
