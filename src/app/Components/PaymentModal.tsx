"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type PaymentModalProps = {
  open: boolean;
  onClose: () => void;
  amount: number;
  onSuccess: () => void;
};

export default function PaymentModal({
  open,
  onClose,
  amount,
  onSuccess,
}: PaymentModalProps) {
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [zip, setZip] = useState("");
  const [success, setSuccess] = useState(false);

  const onlyDigits = (s: string) => s.replace(/\D/g, "");

  const handlePay = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onSuccess();
      onClose();
      setNameOnCard("");
      setCardNumber("");
      setExpiryMonth("");
      setExpiryYear("");
      setSecurityCode("");
      setZip("");
    }, 1500);
  };

  const isValid =
    nameOnCard.trim() &&
    cardNumber.length === 16 &&
    expiryMonth.length === 2 &&
    expiryYear.length === 2 &&
    securityCode.length === 3 &&
    zip.length >= 4;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Payment amount</DialogTitle>

      <DialogContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(amount)}
          </Typography>
          <Button size="small" onClick={onClose}>
            Edit
          </Button>
        </Box>

        {success ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CheckCircleIcon sx={{ fontSize: 64, color: "green" }} />
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Name on card"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              fullWidth
            />

            <TextField
              label="Card number"
              value={cardNumber}
              onChange={(e) => setCardNumber(onlyDigits(e.target.value).slice(0, 16))}
              inputProps={{ inputMode: "numeric", maxLength: 16 }}
              fullWidth      
            />

            <Box display="flex" gap={1}>
              <TextField
                label="Expiry (MM)"
                value={expiryMonth}
                onChange={(e) => setExpiryMonth(onlyDigits(e.target.value).slice(0, 2))}
                inputProps={{ inputMode: "numeric", maxLength: 2 }}
                fullWidth
              />
              <TextField
                label="Expiry (YY)"
                value={expiryYear}
                onChange={(e) => setExpiryYear(onlyDigits(e.target.value).slice(0, 2))}
                inputProps={{ inputMode: "numeric", maxLength: 2 }}
                fullWidth
              />
            </Box>

            <Box display="flex" gap={1}>
              <TextField
                label="Security code"
                value={securityCode}
                onChange={(e) => setSecurityCode(onlyDigits(e.target.value).slice(0, 3))}
                inputProps={{ inputMode: "numeric", maxLength: 3 }}
                fullWidth
              />
              <TextField
                label="ZIP/Postal code"
                value={zip}
                onChange={(e) => setZip(onlyDigits(e.target.value))}
                inputProps={{ inputMode: "numeric" }}
                fullWidth
              />
            </Box>
          </Box>
        )}
      </DialogContent>

      {!success && (
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handlePay}
            disabled={!isValid}
          >
            Pay
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
