"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "./PopularProducts.css"; // custom CSS file

type Product = {
  id: number;
  title: string;
  pricing: number;
  imageurl: string;
};

function PopularProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const GetPopularProducts = async () => {
      try {
        const result = await axios.get("http://localhost:1337/api/products");
        if (result.data?.data?.length) {
          const mapped = result.data.data.map((p: any) => ({
            id: p.id,
            title: p.title,
            pricing: p.pricing,
            imageurl: p.imageurl, // store as /products/xxx.jpg in Strapi
          }));
          setProducts(mapped);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    GetPopularProducts();
  }, []);

  const handleProductClick = (id: number) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="products-section">
      <h2 className="products-title">Popular Products</h2>

      <div className="products-grid">
        {products.map((p) => (
          <div
            key={p.id}
            className="product-card"
            onClick={() => handleProductClick(p.id)}
          >
            <img src={p.imageurl} alt={p.title} className="product-img" />
            <h3 className="product-name">{p.title}</h3>
            <p className="product-price">₹{p.pricing}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularProducts;
