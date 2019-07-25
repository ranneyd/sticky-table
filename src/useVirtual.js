import { useMemo, useState, useRef, useEffect } from "react";

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
  const granularMemo = useRef({
    rows: {},
    cols: {}
  });
  const [colSizes, colPositions] = useMemo(() => {
    granularMemo.current.cols = {};

    let isFunc = typeof columnWidth === "function";
    const positions = [0];
    const sizes = [isFunc ? columnWidth(0) : columnWidth];

    // let last = 0;
    // for (let i = 1; i < rowCount; ++i) {
    //   let point =
    //     last + (typeof rowHeight === "function" ? rowHeight(i) : rowHeight);
    //   keys.rows.push(point);
    //   last = point;
    // }

    let last = 0;
    for (let i = 1; i < columnCount; ++i) {
      let point = last + sizes[i - 1];
      positions.push(point);
      last = point;
      sizes.push(isFunc ? columnWidth(i) : columnWidth);
    }

    return [sizes, positions];
  }, [columnCount, columnWidth]);

  const [rowSizes, rowPositions] = useMemo(() => {
    granularMemo.current.rows = {};
    let isFunc = typeof rowHeight === "function";
    const positions = [0];
    const sizes = [isFunc ? rowHeight(0) : rowHeight];

    let last = 0;
    for (let i = 1; i < rowCount; ++i) {
      let point = last + sizes[i - 1];
      positions.push(point);
      last = point;
      sizes.push(isFunc ? rowHeight(i) : rowHeight);
    }

    return [sizes, positions];
  }, [rowCount, rowHeight]);

  useEffect(() => {
    granularMemo.current = {
      rows: {},
      cols: {}
    };
  }, [overscan]);

  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  let rows;
  let cols;

  if (granularMemo.current.rows[top]) {
    rows = granularMemo.current.rows[top];
  } else {
    rows = {
      min: Math.max(0, findNearestItem(rowPositions, top, true) - overscan),
      max: Math.min(
        rowCount - 1,
        findNearestItem(rowPositions, top + height, false) + overscan
      )
    };
    granularMemo.current.rows[top] = rows;
  }

  if (granularMemo.current.cols[left]) {
    cols = granularMemo.current.cols[left];
  } else {
    cols = {
      min: Math.max(0, findNearestItem(colPositions, left, true) - overscan),
      max: Math.min(
        columnCount - 1,
        findNearestItem(colPositions, left + width, false) + overscan
      )
    };
    granularMemo.current.cols[left] = cols;
  }

  return [
    {
      rows: {
        visible: rows,
        sizes: rowSizes,
        positions: rowPositions
      },
      cols: {
        visible: cols,
        sizes: colSizes,
        positions: colPositions
      }
    },
    setLeft,
    setTop
  ];
};
