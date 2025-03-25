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

import { auth, updateUsuario } from "../assets/firebase/configuracion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const states = [
  {
    value: "ARMENIA",
    label: "Armenia",
  },  
  {
    value: "CALI",
    label: "Santiago de Cali",
  },
  {
    value: "CARTAGENA",
    label: "Cartagena",
  },
  {
    value: "BARRANQUILLA",
    label: "Barranquilla",
  },
  {
    value: "BOGOTA",
    label: "Bogota",
  },
  {
    value: "MANIZALES",
    label: "Manizales",
  },
  {
    value: "MEDELLIN",
    label: "medellin",
  },
  {
    value: "PASTO",
    label: "Pasto",
  },
  {
    value: "PEREIRA",
    label: "Pereira",
  },
  {
    value: "SANTA MARTHA",
    label: "Santa Martha",
  },
];

const jobs = [
  {
    value: "CEO",
    label: "Ceo",
  },
  {
    value: "CFO",
    label: "Cfo",
  },
  {
    value: "CMO",
    label: "Cmo",
  },
  {
    value: "CTO",
    label: "Ceo",
  },
  {
    value: "ASISTENTE CONTABLE",
    label: "Asistente Contable",
  },
  {
    value: "ASISTENTE COMERCIAL",
    label: "Asistente Comercial",
  },
  {
    value: "DESARROLLADOR",
    label: "Desarrollador",
  },
];

export const PerfilUsuario = (props) => {

  const [user, setUser] = useState(auth.currentUser);
  const [values, setValues] = useState({
    nombres: "Juan Carlos",
    apellidos: "Bastidas",
    puesto: "CEO",
    email: "juancarlosbastidasq@gmail.com",
    telefono: "3167599985",
    direccion: "Calle 31A 12-124 Apto 102C",
    ciudad: "CALI",
  });

  let navigate = useNavigate();

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleActualizar = ()=> {           
    updateUsuario(user.uid, values)
    toast("Perfil actualizado con éxito")
    setTimeout(() => {
      navigate("/panel-control/usuarios")
    }, "2000");    
           
  }

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
            <Grid item md={3} xs={12}>
              <TextField
                fullWidth
                helperText="Por favor especificque su nombre"
                label="Nombres"
                name="nombres"
                onChange={handleChange}
                required
                value={values.nombres}
                variant="outlined"
              />
            </Grid>
            <Grid item md={3} xs={12}>
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
            <Grid item md={3} xs={12}>
              <TextField
                fullWidth
                label="Correo Electronico"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item md={3} xs={12}>
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
            <Grid item md={4} xs={12}>
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
            <Grid item md={4} xs={12}>
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
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                label="Puesto de Trabajo"
                name="puesto"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.puesto}
                variant="outlined"
              >
                {jobs.map((option) => (
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
          <Button color="primary" variant="contained" onClick={handleActualizar}>
            Actualizar perfil
          </Button>
        </Box>
      </Card>
    </form>
  );
};
