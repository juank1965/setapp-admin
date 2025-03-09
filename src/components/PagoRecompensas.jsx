import * as React from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";

export default function PagoRecompensas({change}) {
  function handleChange() {
    let value = 3;
    
    change(value);
    
 }

  return (
    <Card sx={{ maxWidth: 200, margin: 1 }}>
    <CardActionArea onClick={handleChange}>        
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Pago Referidos
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Pagos a Conductores que hayan ganado el valor ofrecido por sus referidos
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
    <Chip color="success" label="Validar Pagos" onClick={handleChange} />
    </CardActions>
  </Card>     
  );
}
