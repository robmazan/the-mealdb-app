import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { StaticRouter } from "react-router";
import Thumbnail from "./Thumbnail";

it("renders without crashing", () => {
  const container = document.createElement("div");
  act(() => {
    render(
      <StaticRouter>
        <Thumbnail
          label="Label"
          imgAlt="Alt"
          imgSrc="https://example.com/img.jpg"
          to="/path/to"
          tooltip="tooltip"
        />
      </StaticRouter>,
      container
    );
  });
  expect(container.innerHTML).toMatchInlineSnapshot(
    `"<a class=\\"link\\" title=\\"tooltip\\" href=\\"/path/to\\"><img class=\\"thumb\\" src=\\"https://example.com/img.jpg\\" alt=\\"Alt\\">Label</a>"`
  );
  unmountComponentAtNode(container);
});
