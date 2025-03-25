import React, { useState, useEffect } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../assets/firebase/configuracion"; // Asegúrate de configurar Firestore correctamente
import { Box, Container, Modal, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, FormControlLabel } from "@mui/material";

const center = {
  lat: 3.4516,
  lng: -76.532,
};

const MonitorMap = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [servicios, setServicios] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "services"), (snapshot) => {
      const updatedServicios = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setServicios(updatedServicios);
    });

    return () => unsubscribe();
  }, []); 

  console.log('servicios:', servicios);

  const handleMarkerClick = (service) => {
    setSelectedService(service);
  };

  const markerColors = {
    pendiente: 'red',
    validando: 'yellow',
    reservado: 'blue',
    confirmado: 'green',
    finalizado: 'gray',
  };

  const [visibleStates, setVisibleStates] = useState({
    pendiente: true,
    validando: true,
    reservado: true,
    confirmado: true,
    finalizado: true,
  });

  const handleStateChange = (event) => {
    setVisibleStates({ ...visibleStates, [event.target.name]: event.target.checked });
  };

  if (!isLoaded) {
    console.log('isLoaded:', isLoaded);
    console.log('servicios:', servicios);
    return <div>Cargando mapa...</div>;
  } 

  return (
    <Container
      position="relative"
      flexdirection="column"
      alignitems="center"
      h="100%"
      w="100%"
      sx={{
        backgroundColor: "#000",
        color: "#fff",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          ml: 0,
          mt: 0,
        }}
        position="absolute"
        left={0}
        top={0}
        h="100%"
        w="100%"
      >
       {/* Google Map Box */}
       <Box sx={{ position: 'absolute', top: 20, left: 20, backgroundColor: 'white', padding: 1, borderRadius: 1, boxShadow: 2, zIndex: 10, width: '200px', maxWidth: '90%', overflow: 'auto' }}> 
        <h3 style={{ fontSize: '14px' }}>Convenciones de Color</h3>
        <Table size="small" sx={{ '& th, & td': { padding: '4px' } }}>
          <TableHead>
            <TableRow>
              <TableCell>Estado</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Seleccionar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(markerColors).map(([estado, color]) => (
              <TableRow key={estado}>
                <TableCell style={{ fontSize: '12px' }}>{estado}</TableCell>
                <TableCell style={{ backgroundColor: color, width: '50px' }}></TableCell>
                <TableCell>
                  <Checkbox
                    name={estado}
                    checked={visibleStates[estado]}
                    onChange={handleStateChange}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
       <GoogleMap
          center={center}
          zoom={13}
          mapContainerStyle={{ width: "100%", height: "95%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            styles: [],
          }}
          onLoad={(map) => setMap(map)}
        > 
        {/*poner markers*/}
        {servicios.map((servicio, index) => (
          visibleStates[servicio.estado] && (
            <MarkerF
              key={index}
              position={{ lat: servicio.latitude, lng: servicio.longitude }}
              onClick={() => handleMarkerClick(servicio)}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: markerColors[servicio.estado] || 'black',
                fillOpacity: 1,
                scale: 10,
                strokeColor: 'white',
                strokeWeight: 2,
              }}
            />  
          )
        ))}
        {/*poner markers*/}
        </GoogleMap> 
      </Box>
      {selectedService && (
        <Modal>
          <h2>Información del Servicio</h2>
          <p>Origen: {selectedService.origen}</p>
          <p>Destino: {selectedService.destino}</p>
          <p>Conductor: {selectedService.conductor}</p>
          <p>Operador: {selectedService.operador}</p>
          <p>Guía: {selectedService.guia || 'No disponible'}</p>
          <p>Fecha de Salida: {selectedService.fechaSalida}</p>
          <p>Fecha de Regreso: {selectedService.fechaRegreso}</p>
          <p>Número de Pasajeros: {selectedService.numeroPasajeros}</p>
          <p>Tipo de Vehículo: {selectedService.tipoVehiculo}</p>
          <p>Tipo de Servicio: {selectedService.tipoServicio}</p>
          <button onClick={() => setSelectedService(null)}>Cerrar</button>
        </Modal>
      )}
    </Container>
  );
};

export default MonitorMap;