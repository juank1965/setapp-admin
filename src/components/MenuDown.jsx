import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
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
            label="Gestionar Usuarios"
            icon={<ManageAccountsIcon />}
            component={Link}
            to="/panel-control/usuarios"
          />
          <BottomNavigationAction
            label="Gestión de Reservas"
            icon={<NoCrashIcon />}
            component={Link}
            to="/panel-control/reservas"
          />
          <BottomNavigationAction
<<<<<<< HEAD
            label="Mapa de Monitoreo"
            icon={<MapIcon />}
            component={Link}
            to="/panel-control/monitor-map"
          />
          <BottomNavigationAction
            label="Gestionar Pagos"
=======
            label="Pago Proveedores"
>>>>>>> dbd5f5555036f987592748616dfb985b6f69daf3
            icon={
              <Badge badgeContent={0} color="secondary">
                <MonetizationOnIcon />
              </Badge>
            }
            component={Link}
            to="/panel-control/pagos"
          />
          <BottomNavigationAction
            label="Servicios en Curso"
            icon={<CheckIcon />}
            component={Link}
            to="/panel-control/servicios-en-curso"
          />          
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
