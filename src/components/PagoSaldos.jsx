import * as React from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";

export default function PagoSaldos({change}) {
  
  function handleChange() {
    let value = 2;
    
    change(value);
    
 }

  return (
    <Card sx={{ maxWidth: 200, margin: 1 }}>
    <CardActionArea onClick={handleChange}>        
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Pago Total
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          50% del Valor Contratado al finalizar el servicio
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
    <Chip color="info" label="Validar Pagos" onClick={handleChange} />
    </CardActions>
  </Card>     
  );
}
