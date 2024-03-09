"use client";
import React from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { CgSpinner } from "react-icons/cg";

// I don't want to create env file just for this, that's why I'm keeping it here
const GOOGLE_MAPS_API_KEY = "AIzaSyAweeG9yxU6nQulKdyN6nIIBtSPak1slfo";

interface Props {
  lat: number;
  lng: number;
}

const UserMap: React.FC<Props> = ({ lat, lng }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) {
    return (
      <CgSpinner className="animate-spin size-8 mx-auto text-green-500 mt-10" />
    );
  }

  return (
    <div>
      <p className="text-sm text-center text-gray-500 mb-2">
        Note: Some users have invalid coordinates (returned by Random User API),
        so the map might not be show the correct location.
      </p>
      <GoogleMap
        center={{ lat, lng }}
        zoom={15}
        mapContainerClassName="rounded-md overflow-hidden w-full h-80"
        options={{
          zoomControl: true,
          draggable: true,
          scrollwheel: false,
          disableDoubleClickZoom: true,
          disableDefaultUI: true,
        }}
      >
        <MarkerF position={{ lat, lng }} />
      </GoogleMap>
    </div>
  );
};

export default UserMap;
