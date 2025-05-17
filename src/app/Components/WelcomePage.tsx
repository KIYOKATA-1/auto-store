"use client";

import React from "react";
import NoSsr from "@mui/material/NoSsr";
import { CssBaseline, Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <NoSsr>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: 2,
        }}
      >
        <Typography variant="h3" component="h1">
          Добро пожаловать
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => router.push("/login")}
          sx={{
            mt: 4,
            px: 6,
            py: 1.5,
            fontSize: "1rem",
          }}
        >
          Начать
        </Button>
      </Box>
    </NoSsr>
  );
}
