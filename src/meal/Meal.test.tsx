import { shallow } from "enzyme";
import React from "react";
import { act } from "react-dom/test-utils";
import Spinner from "../shared/Spinner";
import { NormalizedMeal, normalizeMeal } from "../shared/tools";
import { LoadingState } from "../shared/useFetch";
import Meal from "./Meal";

let mockMealIdParam = "42";
jest.mock("react-router", () => ({
  useParams() {
    return { mealId: mockMealIdParam };
  }
}));

let mockMeal: NormalizedMeal = normalizeMeal(
  require("./__mocks__/mealDetails.json").meals[0]
);
let mockLoadingState: LoadingState;
let mockError: Error | null = null;

jest.mock("../api/theMealDb", () => ({
  useMeal(mealId: number) {
    return [mockMeal, mockLoadingState, mockError];
  }
}));

it("renders the meal details properly", async () => {
  mockLoadingState = LoadingState.DONE;

  let wrapper;

  await act(async () => {
    wrapper = shallow(<Meal />);
  });

  expect(wrapper).toMatchSnapshot();
});

it("renders loading message while meal is not loaded", async () => {
  mockLoadingState = LoadingState.PENDING;

  let wrapper;

  await act(async () => {
    wrapper = shallow(<Meal />);
  });

  expect(wrapper).toContainReact(<Spinner />);
});

it("throws error on fetch error", () => {
  mockError = new Error("Fetch error");
  mockLoadingState = LoadingState.ERROR;
  const spy = jest.spyOn(console, "error").mockImplementationOnce(() => {});

  expect(() => shallow(<Meal />)).toThrowError(mockError);

  spy.mockRestore();
});
