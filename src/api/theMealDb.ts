/* istanbul ignore file */
// Excluding this file from coverage report, as it only contains an API wrapper,
// without any additional logic,so testing it would be basically like testing fetch...
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

export const searchByName = (
  name: string,
  signal?: AbortSignal
): Promise<Meal[]> =>
  fetch(
    `https://www.themealdb.com/api/json/v1/${API_KEY}/search.php?s=${encodeURIComponent(
      name
    )}`,
    {
      ...(signal ? { signal } : {})
    }
  )
    .then(res => res.json())
    .then(res => res.meals);

export const searchByFirstLetter = (
  firstLetter: string,
  signal?: AbortSignal
): Promise<Meal[]> =>
  fetch(
    `https://www.themealdb.com/api/json/v1/${API_KEY}/search.php?f=${encodeURIComponent(
      firstLetter
    )}`,
    {
      ...(signal ? { signal } : {})
    }
  )
    .then(res => res.json())
    .then(res => res.meals);

export const searchByCategoryName = (
  categoryName: string,
  signal?: AbortSignal
): Promise<MealExcerpt[]> =>
  fetch(
    `https://www.themealdb.com/api/json/v1/${API_KEY}/filter.php?c=${encodeURIComponent(
      categoryName
    )}`,
    {
      ...(signal ? { signal } : {})
    }
  )
    .then(res => res.json())
    .then(res => res.meals);

export const findById = (id: number, signal?: AbortSignal): Promise<Meal> =>
  fetch(
    `https://www.themealdb.com/api/json/v1/${API_KEY}/lookup.php?i=${encodeURIComponent(
      id
    )}`,
    {
      ...(signal ? { signal } : {})
    }
  )
    .then(res => res.json())
    .then(res => res.meals[0]);

export const fetchRandom = (signal?: AbortSignal): Promise<Meal> =>
  fetch(`https://www.themealdb.com/api/json/v1/${API_KEY}/random.php`, {
    ...(signal ? { signal } : {})
  })
    .then(res => res.json())
    .then(res => res.meals[0]);

export const fetchCategories = (signal?: AbortSignal): Promise<Category[]> =>
  fetch(`https://www.themealdb.com/api/json/v1/${API_KEY}/categories.php`, {
    ...(signal ? { signal } : {})
  })
    .then(res => res.json())
    .then(res => res.categories);
