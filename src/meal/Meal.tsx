import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { findById } from "../api/theMealDb";
import { NormalizedMeal, normalizeMeal } from "../shared/tools";
import styles from "./Meal.module.scss";
import { Link } from "react-router-dom";

const Meal: React.FC = () => {
  const { mealId } = useParams();
  const [meal, setMeal] = useState<NormalizedMeal>();

  useEffect(() => {
    const fetchMeal = async () => {
      if (mealId) {
        const res = await findById(Number.parseInt(mealId));
        setMeal(normalizeMeal(res));
      }
    };
    fetchMeal();
  }, [mealId]);

  if (meal) {
    return (
      <>
        <Link className={styles.backLink} to={`/category/${meal.strCategory}`}>
          Back to category
        </Link>
        <h2 className={styles.pageTitle}>{meal.strMeal}</h2>
        <div className={styles.card}>
          <img
            className={styles.photo}
            src={meal.strMealThumb}
            alt={meal.strMeal}
          />
        </div>
        <h3>Ingredients</h3>
        <ul className={styles.ingredientList}>
          {meal.ingredients.map((ingredient, index) => (
            <li className={styles.listItem} key={`ing_${meal.idMeal}_${index}`}>
              {ingredient.measure}&nbsp;{ingredient.name}
            </li>
          ))}
        </ul>
        <ul className={styles.ingredientImages}>
          {meal.ingredients.map((ingredient, index) => (
            <li
              className={styles.listItem}
              key={`iim_${meal.idMeal}_${index}`}
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
        {meal.instructions.length === 1 ? (
          <p>{meal.instructions[0]}</p>
        ) : (
          <ol>
            {meal.instructions.map((paragraph, index) => (
              <li
                className={styles.listItem}
                key={`ins_${meal.idMeal}_${index}`}
              >
                {paragraph}
              </li>
            ))}
          </ol>
        )}
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Meal;
