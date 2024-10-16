import React, { Suspense } from "react";
import { getCategoriesLoader } from "@/data/loaders";
import { CategoryDropdownInputField } from "./category-dropdown-input-field";

async function loader() {
  const categories = await getCategoriesLoader();
  return categories ?? [];
}

export async function CategoryDropdownInput() {
  const categories = await loader();
  return (
    <Suspense fallback={<div>Loading categories...</div>}>
      <CategoryDropdownInputField
        categories={categories}
        label="Category"
        name="category"
      />
    </Suspense>
  );
}
