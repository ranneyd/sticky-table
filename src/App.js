import React, { useState, useReducer } from "react";

import { StickyTable } from "./StickyTable";
import "./App.css";

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

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    rowCount: 200,
    colCount: 200,
    rowFunc: makeCustomSizeFunc(200, ROW_MIN, ROW_MAX),
    colFunc: makeCustomSizeFunc(200, COL_MIN, COL_MAX)
  });
  const [width, setWidth] = useState(700);
  const [height, setHeight] = useState(500);
  const [rowHeight, setRowHeight] = useState(50);
  const [colWidth, setColWidth] = useState(150);
  const [leftWidth, setLeftWidth] = useState(50);
  const [rightWidth, setRightWidth] = useState(50);
  const [topHeight, setTopHeight] = useState(50);
  const [bottomHeight, setBottomHeight] = useState(50);
  const [overscan, setOverscan] = useState(10);
  const [stickies, setStickies] = useState({
    top: true,
    right: true,
    bottom: true,
    left: true
  });

  const [usingColFunc, setUsingColFunc] = useState(false);
  const [usingRowFunc, setUsingRowFunc] = useState(false);

  let data = [];
  let topData, rightData, bottomData, leftData;

  if (stickies.top) {
    topData = [];
  }
  if (stickies.right) {
    rightData = [];
  }
  if (stickies.bottom) {
    bottomData = [];
  }
  if (stickies.left) {
    leftData = [];
  }

  for (let rowI = 0; rowI < state.rowCount; ++rowI) {
    let row = [];
    for (let colI = 0; colI < state.colCount; ++colI) {
      row.push(`row: ${rowI}, col ${colI}`);
    }
    data.push(row);
    if (stickies.left) {
      leftData.push(rowI);
    }
    if (stickies.right) {
      rightData.push(state.rowCount - rowI - 1);
    }
  }
  for (let colI = 0; colI < state.colCount; ++colI) {
    if (stickies.top) {
      topData.push(colI);
    }
    if (stickies.bottom) {
      bottomData.push(state.colCount - colI - 1);
    }
  }
  return (
    <div className="App">
      {[
        [
          "Row count",
          state.rowCount,
          rowCount => dispatch({ type: "rowCount", rowCount })
        ],
        [
          "Column count",
          state.colCount,
          colCount => dispatch({ type: "colCount", colCount })
        ],
        ["Width", width, setWidth],
        ["Height", height, setHeight],
        ["Column Width", colWidth, setColWidth],
        ["Row Height", rowHeight, setRowHeight],
        ["Left Width", leftWidth, setLeftWidth],
        ["Right Width", rightWidth, setRightWidth],
        ["Top Height", topHeight, setTopHeight],
        ["Bottom Height", bottomHeight, setBottomHeight],
        ["Overscan", overscan, setOverscan]
      ].map(args => (
        <div key={args[0]}>
          {args[0]}{" "}
          <input
            type="number"
            value={args[1]}
            onChange={e => args[2](parseInt(e.target.value || 0))}
          />
        </div>
      ))}
      <div>
        top:{" "}
        <input
          type="checkbox"
          checked={stickies.top}
          onChange={e => setStickies({ ...stickies, top: e.target.checked })}
        />
      </div>
      <div>
        right:{" "}
        <input
          type="checkbox"
          checked={stickies.right}
          onChange={e => setStickies({ ...stickies, right: e.target.checked })}
        />
      </div>
      <div>
        bottom:{" "}
        <input
          type="checkbox"
          checked={stickies.bottom}
          onChange={e => setStickies({ ...stickies, bottom: e.target.checked })}
        />
      </div>
      <div>
        left:{" "}
        <input
          type="checkbox"
          checked={stickies.left}
          onChange={e => setStickies({ ...stickies, left: e.target.checked })}
        />
      </div>
      <div>
        Column Width Function (overrides column width above):{" "}
        <input
          type="checkbox"
          checked={usingColFunc}
          onChange={() => setUsingColFunc(!usingColFunc)}
        />
      </div>
      <div>
        Row Height Function (overrides row height above):{" "}
        <input
          type="checkbox"
          checked={usingRowFunc}
          onChange={() => setUsingRowFunc(!usingRowFunc)}
        />
      </div>
      <div className="grid">
        <StickyTable
          data={data}
          width={width}
          height={height}
          columnWidth={usingColFunc ? state.colFunc : colWidth}
          rowHeight={usingRowFunc ? state.rowFunc : rowHeight}
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
    </div>
  );
};

export default App;
