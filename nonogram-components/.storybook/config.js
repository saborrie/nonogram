import { addParameters, addDecorator, configure } from "@storybook/react";
import { create } from "@storybook/theming";
import { withA11y } from "@storybook/addon-a11y";
import { withKnobs } from "@storybook/addon-knobs";
import { withInfo } from "@storybook/addon-info";

addDecorator(withInfo);
addDecorator(withKnobs);
addDecorator(withA11y);

addParameters({
  options: {
    theme: create({
      brandTitle: "Backslash Build Components",
      brandUrl: "https://backslash.build"
    })
  }
});

function loadStories() {
  const req = require.context("../src", true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
