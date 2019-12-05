import { shallow } from "enzyme";
import React from "react";
import { act } from "react-dom/test-utils";
import { Category } from "../api/theMealDb";
import Spinner from "../shared/Spinner";
import { LoadingState } from "../shared/useFetch";
import Categories from "./Categories";

let mockCategories: Category[];
let mockLoadingState: LoadingState;
let mockError: Error | undefined;

jest.mock("../api/theMealDb", () => ({
  useCategories() {
    return [mockCategories, mockLoadingState, mockError];
  }
}));

it("shows loading message", async () => {
  mockLoadingState = LoadingState.PENDING;
  let wrapper;

  await act(async () => {
    wrapper = shallow(<Categories />);
  });

  expect(wrapper).toContainReact(<Spinner />);
});

it("renders category", async () => {
  const mockCategory = require("./__mocks__/fakeCategory.json");
  mockCategories = [mockCategory];
  mockLoadingState = LoadingState.DONE;

  let wrapper;

  await act(async () => {
    wrapper = shallow(<Categories />);
  });

  expect(wrapper).toMatchSnapshot();
});

it("throws error on fetch error", () => {
  mockError = new Error("Fetch error");
  mockLoadingState = LoadingState.ERROR;
  const spy = jest.spyOn(console, "error").mockImplementationOnce(() => {});

  expect(() => shallow(<Categories />)).toThrowError(mockError);

  spy.mockRestore();
});
