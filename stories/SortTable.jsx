import React, { useEffect, useMemo, useReducer } from "react";

import * as R from "ramda";

import { StickyTable } from "../src/StickyTable";
import useSortHeader from "../src/useSortHeader";

import * as kelpData from "./kelpData";

const SortTable = ({ width, height, data }) => {
  // TODO: data needs to go into a hook and come out sorted. The sorting hook needs to give us a sort param setter,
  // which has an index and a direction. It can keep that in its state and return that also. We also have a component
  // that uses that data to render a top bar with the little triangles and stuff. Custom sort function? Probably not
  // necessary, but an option. Hook can actually return a component renderer....and it can take a base renderer that we
  // wrap.
  return (
    <div style={{ padding: 50 }}>
      <StickyTable
        width={width}
        height={height}
        data={data}
        topData={topData}
      />
    </div>
  );
};

export default BasicStickyTable;
