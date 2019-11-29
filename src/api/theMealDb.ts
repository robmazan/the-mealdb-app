/* istanbul ignore file */
// Excluding this file from coverage report, as it only contains an API wrapper,
// without any additional logic,so testing it would be basically like testing fetch...
import useFetch from "../shared/useFetch";
import { useCallback } from "react";
import { normalizeMeal, NormalizedMeal } from "../shared/tools";

const API_KEY = process.env.REACT_APP_MEALDB_API_KEY || 1;

export interface Meal {
  idMeal: number;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strIngredient16: string | null;
  strIngredient17: string | null;
  strIngredient18: string | null;
  strIngredient19: string | null;
  strIngredient20: string | null;
  strMeasure1: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
  strMeasure9: string | null;
  strMeasure10: string | null;
  strMeasure11: string | null;
  strMeasure12: string | null;
  strMeasure13: string | null;
  strMeasure14: string | null;
  strMeasure15: string | null;
  strMeasure16: string | null;
  strMeasure17: string | null;
  strMeasure18: string | null;
  strMeasure19: string | null;
  strMeasure20: string | null;
  strSource: string | null;
  dateModified: string | null;
  [key: string]: any;
}

export interface MealExcerpt {
  idMeal: number;
  strMeal: string;
  strMealThumb: string;
  [key: string]: any;
}

export interface Category {
  idCategory: number;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
  [key: string]: any;
}

type MealExcerptsResponse = {
  meals: MealExcerpt[];
};

export const useMealExcerptsOfCategory = (categoryName: string) =>
  useFetch<MealExcerptsResponse, MealExcerpt[]>(
    `https://www.themealdb.com/api/json/v1/${API_KEY}/filter.php?c=${encodeURIComponent(
      categoryName
    )}`,
    useCallback(r => r.meals, [])
  );

type MealsResponse = {
  meals: Meal[];
};

export const useMeal = (id: number) =>
  useFetch<MealsResponse, NormalizedMeal>(
    `https://www.themealdb.com/api/json/v1/${API_KEY}/lookup.php?i=${encodeURIComponent(
      id
    )}`,
    useCallback(r => normalizeMeal(r.meals[0]), [])
  );

type CategoryResponse = {
  categories: Category[];
};

export const useCategories = () =>
  useFetch<CategoryResponse, Category[]>(
    `https://www.themealdb.com/api/json/v1/${API_KEY}/categories.php`,
    useCallback(r => r.categories, [])
  );
