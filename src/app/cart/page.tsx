"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Part } from "@/types/details.type";

type CartItem = Part & { quantity: number };

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [shipping, setShipping] = useState<"standard" | "express">("standard");
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    const parsed: (Part & { quantity?: number })[] = stored
      ? JSON.parse(stored)
      : [];

    const map = new Map<number, CartItem>();
    parsed.forEach((p) => {
      const exist = map.get(p.id);
      const qty = p.quantity ?? 1;
      if (exist) {
        exist.quantity += qty;
      } else {
        map.set(p.id, { ...p, quantity: qty });
      }
    });

    setItems(Array.from(map.values()));
  }, []);

  const updateStorage = (newItems: CartItem[]) => {
    const flat: Part[] = newItems.flatMap((item) =>
      Array(item.quantity).fill({
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description,
        image: item.image,
      })
    );
    localStorage.setItem("cart", JSON.stringify(flat));
  };

  const changeQty = (id: number, delta: number) => {
    setItems((prev) => {
      const next = prev
        .map((it) =>
          it.id === id
            ? { ...it, quantity: Math.max(1, it.quantity + delta) }
            : it
        )
        .filter((it) => it.quantity > 0);
      updateStorage(next);
      return next;
    });
  };

  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const shippingRates = { standard: 500, express: 1500 };
  const shippingCost = shippingRates[shipping];
  const total = subtotal + shippingCost - discount;

  const applyPromo = () => {
    if (promo === "DISCOUNT10") {
      setDiscount(Math.round(subtotal * 0.1));
    } else {
      setDiscount(0);
    }
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  return (
    <Box sx={{ display: "flex", p: 4, gap: 4 }}>
      {/* Детали Корзины */}
      <Box sx={{ flex: 2 }}>
        <Typography variant="h5" gutterBottom>
          Cart ({items.length} {items.length === 1 ? "item" : "items"})
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {items.map((it) => (
          <Box
            key={it.id}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              gap: 2,
            }}
          >
            <Box
              component="img"
              src={it.image}
              alt={it.name}
              sx={{ width: 80, height: 80, objectFit: "contain" }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1">{it.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {formatCurrency(it.price)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton size="small" onClick={() => changeQty(it.id, -1)}>
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography sx={{ mx: 1 }}>{it.quantity}</Typography>
              <IconButton size="small" onClick={() => changeQty(it.id, +1)}>
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
            <Typography sx={{ width: 100, textAlign: "right" }}>
              {formatCurrency(it.price * it.quantity)}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Детали Заказа*/}
      <Box
        sx={{
          flex: 1,
          border: "1px solid #e0e0e0",
          p: 2,
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Order Details
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography>Subtotal</Typography>
          <Typography>{formatCurrency(subtotal)}</Typography>
        </Box>

        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel>Shipping</InputLabel>
          <Select
            value={shipping}
            label="Shipping"
            onChange={(e) =>
              setShipping(e.target.value as "standard" | "express")
            }
          >
            <MenuItem value="standard">
              Standard — {formatCurrency(shippingRates.standard)}
            </MenuItem>
            <MenuItem value="express">
              Express — {formatCurrency(shippingRates.express)}
            </MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            size="small"
            label="Promo Code"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
          />
          <Button
            fullWidth
            size="small"
            variant="outlined"
            sx={{ mt: 1 }}
            onClick={applyPromo}
          >
            Apply
          </Button>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography>Total</Typography>
          <Typography fontWeight={700}>{formatCurrency(total)}</Typography>
        </Box>

        <Button fullWidth variant="contained" size="large">
          Checkout
        </Button>
      </Box>
    </Box>
  );
}
