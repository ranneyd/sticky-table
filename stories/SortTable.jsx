import React from "react";

import { StickyTable, basicRenderer } from "../src/StickyTable";
import useSortHeader from "../src/useSortHeader";

import { HEADERS, RAW_DATA } from "./data";

const SortTable = ({ width, height, usingCustomRenderer }) => {
  let args = {
    data: RAW_DATA,
    topData: HEADERS
  };
  if (usingCustomRenderer) {
    args.renderer = ({ data, classes, style }) =>
      basicRenderer({
        data,
        classes,
        style: {
          ...style,
          fontSize: "12px",
          fontWeight: "bold",
          padding: "2px",
          textAlign: "center"
        }
      });
  }
  const [sortedData, headerRenderer] = useSortHeader(args);
  return (
    <div style={{ padding: 50 }}>
      <StickyTable
        width={width}
        height={height}
        data={sortedData}
        topData={HEADERS}
        topRenderer={headerRenderer}
      />
    </div>
  );
};

export default SortTable;
