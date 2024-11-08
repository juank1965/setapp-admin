import * as React from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ListaGuiasPorValidar({ change }) {
  function handleChange() {
    let value = 7;
    change(value);
  }

  return (
    <Stack direction="row" spacing={1} sx={{m:1}}>
      <Chip color="info" label="Guías por validar" onClick={handleChange} />      
    </Stack>
  );
}
