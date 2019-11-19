import { GlobalWithFetchMock, MockResponseInit } from "jest-fetch-mock";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Categories from "./Categories";

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetch = require("jest-fetch-mock");
const fetchMock = customGlobal.fetch;

jest.mock("./CategoryThumbnail");

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
  localStorage.clear();
});

it("shows loading message", async () => {
  const mockPromise = new Promise<MockResponseInit>(resolve => {});

  fetchMock.mockResponseOnce(() => mockPromise);

  await act(async () => {
    render(<Categories />, container);
  });

  expect(container!.innerHTML).toContain("Loading");
});

it("renders category", async () => {
  const fakeCategory = require("./__mocks__/fakeCategory.json");
  const fakeResponse = {
    categories: [fakeCategory]
  };
  fetchMock.mockResponseOnce(JSON.stringify(fakeResponse));

  await act(async () => {
    render(<Categories />, container);
  });

  const mockHTMLContent = container!.querySelector("code");

  if (mockHTMLContent) {
    const renderedCategory = JSON.parse(mockHTMLContent.innerHTML);
    expect(renderedCategory).toMatchObject(fakeCategory);
  } else {
    fail(
      `The mocked <CategoryThumbnail> has no <code> element that should contain the serialized JSON for the category! Container: ${
        container!.innerHTML
      }`
    );
  }
});

it("shows error message on fetch error", async () => {
  fetchMock.mockRejectOnce(new Error("Fetch error"));

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<Categories />, container);
  });

  expect(container!.innerHTML).toContain("ERROR");
});

it("caches categories", async () => {
  const fakeCategory = require("./__mocks__/fakeCategory.json");
  const fakeResponse = {
    categories: [fakeCategory]
  };
  fetchMock.mockResponseOnce(JSON.stringify(fakeResponse));

  await act(async () => {
    render(<Categories />, container);
  });

  // For testing re-fetch we need a new container, otherwise
  // ReactDOM wouldn't re-render as the component output is the same
  const otherContainer = document.createElement("div");
  document.body.appendChild(otherContainer);

  // shouldn't re-fetch on second render but use the cached value
  await act(async () => {
    render(<Categories />, otherContainer);
  });

  expect(fetchMock.mock.calls.length).toEqual(1);

  unmountComponentAtNode(otherContainer);
  otherContainer.remove();
});
