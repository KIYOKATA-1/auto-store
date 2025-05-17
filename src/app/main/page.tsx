"use client";

import React, { useState, useMemo } from "react";
import { Box, CssBaseline, Container, Typography } from "@mui/material";

import { parts } from "@/data/parts";
import Header from "../Components/Header";
import PartsGrid from "../Components/PartsGrid";

export default function MainPage() {
  const brandOptions = useMemo(
    () => ["All", ...new Set(parts.map((p) => p.brand))],
    []
  );
  const categoryOptions = useMemo(
    () => ["All", ...new Set(parts.map((p) => p.category))],
    []
  );
  const priceOptions = ["All", "<1000", "1000-5000", ">5000"];

  const [brand, setBrand] = useState("All");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");

  const filtered = useMemo(
    () =>
      parts
        .filter((p) => brand === "All" || p.brand === brand)
        .filter((p) => category === "All" || p.category === category)
        .filter(
          (p) =>
            priceRange === "All" ||
            (priceRange === "<1000"
              ? p.price < 1000
              : priceRange === "1000-5000"
              ? p.price <= 5000
              : p.price > 5000)
        ),
    [brand, category, priceRange]
  );

  return (
    <>
      <CssBaseline />
      <Header
        brand={brand}
        category={category}
        priceRange={priceRange}
        brands={brandOptions}
        categories={categoryOptions}
        priceRanges={priceOptions}
        onBrandChange={setBrand}
        onCategoryChange={setCategory}
        onPriceRangeChange={setPriceRange}
      />
      <Box sx={{ mt: 4, p: 2 }}>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Добро пожаловать на главную страницу
          </Typography>
        </Container>
        <Container maxWidth="lg">
          <PartsGrid parts={filtered} />
        </Container>
      </Box>
    </>
  );
}
