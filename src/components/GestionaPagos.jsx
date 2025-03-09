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
import { Card, Divider } from "@mui/material";
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
          flexDirection: "column",
          margin: 1,
          flexWrap: "wrap",
          justifyContent: "center",
          backgroundColor: "#999999",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "space-around",
            margin: "1px",
            backgroundColor: "#1565c0",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography
              color={"white"}
              gutterBottom
              variant="h6"
              component="div"
            >
              Pago a Proveedores
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <PagoAnticipos change={handleValue} />
            <PagoSaldos change={handleValue} />
            <PagoRecompensas change={handleValue} />
          </Box>
        </Card>
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {value === 1 && <Anticipos />}
          {value === 2 && <Saldos />}
          {value === 3 && <Recompensas />}
        </Box>
      </Box>
    </div>
  );
}

export default GestionaPagos;
