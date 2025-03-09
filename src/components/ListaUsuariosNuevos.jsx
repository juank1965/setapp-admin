import * as React from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";


export default function ListaUsuariosNuevos({ change }) {
  function handleChange() {
    let value = 4;
    change(value);
  }

  return (
    <Card sx={{ maxWidth: 200, margin: 1 }}>
      <CardActionArea onClick={handleChange}>        
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Nuevos
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Muestra lista de Operadores turisticos recien registrados
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Chip color="secondary" label="Ver Lista" onClick={handleChange} />
      </CardActions>
    </Card>    
  );
}
