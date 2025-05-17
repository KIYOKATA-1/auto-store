"use client";

import React, { useState, useMemo } from 'react';
import { Box, CssBaseline, Container, Typography } from '@mui/material';

import { parts } from '@/data/parts';
import Header from '../Components/Header';

export default function MainPage() {
  const brandOptions = useMemo(() => ['Все', ...new Set(parts.map(p => p.brand))], []);
  const categoryOptions = useMemo(() => ['Все', ...new Set(parts.map(p => p.category))], []);
  const priceOptions = ['Все', '<1000', '1000-5000', '>5000'];

  const [brand, setBrand] = useState('Все');
  const [category, setCategory] = useState('Все');
  const [priceRange, setPriceRange] = useState('Все');

  return (
    <>
      <CssBaseline />
      <Header brand={brand} category={category} priceRange={priceRange}
        brands={brandOptions} categories={categoryOptions} priceRanges={priceOptions}
        onBrandChange={setBrand} onCategoryChange={setCategory} onPriceRangeChange={setPriceRange} />
      <Box sx={{ mt: 4, p: 2 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>Добро пожаловать на главную страницу</Typography>
        </Container>
      </Box>
    </>
  );
}
