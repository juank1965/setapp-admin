import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";

const states = [
  {
    value: "CALI",
    label: "Santiago de Cali",
  },
  {
    value: "BUENAVENTURA",
    label: "Buenaventura",
  },
  {
    value: "ARMENIA",
    label: "Armenia",
  },
];

export const PerfilUsuario = (props) => {
  const [values, setValues] = useState({
    Nombres: "Juan Carlos",
    Apellido: "Bastidas",
    email: "juancarlosbastidasq@gmail.com",
    telefono: "3167599985",
    direccion: "Calle 31A 12-124 Apto 102C",
    ciudad: "CALI",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader
          subheader="La información puede ser editada"
          title="Perfil"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Por favor especificque su nombre"
                label="Nombres"
                name="nombres"
                onChange={handleChange}
                required
                value={values.Nombres}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Apellidos"
                name="apellidos"
                onChange={handleChange}
                required
                value={values.apellidos}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Correo Electronico"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Numero de Telefono"
                name="telefono"
                onChange={handleChange}
                type="number"
                value={values.telefono}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Direccion"
                name="direccion"
                onChange={handleChange}
                required
                value={values.direccion}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select la Ciudad"
                name="ciudad"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.ciudad}
                variant="outlined"
              >
                {states.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained">
            Actualizar perfil
          </Button>
        </Box>
      </Card>
    </form>
  );
};
