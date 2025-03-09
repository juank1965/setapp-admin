import * as React from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";

export default function ListaGuiasPorValidar({ change }) {
  function handleChange() {
    let value = 7;
    change(value);
  }

  return (
    <Card sx={{ maxWidth: 200, margin: 1 }}>
      <CardActionArea onClick={handleChange}>        
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Por Validar
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Lista de Guías de turismo por validar documentos
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Chip color="success" label="Ver Lista" onClick={handleChange} />
      </CardActions>
    </Card> 
  );
}
