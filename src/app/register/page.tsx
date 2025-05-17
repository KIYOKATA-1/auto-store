"use client";

import * as React from "react";
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

export default function SignUpPage() {
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
              Sign up
            </Typography>

            <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
              <TextField
                label="First name"
                placeholder="John"
                fullWidth
                margin="normal"
              />

              <TextField
                label="Last name"
                placeholder="Doe"
                fullWidth
                margin="normal"
              />

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

              <TextField
                label="Confirm password"
                type="password"
                placeholder="••••••"
                fullWidth
                margin="normal"
              />

              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="I agree to the Terms and Conditions"
                sx={{ mt: 1 }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, py: 1.5 }}
              >
                Sign up
              </Button>

              <Divider sx={{ my: 3 }}>or</Divider>

              <Button
                variant="outlined"
                fullWidth
                startIcon={<GoogleIcon />}
                sx={{ mb: 2 }}
              >
                Sign up with Google
              </Button>

              <Button
                variant="outlined"
                fullWidth
                startIcon={<FacebookIcon />}
              >
                Sign up with Facebook
              </Button>
            </Box>

            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography variant="body2">
                Already have an account?{" "}
                <Link
                  component={NextLink}
                  href="/login"
                  underline="hover"
                >
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </React.Fragment>
  );
}
