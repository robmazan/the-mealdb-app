import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MealExcerpt, searchByCategoryName } from "../api/theMealDb";
import styles from "./Category.module.scss";
import Thumbnail from "./Thumbnail";

enum LoadingState {
  PENDING,
  ERROR,
  DONE
}

const Category: React.FC = () => {
  const [meals, setMeals] = useState<MealExcerpt[]>([]);
  const { categoryName } = useParams();
  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.PENDING
  );

  document.title = `The Meal DB: ${categoryName}`;

  useEffect(() => {
    let mounted = true;
    const abortController = new AbortController();
    setLoadingState(LoadingState.PENDING);
    if (categoryName) {
      const fetchMeals = async () => {
        if (mounted) {
          try {
            const mealsInCategory = await searchByCategoryName(
              categoryName,
              abortController.signal
            );
            setMeals(mealsInCategory);
            setLoadingState(LoadingState.DONE);
          } catch {
            setLoadingState(LoadingState.ERROR);
          }
        }
      };
      fetchMeals();
    }

    const cleanup = () => {
      mounted = false;
      abortController.abort();
    };

    return cleanup;
  }, [categoryName]);

  switch (loadingState) {
    case LoadingState.DONE:
      return (
        <>
          <h1 className={styles.pageTitle}>{categoryName}</h1>
          <ul className={styles.list}>
            {meals.map(meal => (
              <li key={meal.idMeal} className={styles.listItem}>
                <Thumbnail
                  to={`/meal/${meal.idMeal}`}
                  label={meal.strMeal}
                  imgSrc={meal.strMealThumb}
                  imgAlt={meal.strMeal}
                />
              </li>
            ))}
          </ul>
        </>
      );

    case LoadingState.ERROR:
      return <div>ERROR: cannot load category!</div>;

    case LoadingState.PENDING:
      return <div>Loading category...</div>;
  }
};

export default Category;
