import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";


export default function ListaServiciosFinalizados({ change }) {  

  function handleChange() {
    let value = 4;

    change(value);
  }

  return (
    <Stack direction="row" spacing={1} sx={{ m: 1 }}>
      <Chip color="primary" label="Servicios Finalizados" onClick={handleChange} />
    </Stack>    
  );
}
