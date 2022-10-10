import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import CheckIcon from "@mui/icons-material/Check";
import Paper from "@mui/material/Paper";
import MapIcon from "@mui/icons-material/Map";
import styles from "./MenuDown.module.css";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -5,
    top: 6,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function MenuDown() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          className={styles.fondo}
        >
          <BottomNavigationAction
            label="Cotizar"
            icon={<SearchIcon />}
            component={Link}
            to="/panel-control/buscar-vehiculos"
          />
          <BottomNavigationAction
            label="Ofertas"
            icon={
              <StyledBadge badgeContent={4} color="secondary">
                <MonetizationOnIcon />
              </StyledBadge>
            }
            component={Link}
            to="/panel-control/cotizaciones"
          />
          <BottomNavigationAction
            label="Reservas"
            icon={<NoCrashIcon />}
            component={Link}
            to="/panel-control/reservaciones"
          />
          <BottomNavigationAction
            label="Salidas"
            icon={<CheckIcon />}
            component={Link}
            to="/panel-control/confirmaciones"
          />
          <BottomNavigationAction
            label="Mapa"
            icon={<MapIcon />}
            component={Link}
            to="/panel-control/mapa"
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
