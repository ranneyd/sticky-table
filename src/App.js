import React, { useState } from "react";

import { SyncedTable } from "./SyncedTable";
import "./App.css";

const App = () => {
  const [rowCount, setRowCount] = useState(100);
  const [colCount, setColCount] = useState(100);
  const [width, setWidth] = useState(700);
  const [height, setHeight] = useState(500);
  const [stickies, setStickies] = useState({
    top: true,
    right: true,
    bottom: true,
    left: true
  });

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

  for (let rowI = 0; rowI < rowCount; ++rowI) {
    let row = [];
    for (let colI = 0; colI < colCount; ++colI) {
      row.push(`row: ${rowI}, col" ${colI}`);
    }
    data.push(row);
    if (stickies.left) {
      leftData.push(rowI);
    }
    if (stickies.right) {
      rightData.push(rowCount - rowI - 1);
    }
  }
  for (let colI = 0; colI < colCount; ++colI) {
    if (stickies.top) {
      topData.push(colI);
    }
    if (stickies.bottom) {
      bottomData.push(colCount - colI - 1);
    }
  }
  return (
    <div className="App">
      <div>
        Row count:{" "}
        <input
          type="number"
          value={rowCount}
          onChange={e => setRowCount(parseInt(e.target.value || 0))}
        />
      </div>
      <div>
        Column count:{" "}
        <input
          type="number"
          value={colCount}
          onChange={e => setColCount(parseInt(e.target.value || 0))}
        />
      </div>
      <div>
        Width:{" "}
        <input
          type="number"
          value={width}
          onChange={e => setWidth(parseInt(e.target.value || 0))}
        />
      </div>
      <div>
        Height:{" "}
        <input
          type="number"
          value={height}
          onChange={e => setHeight(parseInt(e.target.value || 0))}
        />
      </div>
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
      <div className="grid">
        <SyncedTable
          data={data}
          width={width}
          height={height}
          columnWidth={150}
          topData={topData}
          rightData={rightData}
          bottomData={bottomData}
          leftData={leftData}
        />
      </div>
    </div>
  );
};

export default App;
