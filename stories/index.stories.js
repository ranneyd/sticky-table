import React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, boolean, number } from "@storybook/addon-knobs";

import BasicStickyTable from "./BasicStickyTable";
import SortTable from "./SortTable";

import "../src/index.css";

const stickyStories = storiesOf("StickyTable", module);

stickyStories.addDecorator(withKnobs);

stickyStories.add("Basic", () => (
  <BasicStickyTable
    rowCount={number("Row Count", 200)}
    colCount={number("Column Count", 200)}
    width={number("Width", 900)}
    height={number("Height", 400)}
    colWidth={number("Column Width", 150)}
    rowHeight={number("Row Height", 50)}
    topHeight={number("Top Height", 50)}
    rightWidth={number("Right Width", 50)}
    bottomHeight={number("Bottom Height", 50)}
    leftWidth={number("Left Width", 50)}
    overscan={number("Overscan", 10)}
    showTop={boolean("Use Top Header", true)}
    showRight={boolean("Use Right Header", true)}
    showBottom={boolean("Use Bottom Header", true)}
    showLeft={boolean("Use Left Header", true)}
    usingColFunc={boolean(
      'Use Dynamic Column Widths (overrides "Column Width" above)',
      false
    )}
    usingRowFunc={boolean(
      'Use Dynamic Row Heights (overrides "Row Height" above)',
      false
    )}
  />
));
stickyStories.add("Sort", () => (
  <BasicStickyTable
    rowCount={number("Row Count", 200)}
    colCount={number("Column Count", 200)}
    width={number("Width", 900)}
    height={number("Height", 400)}
    colWidth={number("Column Width", 150)}
    rowHeight={number("Row Height", 50)}
    topHeight={number("Top Height", 50)}
    rightWidth={number("Right Width", 50)}
    bottomHeight={number("Bottom Height", 50)}
    leftWidth={number("Left Width", 50)}
    overscan={number("Overscan", 10)}
    showTop={boolean("Use Top Header", true)}
    showRight={boolean("Use Right Header", true)}
    showBottom={boolean("Use Bottom Header", true)}
    showLeft={boolean("Use Left Header", true)}
    usingColFunc={boolean(
      'Use Dynamic Column Widths (overrides "Column Width" above)',
      false
    )}
    usingRowFunc={boolean(
      'Use Dynamic Row Heights (overrides "Row Height" above)',
      false
    )}
  />
));
