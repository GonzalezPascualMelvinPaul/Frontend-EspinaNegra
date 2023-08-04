import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Button, TextField } from "@mui/material";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const GoogleMaps = ({ handleMapClick = () => {} }) => {
  const [position, setPosition] = useState({ lat: null, lng: null });

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBWthA-q3FUDRWI-vOHELV_gz9z4Mnib1g",
  });

  const handleGetUrl = () => {
    const { lat, lng } = position;
    if (lat && lng) {
      const url = `https://www.google.com/maps/@${lat},${lng}`;
      console.log("URL:", url);
      // Aquí puedes hacer lo que necesites con la URL, como mostrarla en una etiqueta o enviarla a un servidor.
    } else {
      console.log("Posición inválida.");
    }
  };

  if (loadError) {
    return <div>Error al cargar los mapas</div>;
  }

  if (!isLoaded) {
    return <div>Cargando mapas...</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 0, lng: 0 }}
        zoom={2}
        onClick={handleMapClick}
      >
        {position.lat && position.lng && <Marker position={position} />}
      </GoogleMap>
      <TextField label="Latitud" value={position.lat || ""} disabled />
      <TextField label="Longitud" value={position.lng || ""} disabled />
      <Button variant="contained" color="primary" onClick={handleGetUrl}>
        Obtener URL
      </Button>
    </div>
  );
};

export default GoogleMaps;
