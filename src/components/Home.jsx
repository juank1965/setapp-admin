import React from "react";
import Cotizar from "./Cotizar";
import Reservas from "./Reservas";
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

function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="bodypanel bodycontent">
      <div className="cardcontainerstyle">
        <Cotizar />
        <Reservas />
        <Itinerario />
        <Seguimiento />
      </div>
    </div>
  );
}

export default Home;
