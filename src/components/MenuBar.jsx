import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
//import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
//import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import ImgUser from "../assets/icon-512x512.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import CheckIcon from "@mui/icons-material/Check";
import MapIcon from "@mui/icons-material/Map";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import styles from "./MenuBar.module.css";

const enlaces = [
  { link: "panel-control/buscar-vehiculos", text: "Pedir Cotizaciones" },
  { link: "panel-control/cotizaciones", text: "Seleccionar Oferta" },
  { link: "panel-control/reservaciones", text: "Reservas Confirmadas" },
  { link: "panel-control/confirmaciones", text: "Recorridos Confirmados" },
  { link: "panel-control/mapa", text: "Mapa Tiempo Real" },
  { link: "panel-control/home", text: "Panel De Operaciones" },
];
const enlaces2 = [
  { link: "panel-control/historial", text: "Historico Servicios" },
  { link: "panel-control/perfil", text: "Perfil" },
  { link: "panel-control/salir", text: "Salir" },
];

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function MenuBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open} className={styles.header}>
        <Toolbar className="toolbarstyle">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Panel de Control
          </Typography>
          <Avatar alt="Nombre del Usuario" src={ImgUser} />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {enlaces.map((enlace, index) => {
            return (
              <ListItem
                button
                component={Link}
                to={`/${enlace.link}`}
                key={index}
              >
                <ListItemIcon>
                  {index === 0 ? (
                    <SearchIcon />
                  ) : index === 1 ? (
                    <MonetizationOnIcon />
                  ) : index === 2 ? (
                    <NoCrashIcon />
                  ) : index === 3 ? (
                    <CheckIcon />
                  ) : index === 4 ? (
                    <MapIcon />
                  ) : (
                    <DashboardIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={enlace.text} />
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <List>
          {enlaces2.map((enlace, index) => {
            return (
              <ListItem
                button
                component={Link}
                to={`/${enlace.link}`}
                key={index}
              >
                <ListItemIcon>
                  {index === 0 ? (
                    <ManageHistoryIcon />
                  ) : index === 1 ? (
                    <AccountCircleIcon />
                  ) : (
                    <LogoutIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={enlace.text} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
