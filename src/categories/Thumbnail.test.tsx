import { shallow } from "enzyme";
import React from "react";
import Thumbnail from "./Thumbnail";

it("renders without crashing", () => {
  const wrapper = shallow(
    <Thumbnail
      label="Label"
      imgAlt="Alt"
      imgSrc="https://example.com/img.jpg"
      to="/path/to"
      tooltip="tooltip"
      imgWidth={100}
      imgHeight={100}
    />
  );
  expect(wrapper).toMatchSnapshot();
});

it("renders without crashing whithout optional props", () => {
  const wrapper = shallow(
    <Thumbnail
      label="Label"
      imgAlt="Alt"
      imgSrc="https://example.com/img.jpg"
      to="/path/to"
    />
  );
  expect(wrapper).toMatchSnapshot();
});
