"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Footer() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const center: [number, number] = [51.117055,71.436116];

  const markerIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <Box component="footer" sx={{ bgcolor: "#f5f5f5", p: 4 }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography variant="h6" gutterBottom>
            Company Details
          </Typography>
        </Box>

        <Box sx={{ flex: 1, minWidth: 300, height: 300 }}>
          {isClient && (
            <MapContainer
              center={center}
              zoom={16}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={center} icon={markerIcon}>
                <Popup>Мәңгілік Ел 20/1, Астана, Казахстан</Popup>
              </Marker>
            </MapContainer>
          )}
        </Box>
      </Box>
    </Box>
  );
}
