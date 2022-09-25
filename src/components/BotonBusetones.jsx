import * as React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { styled } from "@mui/material/styles";
import PolicyIcon from "@mui/icons-material/Policy";
import FormCotizar from "./FormCotizar";
import styles from "./Cotizar.module.css";
import buseton from "../assets/tipos/buseton.png";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 70,
  color: "black",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: 70,
  overflow: "auto",
};

export default function BotonBusetones() {
  return (
    <Card sx={{ maxWidth: 400 }} className="cardstyle">
      <CardActionArea>
        <CardMedia
          component="img"
          height="60"
          image={buseton}
          alt="Imagen de Buseton"
        />
        <Typography>Busetones</Typography>
      </CardActionArea>
    </Card>
  );
}
