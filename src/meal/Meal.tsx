import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useMeal } from "../api/theMealDb";
import styles from "./Meal.module.scss";
import { LoadingState } from "../shared/useFetch";

const Meal: React.FC = () => {
  const { mealId } = useParams<{ mealId: string }>();
  const [meal, loadingState, error] = useMeal(Number.parseInt(mealId));

  switch (loadingState) {
    case LoadingState.DONE:
      return (
        <>
          <Link
            className={styles.backLink}
            to={`/category/${meal!.strCategory}`}
          >
            Back to category
          </Link>
          <h2 className={styles.pageTitle}>{meal!.strMeal}</h2>
          <div className={styles.card}>
            <img
              className={styles.photo}
              src={meal!.strMealThumb}
              alt={meal!.strMeal}
            />
          </div>
          <h3>Ingredients</h3>
          <ul className={styles.ingredientList}>
            {meal!.ingredients.map((ingredient, index) => (
              <li
                className={styles.listItem}
                key={`ing_${meal!.idMeal}_${index}`}
              >
                {ingredient.measure}&nbsp;{ingredient.name}
              </li>
            ))}
          </ul>
          <ul className={styles.ingredientImages}>
            {meal!.ingredients.map((ingredient, index) => (
              <li
                className={styles.listItem}
                key={`iim_${meal!.idMeal}_${index}`}
                title={ingredient.name}
              >
                <img
                  alt={ingredient.name}
                  src={`https://www.themealdb.com/images/ingredients/${ingredient.name}-Small.png`}
                />
              </li>
            ))}
          </ul>
          <h3>Instructions</h3>
          {meal!.instructions.length === 1 ? (
            <p>{meal!.instructions[0]}</p>
          ) : (
            <ol>
              {meal!.instructions.map((paragraph, index) => (
                <li
                  className={styles.listItem}
                  key={`ins_${meal!.idMeal}_${index}`}
                >
                  {paragraph}
                </li>
              ))}
            </ol>
          )}
        </>
      );

    case LoadingState.ERROR:
      return <div>{error!.message}</div>;

    case LoadingState.PENDING:
      return <div>Loading meal...</div>;
  }
};

export default Meal;
