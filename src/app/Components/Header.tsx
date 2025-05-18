"use client";

import React, { useEffect, useState } from "react";
import { Box, IconButton, Button, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Typography from "@mui/joy/Typography";
import { HeaderProps } from "@/types/header.types";
import { useRouter } from "next/navigation";

export default function Header({
  brand,
  category,
  priceRange,
  brands,
  categories,
  priceRanges,
  onBrandChange,
  onCategoryChange,
  onPriceRangeChange,
}: HeaderProps) {
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const updateCount = () => {
      const stored = localStorage.getItem("cart");
      const cart = stored ? JSON.parse(stored) : [];
      setCartCount(Array.isArray(cart) ? cart.length : 0);
    };

    updateCount();

    window.addEventListener("storage", updateCount);
    window.addEventListener("cartUpdated", updateCount);

    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("cartUpdated", updateCount);
    };
  }, []);

  const handleCartClick = () => {
    router.push("/cart");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: 2,
        px: 4,
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          component="img"
          src="/image/logo.png"
          alt="Logo"
          sx={{ width: 40, height: 40, mr: 1 }}
        />
        <Typography level="h4" sx={{ fontWeight: 700 }}>
          DAS-AUTO
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Select
          size="md"
          placeholder="Бренд"
          value={brand}
          onChange={(e, val) => onBrandChange(val ?? "")}
          sx={{ minWidth: 160 }}
        >
          {brands.map((b) => (
            <Option key={b} value={b}>
              {b}
            </Option>
          ))}
        </Select>
        <Select
          size="md"
          placeholder="Категория"
          value={category}
          onChange={(e, val) => onCategoryChange(val ?? "")}
          sx={{ minWidth: 160 }}
        >
          {categories.map((c) => (
            <Option key={c} value={c}>
              {c}
            </Option>
          ))}
        </Select>
        <Select
          size="md"
          placeholder="Цена"
          value={priceRange}
          onChange={(e, val) => onPriceRangeChange(val ?? "")}
          sx={{ minWidth: 160 }}
        >
          {priceRanges.map((p) => (
            <Option key={p} value={p}>
              {p}
            </Option>
          ))}
        </Select>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton onClick={handleCartClick}>
          <Badge badgeContent={cartCount} color="primary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <Button startIcon={<LogoutIcon />} variant="outlined">
          Выйти
        </Button>
      </Box>
    </Box>
  );
}
