import { Meal } from "../api/theMealDb";

export interface Ingredient {
  measure: string;
  name: string;
  [key: string]: any;
}

export interface NormalizedMeal {
  idMeal: number;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  instructions: string[];
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  ingredients: Ingredient[];
  strSource: string | null;
  dateModified: string | null;
  [key: string]: any;
}

export const normalizeMeal = (meal: Meal): NormalizedMeal => {
  const {
    idMeal,
    strMeal,
    strDrinkAlternate,
    strCategory,
    strArea,
    strMealThumb,
    strTags,
    strYoutube,
    strSource,
    dateModified
  } = meal;
  const instructions = meal.strInstructions.split("\r\n");
  const ingredients: Ingredient[] = [];

  for (let i = 1; i < 20; i++) {
    const measure: string = meal[`strMeasure${i}`];
    const name: string = meal[`strIngredient${i}`];

    if (measure && name) {
      ingredients.push({
        measure,
        name
      });
    }
  }

  return {
    idMeal,
    strMeal,
    strDrinkAlternate,
    strCategory,
    strArea,
    instructions,
    strMealThumb,
    strTags,
    strYoutube,
    ingredients,
    strSource,
    dateModified
  };
};
