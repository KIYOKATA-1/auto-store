"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Box, TextField, Typography } from "@mui/material";


export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "#f5f5f5", p: 4 }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography variant="h6" gutterBottom>
            Company Details
          </Typography>
        </Box>

        <Box sx={{ flex: 1, minWidth: 300, height: 300 }}>
        </Box>
      </Box>
    </Box>
  );
}
