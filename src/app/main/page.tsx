"use client";

import * as React from "react";
import { Box, CssBaseline, Container, Typography } from "@mui/material";
import Grid from '@mui/joy/Grid';


export default function MainPage() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Добро пожаловать на главную страницу
          </Typography>
        </Container>
      </Box>
    </React.Fragment>
  );
}
