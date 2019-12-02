import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MealExcerpt } from "../api/theMealDb";
import { LoadingState } from "../shared/useFetch";
import Category from "./Category";

jest.mock("./Thumbnail");

let mockCategoryName: string | undefined = "categoryName";
jest.mock("react-router", () => ({
  useParams() {
    return { categoryName: mockCategoryName };
  }
}));

let mockMeals: MealExcerpt[];
let mockLoadingState: LoadingState;
let mockError: Error | null;

jest.mock("../api/theMealDb", () => ({
  useMealExcerptsOfCategory(categoryName: string) {
    return [mockMeals, mockLoadingState, mockError];
  }
}));

let container: HTMLElement | null = null;
beforeEach(() => {
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

it("shows loading message", async () => {
  mockLoadingState = LoadingState.PENDING;

  await act(async () => {
    render(<Category />, container);
  });

  expect(container!.innerHTML).toContain("Loading");
});

it("renders meals", async () => {
  mockMeals = require("./__mocks__/meals.json");
  mockLoadingState = LoadingState.DONE;

  await act(async () => {
    render(<Category />, container);
  });

  const mealListItems = container!.querySelectorAll("li");
  expect(mealListItems.length).toEqual(mockMeals.length);
});

it("throws error on fetch error", () => {
  mockError = new Error("Fetch error");
  mockLoadingState = LoadingState.ERROR;
  const spy = jest.spyOn(console, "error").mockImplementationOnce(() => {});

  expect(() => render(<Category />, container)).toThrowError(mockError);

  spy.mockRestore();
});
