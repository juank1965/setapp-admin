import React from "react";
import "leaflet/dist/leaflet.css";
import styles from "./MapLeaflet.module.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Marker as LeafletMarker, icon } from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { useGeolocated } from "react-geolocated";

LeafletMarker.prototype.options.icon = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

function MapLeaflet({}) {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  const accesToken = import.meta.env.VITE_MAPBOX_API_KEY;
  return !isGeolocationAvailable ? (
    <>
      <h3>Your browser does not support Geolocation</h3>
    </>
  ) : !isGeolocationEnabled ? (
    <h3>Geolocation is not enabled</h3>
  ) : coords ? (
    <div className="map leaflet-container">
      <MapContainer
        style={{ width: "95vmax", height: "100vmax" }}
        center={[coords.latitude, coords.longitude]}
        zoom={15}
      >
        <TileLayer
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          url={`https://api.mapbox.com/styles/v1/juan1965/cl6p5gnb6005d16og3kpqy4v2/tiles/256/{z}/{x}/{y}@2x?access_token=${accesToken}`}
        />
        <Marker position={[coords.latitude, coords.longitude]}>
          <Popup>
            Este es un popup. <br /> Y escribo lo que quiero.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  ) : (
    <>Getting the location data&hellip; </>
  );
}

export default MapLeaflet;
