import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
<<<<<<< HEAD
=======
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";
>>>>>>> dbd5f5555036f987592748616dfb985b6f69daf3

export default function ListaServiciosConfirmados({change}) {
  function handleChange() {
    let value = 3;
    
    change(value);
 }

  return (
<<<<<<< HEAD
    <Stack direction="row" spacing={1} sx={{ m: 1 }}>
      <Chip color="primary" label="Servicios Confirmados" onClick={handleChange} />
    </Stack>    
=======
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
>>>>>>> dbd5f5555036f987592748616dfb985b6f69daf3
  );
}
