import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";
import ImgUser from "../assets/avatar.jpg";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import setapp from "../assets/set-app.png";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, salir } from "../assets/firebase/configuracion";
import Alert from "@mui/material/Alert";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(0),
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
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
  const [imagen, setImagen] = useState(ImgUser);
  const [dataUser, setDataUser] = useState(
    JSON.parse(localStorage.getItem("usuario"))
  );

  useEffect(() => {
    if (dataUser && dataUser.imagen !== null) {
      setImagen(dataUser.imagen);
    }
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  let navigate = useNavigate();
  const handleSalir = async () => {
    await salir();
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
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
          <img src={setapp} alt="logo" height="18px" width="80px" />

          <Avatar
            alt="Nombre del Usuario"
            referrerPolicy="no-referrer"
            src={`${imagen}`}
          />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            fontSize: "10px"
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
          <ListItemButton
            component={Link}
            to="/panel-control/perfil"
            onClick={handleDrawerClose}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Perfil de Usuario" />
          </ListItemButton>
          <ListItem>
            <Box>
              <ListItemText primary="Gestionar Usuarios" />
              <Box>
                <ListItemText primary="Operadores turísticos" />
                <ListItemButton
                  component={Link}
                  to="/panel-control/perfil"
                  onClick={handleDrawerClose}
                >
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Nuevos" />
                </ListItemButton>
                <ListItemButton
                  component={Link}
                  to="/panel-control/perfil"
                  onClick={handleDrawerClose}
                >
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Registrados" />
                </ListItemButton>
              </Box>
              <Box>
                <ListItemText primary="Conductores" />
                <ListItemButton
                  component={Link}
                  to="/panel-control/perfil"
                  onClick={handleDrawerClose}
                >
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Nuevos" />
                </ListItemButton>
                <ListItemButton
                  component={Link}
                  to="/panel-control/perfil"
                  onClick={handleDrawerClose}
                >
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sin Validar" />
                </ListItemButton>
                <ListItemButton
                  component={Link}
                  to="/panel-control/perfil"
                  onClick={handleDrawerClose}
                >
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Validados" />
                </ListItemButton>
              </Box>
            </Box>
          </ListItem>
          <ListItem>
            <Box>
              <ListItemText primary="Gestionar Pagos" />
              <Box>
                <ListItemText primary="Pago de Reservas" />
                <ListItemButton
                  component={Link}
                  to="/panel-control/perfil"
                  onClick={handleDrawerClose}
                >
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Por Epayco" />
                </ListItemButton>
                <ListItemButton
                  component={Link}
                  to="/panel-control/perfil"
                  onClick={handleDrawerClose}
                >
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Transferencia" />
                </ListItemButton>
              </Box>
              <Box>
                <ListItemText primary="Pago a Conductores" />
                <ListItemButton
                  component={Link}
                  to="/panel-control/perfil"
                  onClick={handleDrawerClose}
                >
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Anticipos" />
                </ListItemButton>
                <ListItemButton
                  component={Link}
                  to="/panel-control/perfil"
                  onClick={handleDrawerClose}
                >
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Saldo Final" />
                </ListItemButton>
                <ListItemButton
                  component={Link}
                  to="/panel-control/perfil"
                  onClick={handleDrawerClose}
                >
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Recompensas" />
                </ListItemButton>
              </Box>
            </Box>
          </ListItem>
          <ListItem>
            <Box>
              <ListItemText primary="Monitoreo de Servicios" />
              <Box>
                <ListItemText primary="Lista de Reservas" />
                <ListItemButton
                  component={Link}
                  to="/panel-control/perfil"
                  onClick={handleDrawerClose}
                >
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Lista de Salidas" />
                </ListItemButton>
                <ListItemButton
                  component={Link}
                  to="/panel-control/perfil"
                  onClick={handleDrawerClose}
                >
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Finalizados" />
                </ListItemButton>
                <ListItemButton
                  component={Link}
                  to="/panel-control/perfil"
                  onClick={handleDrawerClose}
                >
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Mapa en Tiempo Real" />
                </ListItemButton> 
              </Box>              
            </Box>
          </ListItem>
          <ListItemButton onClick={handleSalir}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Salir" />
          </ListItemButton>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
