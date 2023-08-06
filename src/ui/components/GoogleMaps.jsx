import React, { useState } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import { Box } from "@mui/material";

export const GoogleMaps = () => {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: null,
    lng: null,
    url: null,
    postalCode: null,
  });

  const apiKey = "AIzaSyDYkvHG2GFulnsRJHTczPV3m4tOfHem9CY";
  const generateShortLink = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/urlshortener/v1/url?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            longUrl: `https://www.google.com/maps/@${lat},${lng}`,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.id;
      } else {
        console.error("Error al generar enlace acortado");
        return null;
      }
    } catch (error) {
      console.error("Error al generar enlace acortado", error);
      return null;
    }
  };

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );

      if (response.ok) {
        const data = await response.json();
        const formattedAddress = data.results[0]?.formatted_address;
        const postalCode = data.results[0]?.address_components.find(
          (component) => component.types.includes("postal_code")
        )?.long_name;
        const url = `https://www.google.com/maps?q=${lat},${lng}`;

        setSelectedLocation({
          lat,
          lng,
          url,
          postalCode,
        });
      } else {
        console.error("Error al obtener datos de geocodificación inversa");
      }
    } catch (error) {
      console.error("Error al obtener datos de geocodificación inversa", error);
    }
  };

  return (
    <div>
      <GoogleMap
        key={apiKey}
        mapContainerStyle={{ height: "400px", width: "100%" }}
        center={{
          lat: selectedLocation.lat || 17.060444,
          lng: selectedLocation.lng || -96.725393,
        }}
        zoom={15}
        onClick={handleMapClick}
      >
        {selectedLocation.lat && selectedLocation.lng && (
          <Marker
            position={{
              lat: selectedLocation.lat,
              lng: selectedLocation.lng,
            }}
          />
        )}
      </GoogleMap>
      {selectedLocation.lat && selectedLocation.lng && (
        <div>
          <p>Latitud: {selectedLocation.lat}</p>
          <p>Longitud: {selectedLocation.lng}</p>
          <p>
            URL de Google Maps:{" "}
            <a
              href={selectedLocation.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir en Google Maps
            </a>
          </p>
          <p>Código Postal: {selectedLocation.postalCode}</p>
        </div>
      )}
    </div>
  );
};
