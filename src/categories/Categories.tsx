import React, { useEffect, useState } from "react";
import { Category, fetchCategories } from "../api/theMealDb";
import CategoryThumbnail from "./CategoryThumbnail";
import styles from "./Categories.module.scss";

enum LoadingState {
  PENDING,
  ERROR,
  DONE
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.PENDING
  );

  useEffect(() => {
    const fetchIfNeeded = async () => {
      let storedCategories = localStorage.getItem("storedCategories");
      let categories: Category[] = [];

      if (storedCategories) {
        categories = JSON.parse(storedCategories);
        setLoadingState(LoadingState.DONE);
      } else {
        try {
          categories = await fetchCategories();
          localStorage.setItem("storedCategories", JSON.stringify(categories));
          setLoadingState(LoadingState.DONE);
        } catch {
          setLoadingState(LoadingState.ERROR);
        }
      }
      setCategories(categories);
    };
    fetchIfNeeded();
  }, []);

  switch (loadingState) {
    case LoadingState.DONE:
      return (
        <ul className={styles.list}>
          {categories.map(category => (
            <li key={category.idCategory} className={styles.listItem}>
              <CategoryThumbnail category={category} />
            </li>
          ))}
        </ul>
      );

    case LoadingState.ERROR:
      return <div>ERROR: cannot load categories!</div>;

    case LoadingState.PENDING:
      return <div>Loading categories...</div>;
  }
};

export default Categories;
