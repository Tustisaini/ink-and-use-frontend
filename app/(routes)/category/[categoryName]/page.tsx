"use client";

import React from "react";
import { useParams } from "next/navigation";
import CategoryProducts from "../_components/CategoryProducts";

export default function CategoryPage() {
  const { categoryName } = useParams();

  return (
    <div>
      <CategoryProducts categoryName={categoryName as string} />
    </div>
  );
}
