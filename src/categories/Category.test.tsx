import { shallow } from "enzyme";
import React from "react";
import { act } from "react-dom/test-utils";
import { MealExcerpt } from "../api/theMealDb";
import Spinner from "../shared/Spinner";
import { LoadingState } from "../shared/useFetch";
import Category from "./Category";

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

it("shows loading message", async () => {
  mockLoadingState = LoadingState.PENDING;

  let wrapper;

  await act(async () => {
    wrapper = shallow(<Category />);
  });

  expect(wrapper).toContainReact(<Spinner />);
});

it("renders meals", async () => {
  mockMeals = require("./__mocks__/meals.json");
  mockLoadingState = LoadingState.DONE;

  let wrapper;

  await act(async () => {
    wrapper = shallow(<Category />);
  });

  expect(wrapper).toMatchSnapshot();
});

it("throws error on fetch error", () => {
  mockError = new Error("Fetch error");
  mockLoadingState = LoadingState.ERROR;
  const spy = jest.spyOn(console, "error").mockImplementationOnce(() => {});

  expect(() => shallow(<Category />)).toThrowError(mockError);

  spy.mockRestore();
});
