import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Categories from "./Categories";
import { Category } from "../api/theMealDb";

jest.mock("./CategoryThumbnail");

let container: HTMLElement = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  localStorage.clear();
});

it("renders categories", async () => {
  const fakeCategory: Category = {
    idCategory: 1,
    strCategory: "Mock category",
    strCategoryDescription: "Mock description",
    strCategoryThumb: "https://example.com/thumb.jpg"
  };
  const fakeResponse = {
    categories: [fakeCategory]
  };
  let mockResolve;

  const mockPromise = new Promise(resolve => {
    mockResolve = resolve;
  });

  jest.spyOn(global, "fetch").mockImplementation(() => mockPromise);

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<Categories />, container);
  });

  expect(container.innerHTML).toContain("Loading");

  await act(async () => {
    mockResolve({
      json: () => Promise.resolve(fakeResponse)
    });
  });

  const renderedCategory = JSON.parse(
    container.querySelector("code").innerHTML
  );
  expect(renderedCategory).toMatchObject(fakeCategory);

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});

it("shows error message on fetch error", async () => {
  jest
    .spyOn(global, "fetch")
    .mockImplementation(() => Promise.reject(new Error("Fetch error")));

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<Categories />, container);
  });

  expect(container.innerHTML).toContain("ERROR");

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});
