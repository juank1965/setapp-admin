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
import presupuesto from "../assets/solicitar-presupuesto.png";
import BallotIcon from "@mui/icons-material/Ballot";

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
  height: "75%",
  overflow: "auto",
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function ListaConductoresNuevos({ change }) {
  function handleChange() {
    let value = 1;
    change(value);
  }

  return (
    <Card sx={{ display: "flex", margin: 2 }}>
      <CardActionArea onClick={handleChange}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 1,
            m: 1,
          }}
        >
          <Typography gutterBottom variant="subtitle2" component="div">
            CONDUCTORES RECIEN REGISTRADOS
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}
