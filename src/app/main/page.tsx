"use client";

import React, { useState, useMemo } from "react";
import { Box, CssBaseline, Container } from "@mui/material";

import { parts } from "@/data/parts";
import Header from "../Components/Header";
import PartsGrid from "../Components/PartsGrid";
import Footer from "../Components/Footer";

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
        .filter((p) => {
          if (priceRange === "All") return true;
          if (priceRange === "<1000") return p.price < 1000;
          if (priceRange === "1000-5000") return p.price <= 5000;
          return p.price > 5000;
        }),
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
        </Container>
        <Container maxWidth="lg">
          <PartsGrid parts={filtered} />
        </Container>
      </Box>

      <Footer />
    </>
  );
}
