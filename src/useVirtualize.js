import { useMemo, useState, useRef } from "react";

// Mostly stolen from https://github.com/bvaughn/react-window

export default ({
  overscan,
  columnCount,
  columnWidth,
  width,
  rowCount,
  rowHeight,
  height
}) => {
  const memo = useRef({
    cols: {},
    rows: {}
  });
  const [widthCount, heightCount] = useMemo(
    () => [Math.ceil(width / columnWidth), Math.ceil(height / rowHeight)],
    [width, columnWidth, height, rowHeight]
  );
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  let leftCount = Math.trunc(left / columnWidth);
  let topCount = Math.trunc(top / rowHeight);
  let colKey = `${leftCount};${columnCount}`;
  let cols;
  if (memo.current.cols[colKey]) {
    cols = memo.current.cols[colKey];
  } else {
    cols = {
      min: Math.max(0, leftCount - overscan),
      max: Math.min(columnCount, leftCount + widthCount + overscan)
    };
    memo.current.cols[colKey] = cols;
  }
  let rowKey = `${topCount};${rowCount}`;

  let rows;
  if (memo.current.rows[rowKey]) {
    rows = memo.current.rows[rowKey];
  } else {
    rows = {
      min: Math.max(0, topCount - overscan),
      max: Math.min(rowCount, topCount + heightCount + overscan)
    };
    memo.current.rows[rowKey] = rows;
  }
  return [
    {
      cols,
      rows
    },
    setLeft,
    setTop
  ];
};
