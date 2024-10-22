import * as React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import { styled } from "@mui/material/styles";
import PolicyIcon from "@mui/icons-material/Policy";
import styles from "./Cotizar.module.css";
import reservar from "../assets/reservar.jpeg";
import Divider from "@mui/material/Divider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  color: "black",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function ReservasEpayco({ change }) {
  function handleChange() {
    let value = 1;
    change(value);
  }

  return (
    <Card sx={{ display: "flex", margin: 2 }}>
      <CardActionArea onClick={handleChange}>
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 1,
            m: 1,
          }}>
          <Typography gutterBottom variant="subtitle2" component="div">
            VALIDAR PAGOS EPAYCO
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}
