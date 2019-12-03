import React from "react";
import { useParams } from "react-router";
import styles from "./Category.module.scss";
import Thumbnail from "./Thumbnail";
import { LoadingState } from "../shared/useFetch";
import { useMealExcerptsOfCategory } from "../api/theMealDb";
import Center from "../shared/Center";
import Spinner from "../shared/Spinner";

const Category: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [meals, loadingState, loadError] = useMealExcerptsOfCategory(
    categoryName
  );

  document.title = `The Meal DB: ${categoryName}`;

  switch (loadingState) {
    case LoadingState.DONE:
      return (
        <>
          <h1 className={styles.pageTitle}>{categoryName}</h1>
          <ul className={styles.list}>
            {meals!.map(meal => (
              <li key={meal.idMeal} className={styles.listItem}>
                <Thumbnail
                  to={`/meal/${meal.idMeal}`}
                  label={meal.strMeal}
                  imgSrc={meal.strMealThumb}
                  imgAlt={meal.strMeal}
                  imgWidth={180}
                  imgHeight={180}
                />
              </li>
            ))}
          </ul>
        </>
      );

    case LoadingState.ERROR:
      throw loadError;

    case LoadingState.PENDING:
      return (
        <Center>
          <Spinner />
        </Center>
      );
  }
};

export default Category;
