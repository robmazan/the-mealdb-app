import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import CategoryThumbnail from "./CategoryThumbnail";
import { act } from "react-dom/test-utils";
import pretty from "pretty";
import { StaticRouter } from "react-router";
import { Category } from "../api/theMealDb";

const fakeCategory: Category = {
  idCategory: 1,
  strCategory: "Mock category",
  strCategoryDescription: "Mock description",
  strCategoryThumb: "https://example.com/thumb.jpg"
};

it("renders without crashing", () => {
  const container = document.createElement("div");
  act(() => {
    render(
      <StaticRouter>
        <CategoryThumbnail category={fakeCategory} />
      </StaticRouter>,
      container
    );
  });
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
    `"<a class=\\"link\\" title=\\"Mock description\\" href=\\"/category/1\\"><img class=\\"thumb\\" src=\\"https://example.com/thumb.jpg\\" alt=\\"Thumbnail for Mock category\\">Mock category</a>"`
  );
  unmountComponentAtNode(container);
});
