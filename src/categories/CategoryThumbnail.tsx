import React, { Fragment } from "react";
import { Category } from "../api/theMealDb";

const CategoryThumbnail: React.FC<{ category: Category }> = ({ category }) => {
  return (
    <Fragment key={category.idCategory}>
      <span title={category.strCategoryDescription}>
        {category.strCategory}
      </span>
    </Fragment>
  );
};

export default CategoryThumbnail;
