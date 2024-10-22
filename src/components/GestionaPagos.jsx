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
import PagoAnticipos from "./PagoAnticipos";
import PagoSaldos from "./PagoSaldos";
import PagoRecompensas from "./PagoRecompensas";
import { Divider } from "@mui/material";
import Anticipos from "./Anticipos";
import Saldos from "./Saldos";
import Recompensas from "./Recompensas";

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

function GestionaPagos() {
  const [value, setValue] = React.useState(1);

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
        <PagoAnticipos change={handleValue} />
        <PagoSaldos change={handleValue} />
        <PagoRecompensas change={handleValue} />
      </Box>
      <Divider component="li" />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {value === 1 && <Anticipos />}
        {value === 2 && <Saldos />}
        {value === 3 && <Recompensas />}
      </Box>
    </div>
  );
}

export default GestionaPagos;
