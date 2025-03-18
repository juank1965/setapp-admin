import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Asegúrate de configurar Firestore correctamente

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 3.4516,
  lng: -76.532,
};

const vehicleColors = {
  Auto: "yellow",
  Buseta: "blue",
  Bus: "green",
  Van: "red",
  Minivan: "gray",
  Suv: "purple",
};

const MonitorMap = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "services"), (snapshot) => {
      const updatedVehicles = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setVehicles(updatedVehicles);
    });

    return () => unsubscribe();
  }, []);

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div style={{ display: "flex" }}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {vehicles &&  vehicles.map((vehicle) => (
          <Marker
            key={vehicle.id}
            position={{ lat: vehicle.lat, lng: vehicle.lng }}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: vehicleColors[vehicle.type] || "gray",
              fillOpacity: 1,
              scale: 6,
              strokeWeight: 1,
            }}
            onClick={() => setSelectedVehicle(vehicle)}
          />
        ))}
      </GoogleMap>
      {selectedVehicle && (
        <div style={{ marginLeft: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px", background: "#fff" }}>
          <h3>Detalles del Servicio</h3>
          <p><strong>Origen:</strong> {selectedVehicle.origin}</p>
          <p><strong>Destino:</strong> {selectedVehicle.destination}</p>
          <p><strong>Conductor:</strong> {selectedVehicle.driver}</p>
          <p><strong>Usuario:</strong> {selectedVehicle.user}</p>
        </div>
      )}
    </div>
  );
};

export default MonitorMap;