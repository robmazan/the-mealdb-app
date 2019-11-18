import React from "react";
import { Link } from "react-router-dom";
import { Category } from "../api/theMealDb";
import styles from "./CategoryThumbnail.module.scss";

const CategoryThumbnail: React.FC<{ category: Category }> = ({ category }) => {
  return (
    <Link
      className={styles.link}
      title={category.strCategoryDescription}
      to={`/category/${category.idCategory}`}
    >
      <img
        className={styles.thumb}
        src={category.strCategoryThumb}
        alt={`Thumbnail for ${category.strCategory}`}
      />
      {category.strCategory}
    </Link>
  );
};

export default CategoryThumbnail;
