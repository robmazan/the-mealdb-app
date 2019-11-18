import React, { useEffect, useState } from "react";
import { Category, fetchCategories } from "../api/theMealDb";
import CategoryThumbnail from "./CategoryThumbnail";

let cachedCategories: Category[];

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
      if (!cachedCategories) {
        try {
          cachedCategories = await fetchCategories();
          setLoadingState(LoadingState.DONE);
        } catch {
          setLoadingState(LoadingState.ERROR);
        }
      }
      setCategories(cachedCategories);
    };
    fetchIfNeeded();
  }, []);

  switch (loadingState) {
    case LoadingState.DONE:
      return (
        <ul>
          {categories.map(category => (
            <li>
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
