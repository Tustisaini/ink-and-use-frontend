"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

type Category = {
  id: number;
  attributes: {
    name: string;
    icon?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
  };
};

function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetCategoryList();
  }, []);

  const GetCategoryList = async () => {
    try {
      const result = await axios.get("/api/categories");
      setCategories(result.data.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading categories...</p>;

  return (
    <div className="categories-container">
      <h2>Categories</h2>
      <ul>
        {categories.map((cat) => {
          const iconUrl =
            cat.attributes.icon?.data?.attributes?.url ?? null;

          return (
            <li key={cat.id}>
              {iconUrl && (
                <img
                  src={iconUrl}
                  alt={cat.attributes.name}
                  width={40}
                  height={40}
                />
              )}
              <span>{cat.attributes.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
