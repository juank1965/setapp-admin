import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";

export default function ListaServiciosConfirmados({change}) {
  function handleChange() {
    let value = 3;
    
    change(value);
 }

  return (
    <Card sx={{ maxWidth: 200, margin: 1 }}>
    <CardActionArea onClick={handleChange}>        
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Confirmados
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Salidas confirmadas 
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
    <Chip color="primary" label="Salidas Confirmadas" onClick={handleChange} />
    </CardActions>
  </Card>    
  );
}
