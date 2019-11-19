import { GlobalWithFetchMock, MockResponseInit } from "jest-fetch-mock";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MealExcerpt } from "../api/theMealDb";
import Category from "./Category";

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetch = require("jest-fetch-mock");
const fetchMock = customGlobal.fetch;

jest.mock("./Thumbnail");

let mockCategoryName: string | undefined = "categoryName";
jest.mock("react-router", () => ({
  useParams() {
    return { categoryName: mockCategoryName };
  }
}));

let container: HTMLElement | null = null;
beforeEach(() => {
  fetchMock.resetMocks();
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
  const mockPromise = new Promise<MockResponseInit>(resolve => {});

  fetchMock.mockResponseOnce(() => mockPromise);

  await act(async () => {
    render(<Category />, container);
  });

  expect(container!.innerHTML).toContain("Loading");
});

it("renders meals", async () => {
  const fakeMeals: MealExcerpt[] = require("./__mocks__/meals.json");
  const fakeResponse = {
    meals: fakeMeals
  };
  fetchMock.mockResponseOnce(JSON.stringify(fakeResponse));

  await act(async () => {
    render(<Category />, container);
  });

  const mealListItems = container!.querySelectorAll("li");
  expect(mealListItems.length).toEqual(fakeMeals.length);
});

it("shows error message on fetch error", async () => {
  fetchMock.mockRejectOnce(new Error("Fetch error"));

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<Category />, container);
  });

  expect(container!.innerHTML).toContain("ERROR");
});

it("doesn't crash if route param is not resolved yet", async () => {
  const fakeMeals: MealExcerpt[] = require("./__mocks__/meals.json");
  const fakeResponse = {
    meals: fakeMeals
  };
  fetchMock.mockResponseOnce(JSON.stringify(fakeResponse));

  mockCategoryName = undefined;
  await act(async () => {
    render(<Category />, container);
  });
});
