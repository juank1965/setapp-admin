import * as React from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";

export default function ListaGuias({ change }) {
  function handleChange() {
    let value = 8;
    change(value);
  }

  return (
    <Card sx={{ maxWidth: 200, margin: 1 }}>
      <CardActionArea onClick={handleChange}>        
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Registrados
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Muestra lista de Guías de turismo activos
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Chip color="success" label="Ver Lista" onClick={handleChange} />
      </CardActions>
    </Card>  
  );
}
