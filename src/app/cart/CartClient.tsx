"use client";

import React, { useEffect, useState } from "react";
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

export default function CartClient() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [shipping, setShipping] = useState<"standard" | "express">("standard");
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    const parsed: Part[] = stored ? JSON.parse(stored) : [];
    const map = new Map<number, CartItem>();
    parsed.forEach((p) => {
      const exist = map.get(p.id);
      if (exist) {
        exist.quantity += 1;
      } else {
        map.set(p.id, { ...p, quantity: 1 });
      }
    });
    setItems(Array.from(map.values()));
  }, []);

  const updateStorage = (newItems: CartItem[]) => {
    const flat: Part[] = newItems.flatMap((it) =>
      Array(it.quantity).fill({
        id: it.id,
        name: it.name,
        price: it.price,
        description: it.description,
        image: it.image,
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
  const shippingCost = shipping === "standard" ? 500 : 1500;
  const total = subtotal + shippingCost - discount;

  const applyPromo = () => {
    setDiscount(promo === "DISCOUNT10" ? Math.round(subtotal * 0.1) : 0);
  };

  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        minHeight: "100vh",
        px: 4,
        py: 4,
        display: "flex",
        gap: 4,
        boxSizing: "border-box",
      }}
    >
      {/* Левая колонка: список товаров */}
      <Box sx={{ flex: 3 }}>
        <Typography variant="h5" gutterBottom>
          Корзина ({items.length} {items.length === 1 ? "товар" : "товара"})
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
                Цена: {it.price.toLocaleString("ru-RU")} ₸
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

            <Typography sx={{ width: 80, textAlign: "right" }}>
              {(it.price * it.quantity).toLocaleString("ru-RU")} ₸
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Правая колонка: сводка заказа */}
      <Box
        sx={{
          flex: 1,
          maxWidth: 360,
          border: "1px solid #e0e0e0",
          borderRadius: 1,
          p: 2,
          height: "fit-content",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Детали заказа
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography>Подытог</Typography>
          <Typography>{subtotal.toLocaleString("ru-RU")} ₸</Typography>
        </Box>

        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel>Доставка</InputLabel>
          <Select
            value={shipping}
            label="Доставка"
            onChange={(e) =>
              setShipping(e.target.value as "standard" | "express")
            }
          >
            <MenuItem value="standard">Стандарт — 500 ₸</MenuItem>
            <MenuItem value="express">Экспресс — 1 500 ₸</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          size="small"
          label="Промо-код"
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
        />
        <Button
          fullWidth
          size="small"
          variant="outlined"
          sx={{ mt: 1, mb: 2 }}
          onClick={applyPromo}
        >
          Применить
        </Button>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography>Итого</Typography>
          <Typography fontWeight={700}>
            {total.toLocaleString("ru-RU")} ₸
          </Typography>
        </Box>

        <Button fullWidth variant="contained" size="large">
          Оформить
        </Button>
      </Box>
    </Box>
  );
}
