import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Category } from "../api/theMealDb";
import { LoadingState } from "../shared/useFetch";
import Categories from "./Categories";

jest.mock("./Thumbnail");

let mockCategories: Category[];
let mockLoadingState: LoadingState;
let mockError: Error | undefined;

jest.mock("../api/theMealDb", () => ({
  useCategories() {
    return [mockCategories, mockLoadingState, mockError];
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
    render(<Categories />, container);
  });

  expect(container!.innerHTML).toContain("Loading");
});

it("renders category", async () => {
  const mockCategory = require("./__mocks__/fakeCategory.json");
  mockCategories = [mockCategory];
  mockLoadingState = LoadingState.DONE;

  await act(async () => {
    render(<Categories />, container);
  });

  const mockHTMLContent = container!.querySelector("code");

  if (mockHTMLContent) {
    const renderedCategory = JSON.parse(mockHTMLContent.innerHTML);
    expect(renderedCategory).toMatchObject({
      imgAlt: mockCategory.strCategory,
      imgSrc: mockCategory.strCategoryThumb,
      label: mockCategory.strCategory,
      to: `/category/${mockCategory.strCategory}`,
      tooltip: mockCategory.strCategoryDescription
    });
  } else {
    fail(
      `The mocked <CategoryThumbnail> has no <code> element that should contain the serialized JSON for the category thumbnail props! Container: ${
        container!.innerHTML
      }`
    );
  }
});

it("throws error on fetch error", () => {
  mockError = new Error("Fetch error");
  mockLoadingState = LoadingState.ERROR;
  const spy = jest.spyOn(console, "error").mockImplementationOnce(() => {});

  expect(() => render(<Categories />, container)).toThrowError(mockError);

  spy.mockRestore();
});
