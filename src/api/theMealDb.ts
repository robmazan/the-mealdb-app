const API_KEY = process.env.REACT_APP_MEALDB_API_KEY || 1;

export interface Meal {
  idMeal: number;
  strMeal: string;
  strDrinkAlternate: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
  dateModified: string;
}

export interface Category {
  idCategory: number;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export const searchByName = (name: string): Promise<Meal[]> =>
  fetch(
    `https://www.themealdb.com/api/json/v1/${API_KEY}/search.php?s=${encodeURIComponent(
      name
    )}`
  )
    .then(res => res.json())
    .then(res => res.meals);

export const searchByFirstLetter = (firstLetter: string): Promise<Meal[]> =>
  fetch(
    `https://www.themealdb.com/api/json/v1/${API_KEY}/search.php?f=${encodeURIComponent(
      firstLetter
    )}`
  )
    .then(res => res.json())
    .then(res => res.meals);

export const findById = (id: number): Promise<Meal> =>
  fetch(
    `https://www.themealdb.com/api/json/v1/${API_KEY}/lookup.php?i=${encodeURIComponent(
      id
    )}`
  )
    .then(res => res.json())
    .then(res => res.meals[0]);

export const fetchRandom = (): Promise<Meal> =>
  fetch(`https://www.themealdb.com/api/json/v1/${API_KEY}/random.php`)
    .then(res => res.json())
    .then(res => res.meals[0]);

export const fetchCategories = (): Promise<Category[]> =>
  fetch(`https://www.themealdb.com/api/json/v1/${API_KEY}/categories.php`)
    .then(res => res.json())
    .then(res => res.categories);
