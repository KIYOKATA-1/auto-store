"use client";

import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/material/Typography";
import { Part } from "@/types/details.type";

interface PartsGridProps {
  parts: Part[];
}

export default function PartsGrid({ parts }: PartsGridProps) {
  const [visibleCount, setVisibleCount] = useState(9);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount((prev) => Math.min(prev + 9, parts.length));
      }
    });
    const el = loaderRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [parts.length]);

  const handleAddToCart = (part: Part) => {
    const stored = localStorage.getItem("cart");
    const cart: Part[] = stored ? JSON.parse(stored) : [];
    cart.push(part);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 2,
      }}
    >
      {parts.slice(0, visibleCount).map((part) => (
        <Card key={part.id} variant="outlined" sx={{ pb: 2 }}>
          <CardOverflow>
            <Box
              component="img"
              src={part.image}
              alt={part.name}
              sx={{ width: "100%", height: 200, objectFit: "contain" }}
            />
          </CardOverflow>
          <Box sx={{ p: 2 }}>
            <Typography
              variant="h6"
              sx={{ textTransform: "uppercase", fontWeight: 600 }}
            >
              {part.name}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {part.description}
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              Цена: {part.price.toLocaleString("ru-RU")} $
            </Typography>
            <Button
              variant="contained"
              size="small"
              sx={{ mt: 1 }}
              onClick={() => handleAddToCart(part)}
            >
              Добавить в корзину
            </Button>
          </Box>
        </Card>
      ))}
      <Box ref={loaderRef} sx={{ gridColumn: "1 / -1", height: 1 }} />
    </Box>
  );
}
