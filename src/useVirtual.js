import { useMemo, useState, useRef, useEffect } from "react";

// https://github.com/bvaughn/react-window/blob/master/src/VariableSizeGrid.js See "findNearestItemBinarySearch". This
// is a binary search to find the index of the position to the left (or right) of an element at a given position. In
// other words, if we're scrolled to x, we need to know which element is the first to end after that position (that's
// our minimum).
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
  // This is a straight "if we've seen this scroll position before, use it" memo table. Since scroll positions are at
  // the pixel level, it seems unlikely we'd have a lot of hits. But if we do, they're stored here!
  const granularMemo = useRef({
    rows: {},
    cols: {}
  });

  // We compute ahead of time the sizes and positions of all our elements. It's a big up-front cost, but we can't risk
  // having to do it on-the-fly as they're scrolling.
  const [colSizes, colPositions] = useMemo(() => {
    // If any sizes or positions change, our granular memo table is invalidated
    granularMemo.current.cols = {};

    let isFunc = typeof columnWidth === "function";
    // First element is at position 0
    const positions = [0];
    const sizes = [isFunc ? columnWidth(0) : columnWidth];

    let last = 0;
    for (let i = 1; i < columnCount; ++i) {
      // The position is the previous position plus the size of the last element.
      let point = last + sizes[i - 1];
      positions.push(point);
      last = point;
      sizes.push(isFunc ? columnWidth(i) : columnWidth);
    }

    return [sizes, positions];
  }, [columnCount, columnWidth]);

  // Same as columns but rows
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

  // If the overscan value changes, we don't need to recompute all the sizes/positions, but it still invalidates the
  // granular memo table.
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
