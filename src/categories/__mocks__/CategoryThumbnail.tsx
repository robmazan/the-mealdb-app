import React from "react";
import { Category } from "../../api/theMealDb";

const CategoryThumbnail: React.FC<{ category: Category }> = ({ category }) => {
  return <code>{JSON.stringify(category)}</code>;
};

export default CategoryThumbnail;
