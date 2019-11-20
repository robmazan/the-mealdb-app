import { GlobalWithFetchMock } from "jest-fetch-mock";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import * as api from "../api/theMealDb";
import Meal from "./Meal";

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetch = require("jest-fetch-mock");
const fetchMock = customGlobal.fetch;

let mockMealId: string | undefined;
jest.mock("react-router", () => ({
  useParams() {
    return { mealId: mockMealId };
  }
}));

jest.mock("react-router-dom", () => ({
  Link: jest
    .fn()
    .mockImplementation(props => <code>{JSON.stringify(props)}</code>)
}));

let container: HTMLElement | null = null;
beforeEach(() => {
  fetchMock.resetMocks();
  mockMealId = "42";
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  if (container) {
    unmountComponentAtNode(container);
  }
  container!.remove();
  container = null;
});

it("renders the meal details properly", async () => {
  const fakeResponse: api.Meal = require("./__mocks__/mealDetails.json");
  fetchMock.mockResponseOnce(JSON.stringify(fakeResponse));

  await act(async () => {
    render(<Meal />, container);
  });

  expect(container!.innerHTML).toMatchInlineSnapshot(
    `"<code>{\\"className\\":\\"backLink\\",\\"to\\":\\"/category/Chicken\\",\\"children\\":\\"Back to category\\"}</code><h2 class=\\"pageTitle\\">Teriyaki Chicken Casserole</h2><div class=\\"card\\"><img class=\\"photo\\" src=\\"https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg\\" alt=\\"Teriyaki Chicken Casserole\\"></div><h3>Ingredients</h3><ul class=\\"ingredientList\\"><li class=\\"listItem\\">3/4 cup&nbsp;soy sauce</li><li class=\\"listItem\\">1/2 cup&nbsp;water</li><li class=\\"listItem\\">1/4 cup&nbsp;brown sugar</li><li class=\\"listItem\\">1/2 teaspoon&nbsp;ground ginger</li><li class=\\"listItem\\">1/2 teaspoon&nbsp;minced garlic</li><li class=\\"listItem\\">4 Tablespoons&nbsp;cornstarch</li><li class=\\"listItem\\">2&nbsp;chicken breasts</li><li class=\\"listItem\\">1 (12 oz.)&nbsp;stir-fry vegetables</li><li class=\\"listItem\\">3 cups&nbsp;brown rice</li></ul><ul class=\\"ingredientImages\\"><li class=\\"listItem\\" title=\\"soy sauce\\"><img alt=\\"soy sauce\\" src=\\"https://www.themealdb.com/images/ingredients/soy sauce-Small.png\\"></li><li class=\\"listItem\\" title=\\"water\\"><img alt=\\"water\\" src=\\"https://www.themealdb.com/images/ingredients/water-Small.png\\"></li><li class=\\"listItem\\" title=\\"brown sugar\\"><img alt=\\"brown sugar\\" src=\\"https://www.themealdb.com/images/ingredients/brown sugar-Small.png\\"></li><li class=\\"listItem\\" title=\\"ground ginger\\"><img alt=\\"ground ginger\\" src=\\"https://www.themealdb.com/images/ingredients/ground ginger-Small.png\\"></li><li class=\\"listItem\\" title=\\"minced garlic\\"><img alt=\\"minced garlic\\" src=\\"https://www.themealdb.com/images/ingredients/minced garlic-Small.png\\"></li><li class=\\"listItem\\" title=\\"cornstarch\\"><img alt=\\"cornstarch\\" src=\\"https://www.themealdb.com/images/ingredients/cornstarch-Small.png\\"></li><li class=\\"listItem\\" title=\\"chicken breasts\\"><img alt=\\"chicken breasts\\" src=\\"https://www.themealdb.com/images/ingredients/chicken breasts-Small.png\\"></li><li class=\\"listItem\\" title=\\"stir-fry vegetables\\"><img alt=\\"stir-fry vegetables\\" src=\\"https://www.themealdb.com/images/ingredients/stir-fry vegetables-Small.png\\"></li><li class=\\"listItem\\" title=\\"brown rice\\"><img alt=\\"brown rice\\" src=\\"https://www.themealdb.com/images/ingredients/brown rice-Small.png\\"></li></ul><h3>Instructions</h3><ol><li class=\\"listItem\\">Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray.</li><li class=\\"listItem\\">Combine soy sauce, ½ cup water, brown sugar, ginger and garlic in a small saucepan and cover. Bring to a boil over medium heat. Remove lid and cook for one minute once boiling.</li><li class=\\"listItem\\">Meanwhile, stir together the corn starch and 2 tablespoons of water in a separate dish until smooth. Once sauce is boiling, add mixture to the saucepan and stir to combine. Cook until the sauce starts to thicken then remove from heat.</li><li class=\\"listItem\\">Place the chicken breasts in the prepared pan. Pour one cup of the sauce over top of chicken. Place chicken in oven and bake 35 minutes or until cooked through. Remove from oven and shred chicken in the dish using two forks.</li><li class=\\"listItem\\">*Meanwhile, steam or cook the vegetables according to package directions.</li><li class=\\"listItem\\">Add the cooked vegetables and rice to the casserole dish with the chicken. Add most of the remaining sauce, reserving a bit to drizzle over the top when serving. Gently toss everything together in the casserole dish until combined. Return to oven and cook 15 minutes. Remove from oven and let stand 5 minutes before serving. Drizzle each serving with remaining sauce. Enjoy!</li></ol>"`
  );
});

it("renders loading message while meal is not loaded", async () => {
  mockMealId = undefined;

  await act(async () => {
    render(<Meal />, container);
  });

  expect(container!.innerHTML).toContain("Loading");
});
