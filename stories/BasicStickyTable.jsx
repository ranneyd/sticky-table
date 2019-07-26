import React, { useEffect, useMemo, useReducer } from "react";

import * as R from "ramda";

import { StickyTable } from "../src/StickyTable";

const ROW_MIN = 25;
const ROW_MAX = 100;
const COL_MIN = 50;
const COL_MAX = 300;

const makeCustomSizeFunc = (count, min, max) => {
  let sizes = [];
  for (let i = 0; i < count; ++i) {
    sizes.push(Math.floor(Math.random() * (max - min)) + min);
  }
  return i => sizes[i];
};

const reducer = (state, action) => {
  switch (action.type) {
    case "rowCount":
      return {
        ...state,
        rowCount: action.rowCount,
        rowFunc: makeCustomSizeFunc(action.rowCount, ROW_MIN, ROW_MAX)
      };
    case "colCount":
      return {
        ...state,
        colCount: action.colCount,
        colFunc: makeCustomSizeFunc(action.colCount, COL_MIN, COL_MAX)
      };
    default:
      return state;
  }
};

const BasicStickyTable = ({
  rowCount,
  colCount,
  width,
  height,
  colWidth,
  rowHeight,
  leftWidth,
  rightWidth,
  topHeight,
  bottomHeight,
  overscan,
  showTop,
  showRight,
  showBottom,
  showLeft,
  usingColFunc,
  usingRowFunc
}) => {
  const [state, dispatch] = useReducer(reducer, {
    rowCount,
    colCount,
    rowFunc: makeCustomSizeFunc(rowCount, ROW_MIN, ROW_MAX),
    colFunc: makeCustomSizeFunc(colCount, COL_MIN, COL_MAX)
  });
  const [ourRowCount, ourColCount, rowFunc, colFunc] = R.props(
    ["rowCount", "colCount", "rowFunc", "colFunc"],
    state
  );
  useEffect(() => {
    if (rowCount !== ourRowCount) {
      dispatch({ type: "rowCount", rowCount });
    }
  }, [rowCount, ourRowCount]);
  useEffect(() => {
    if (colCount !== ourColCount) {
      dispatch({ type: "colCount", colCount });
    }
  }, [colCount, ourColCount]);

  // const [usingColFunc, setUsingColFunc] = useState(false);
  // const [usingRowFunc, setUsingRowFunc] = useState(false);

  let [data, topData, rightData, bottomData, leftData] = useMemo(() => {
    let data = [];
    let topData, rightData, bottomData, leftData;
    if (showTop) {
      topData = [];
    }
    if (showRight) {
      rightData = [];
    }
    if (showBottom) {
      bottomData = [];
    }
    if (showLeft) {
      leftData = [];
    }
    for (let rowI = 0; rowI < ourRowCount; ++rowI) {
      let row = [];
      for (let colI = 0; colI < ourColCount; ++colI) {
        row.push(`row: ${rowI}, col ${colI}`);
      }
      data.push(row);
      if (showLeft) {
        leftData.push(rowI);
      }
      if (showRight) {
        rightData.push(ourRowCount - rowI - 1);
      }
    }
    for (let colI = 0; colI < ourColCount; ++colI) {
      if (showTop) {
        topData.push(colI);
      }
      if (showBottom) {
        bottomData.push(ourColCount - colI - 1);
      }
    }
    return [data, topData, rightData, bottomData, leftData];
  }, [showTop, showRight, showBottom, showLeft, ourRowCount, ourColCount]);

  return (
    <div style={{ padding: 50 }}>
      <StickyTable
        data={data}
        width={width}
        height={height}
        columnWidth={usingColFunc ? colFunc : colWidth}
        rowHeight={usingRowFunc ? rowFunc : rowHeight}
        leftWidth={leftWidth}
        rightWidth={rightWidth}
        topHeight={topHeight}
        bottomHeight={bottomHeight}
        topData={topData}
        rightData={rightData}
        bottomData={bottomData}
        leftData={leftData}
        overscan={overscan}
      />
    </div>
  );
};

export default BasicStickyTable;
