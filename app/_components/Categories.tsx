"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "./Categories.css"; // Import CSS

type Category = {
  id: number;
  name: string;
  icon: string;
};

const FALLBACK_CATEGORIES: Category[] = [
  { id: 1, name: "T shirt", icon: "/tshirt.png" },
  { id: 2, name: "Hoodies", icon: "/hoodie.png" },
  { id: 3, name: "Mugs", icon: "/mug.png" },
  { id: 4, name: "Poster", icon: "/poster.png" },
  { id: 5, name: "Bags", icon: "/bag.png" },
];

function Categories() {
  const [categories, setCategories] = useState<Category[]>(FALLBACK_CATEGORIES);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await axios.get("http://localhost:1337/api/categories");
        if (result.data?.data?.length) {
          const mapped = result.data.data.map((cat: any) => ({
            id: cat.id,
            name: cat.name,
            icon:
              FALLBACK_CATEGORIES.find(
                (f) => f.name.toLowerCase() === cat.name.toLowerCase()
              )?.icon || "/default.png",
          }));
          setCategories(mapped);
        }
      } catch {
        console.warn("⚠️ Strapi unavailable, using fallback categories.");
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (cat: Category) => {
    router.push(`/category/${cat.id}`); // ✅ Corrected template literal
  };

  return (
    <div className="categories-section">
      <p className="popular-title">Popular Categories</p>
      <ul className="categories-list">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="category-card"
            onClick={() => handleCategoryClick(cat)}
          >
            <img src={cat.icon} alt={cat.name} />
            <span>{cat.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
