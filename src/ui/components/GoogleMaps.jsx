import React, { useState } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

import { getEnvVariables } from "../../helpers/getEnvVariables";

export const GoogleMaps = ({
  onMapValuesChange,
  latitud = null,
  longitud = null,
}) => {
  const { VITE_API_KEY_GOOGLE } = getEnvVariables();

  const [selectedLocation, setSelectedLocation] = useState({
    lat: latitud,
    lng: longitud,
    url: null,
    postalCode: null,
  });

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${VITE_API_KEY_GOOGLE}`
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

        onMapValuesChange({
          latitud: lat,
          longitud: lng,
          url: url,
          codigoPostal: postalCode,
        });
      } else {
        console.error("Error al obtener datos de geocodificación inversa");
      }
    } catch (error) {
      console.error("Error al obtener datos de geocodificación inversa", error);
    }
  };

  return (
    <LoadScript googleMapsApiKey={VITE_API_KEY_GOOGLE}>
      <div>
        <GoogleMap
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
                lat: selectedLocation.lat || 17.060444,
                lng: selectedLocation.lng || -96.725393,
              }}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};
