"use client";

import * as React from "react";
import Image from "next/image";
import NextLink from "next/link";
import {
  CssBaseline,
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  Link,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
export default function SignInPage() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f5f9fc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 2,
              bgcolor: "#ffffff",
            }}
          >

            <Typography variant="h4" component="h1" gutterBottom>
              Sign in
            </Typography>

            <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
              <TextField
                label="Email"
                placeholder="your@email.com"
                fullWidth
                margin="normal"
              />

              <TextField
                label="Password"
                type="password"
                placeholder="••••••"
                fullWidth
                margin="normal"
              />

              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Remember me"
                sx={{ mt: 1 }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, py: 1.5 }}
              >
                Sign in
              </Button>

              <Box sx={{ textAlign: "right", mt: 1 }}>
                <Link
                  component={NextLink}
                  href="/forgot-password"
                  underline="hover"
                  variant="body2"
                >
                  Forgot your password?
                </Link>
              </Box>

              <Divider sx={{ my: 3 }}>or</Divider>

              <Button
                variant="outlined"
                fullWidth
                startIcon={<GoogleIcon />}
                sx={{ mb: 2 }}
              >
                Sign in with Google
              </Button>

              <Button
                variant="outlined"
                fullWidth
                startIcon={<FacebookIcon />}
              >
                Sign in with Facebook
              </Button>
            </Box>

            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography variant="body2">
                Don&apos;t have an account?{" "}
                <Link
                  component={NextLink}
                  href="/register"
                  underline="hover"
                >
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </React.Fragment>
  );
}
