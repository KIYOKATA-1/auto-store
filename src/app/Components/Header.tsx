"use client";

import React from "react";
import { Box, IconButton, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Typography from "@mui/joy/Typography";

interface HeaderProps {
  brand: string;
  category: string;
  priceRange: string;
  brands: string[];
  categories: string[];
  priceRanges: string[];
  onBrandChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onPriceRangeChange: (value: string) => void;
}

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
        <Typography level="h4">Автокаталог</Typography>
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
        <IconButton>
          <ShoppingCartIcon />
        </IconButton>
        <Button startIcon={<LogoutIcon />} variant="outlined">
          Выйти
        </Button>
      </Box>
    </Box>
  );
}
