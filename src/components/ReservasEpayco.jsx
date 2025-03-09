import * as React from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";

export default function ReservasEpayco({ change }) {
  function handleChange() {
    let value = 1;
    change(value);
  }

  return (
    <Card sx={{ maxWidth: 200, margin: 1 }}>
      <CardActionArea onClick={handleChange}>        
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Medio de Pago
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Epayco
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Chip color="info" label="Validar Pagos" onClick={handleChange} />
      </CardActions>
    </Card>   
  );
}
