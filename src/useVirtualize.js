import { useMemo, useState, useRef } from "react";

// https://github.com/bvaughn/react-window/blob/master/src/VariableSizeGrid.js
// See "findNearestItemBinarySearch"
const findNearestItem = (posIndexPairs, pos, left = true) => {
  let high = posIndexPairs.length;
  let low = 0;
  while (low <= high) {
    const middle = low + Math.floor((high - low) / 2);
    const currentOffset = posIndexPairs[middle];
    if (currentOffset === pos) {
      return middle;
    } else if (currentOffset < pos) {
      low = middle + 1;
    } else {
      high = middle - 1;
    }
  }
  if (low > 0) {
    return low - (left ? 1 : 0);
  } else {
    return 0;
  }
};

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
  const orderedKeys = useMemo(() => {
    const keys = {
      rows: [0],
      cols: [0]
    };

    let last = 0;
    for (let i = 1; i < rowCount; ++i) {
      let point =
        last + (typeof rowHeight === "function" ? rowHeight(i) : rowHeight);
      keys.rows.push(point);
      last = point;
    }

    last = 0;
    for (let i = 1; i < columnCount; ++i) {
      let point =
        last +
        (typeof columnWidth === "function" ? columnWidth(i) : columnWidth);
      keys.cols.push(point);
      last = point;
    }

    return keys;
  }, [columnCount, columnWidth, rowCount, rowHeight]);

  const granularMemo = useRef({
    rows: {},
    cols: {}
  });

  // // const [widthCount, heightCount] = useMemo(
  // //   () => [Math.ceil(width / columnWidth), Math.ceil(height / rowHeight)],
  // //   [width, columnWidth, height, rowHeight]
  // // );
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  let rows;
  let cols;

  if (granularMemo.current.rows[top]) {
    rows = granularMemo.current.rows[top];
  } else {
    rows = {
      min: Math.max(0, findNearestItem(orderedKeys.rows, top, true) - overscan),
      max: Math.min(
        rowCount - 1,
        findNearestItem(orderedKeys.rows, top + height, false) + overscan
      )
    };
    granularMemo.current.rows[top] = rows;
  }

  if (granularMemo.current.cols[left]) {
    cols = granularMemo.current.cols[left];
  } else {
    cols = {
      min: Math.max(
        0,
        findNearestItem(orderedKeys.cols, left, true) - overscan
      ),
      max: Math.min(
        rowCount - 1,
        findNearestItem(orderedKeys.cols, left + width, false) + overscan
      )
    };
    granularMemo.current.cols[left] = cols;
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
