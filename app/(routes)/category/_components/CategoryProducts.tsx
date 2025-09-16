"use client";

import React from "react";

interface Props {
  categoryName: string;
}

function CategoryProducts({ categoryName }: Props) {
  return (
    <div>
      <h2>Category: {categoryName}</h2>
      <p>Products for this category will be shown here.</p>
    </div>
  );
}

export default CategoryProducts;
