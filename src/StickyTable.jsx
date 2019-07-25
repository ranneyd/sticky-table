import React, { useMemo, useRef } from "react";

import * as R from "ramda";

import useScrollbarSizes from "./useScrollbarSizes";
import useVirtualize from "./useVirtualize";

import "./StickyTable.scss";

const DEFAULT_WIDTH = 100;
const DEFAULT_HEIGHT = 50;

// Basically a rehash of https://github.com/bvaughn/react-window with position: sticky

const basicRenderer = ({ data, style, classes }) => (
  <div style={style} className={classes.join(" ")}>
    {data}
  </div>
);

const allButDataEqual = (prev, next) => {
  if (prev.data !== next.data) {
    return false;
  }
  let getAllButData = obj =>
    R.props(
      R.pipe(
        R.keys,
        R.without("data")
      )(obj),
      obj
    );
  return R.equals(getAllButData(prev), getAllButData(next));
};

const TableCell = React.memo(
  ({
    data,
    classes = [],
    style,
    rowIndex,
    columnIndex,
    columnWidth,
    rowHeight,
    renderer
  }) =>
    renderer({
      data,
      style: {
        ...style,
        width:
          typeof columnWidth === "function"
            ? columnWidth(columnIndex)
            : columnWidth,
        height:
          typeof rowHeight === "function" ? rowHeight(rowIndex) : rowHeight
      },
      classes: ["stickyTableCell", ...classes],
      rowIndex,
      columnIndex
    }),

  allButDataEqual
);

const TableGrid = React.memo(
  ({
    data,
    alternateColors,
    columnWidth,
    rowHeight,
    visibleIndices,
    renderer
  }) => {
    let items = [];
    for (let i = visibleIndices.rows.min; i <= visibleIndices.rows.max; ++i) {
      for (let j = visibleIndices.cols.min; j <= visibleIndices.cols.max; ++j) {
        const classes = [];
        if (alternateColors && i % 2) {
          classes.push("odd");
        }
        items.push(
          <TableCell
            key={`${i}_${j}`}
            classes={classes}
            renderer={renderer}
            data={data[i][j]}
            rowIndex={i}
            columnIndex={j}
            columnWidth={columnWidth}
            rowHeight={rowHeight}
            style={{
              top: i * rowHeight,
              left: j * columnWidth
            }}
          />
        );
      }
    }
    return <div className="actualGrid">{items}</div>;
  },
  allButDataEqual
);

const TableHeaderRow = React.memo(
  ({
    data,
    className,
    leftWidth = 0,
    top = 0,
    columnWidth,
    rowHeight,
    visibleIndices,
    renderer
  }) => {
    let items = [];
    for (let i = visibleIndices.cols.min; i <= visibleIndices.cols.max; ++i) {
      items.push(
        <TableCell
          key={i}
          renderer={renderer}
          data={data[i]}
          rowIndex={0}
          columnIndex={i}
          odd={false}
          columnWidth={columnWidth}
          rowHeight={rowHeight}
          style={{
            left: leftWidth + i * columnWidth
          }}
        />
      );
    }
    return (
      <div
        className={["stickyHeader", className].join(" ")}
        style={{
          height: rowHeight,
          top
        }}
      >
        {items}
      </div>
    );
  },
  allButDataEqual
);

const TableHeaderCol = React.memo(
  ({
    data,
    alternateColors,
    className,
    left = 0,
    columnWidth,
    rowHeight,
    visibleIndices,
    renderer
  }) => {
    let items = [];
    for (let i = visibleIndices.rows.min; i <= visibleIndices.rows.max; ++i) {
      const classes = [];
      if (alternateColors && i % 2) {
        classes.push("odd");
      }
      items.push(
        <TableCell
          key={i}
          classes={classes}
          renderer={renderer}
          data={data[i]}
          rowIndex={i}
          columnIndex={0}
          columnWidth={columnWidth}
          rowHeight={rowHeight}
          style={{
            top: i * rowHeight
          }}
        />
      );
    }
    return (
      <div
        className={["stickyHeader", className].join(" ")}
        style={{
          width: columnWidth,
          left
        }}
      >
        {items}
      </div>
    );
  },
  allButDataEqual
);

const Corner = React.memo(
  ({ outerWidth = false, className, width, height, top, left }) => (
    <div
      className="corner"
      style={{ top, left, width: outerWidth ? width : 0 }}
    >
      <div
        className={`cornerInner ${className}`}
        style={{
          width,
          height
        }}
      />
    </div>
  )
);

// The props will be directly mapped to styles. This is better than taking a style object because we get that free
// shallow-equality memoization. It's also more declarative in the react code
const FakeBorder = React.memo(style => (
  <div className="fakeBorder" style={style} />
));

export const StickyTable = ({
  topData,
  rightData,
  bottomData,
  leftData,
  data,
  width,
  height,
  alternateColors = true,
  columnWidth = DEFAULT_WIDTH,
  rowHeight = DEFAULT_HEIGHT,
  topHeight = rowHeight,
  rightWidth = columnWidth,
  bottomHeight = rowHeight,
  leftWidth = columnWidth,
  cellRenderer = basicRenderer,
  topRenderer = basicRenderer,
  rightRenderer = basicRenderer,
  bottomRenderer = basicRenderer,
  leftRenderer = basicRenderer,
  overscan = 10
}) => {
  const containerRef = useRef();
  const scrollbarSizes = useScrollbarSizes(containerRef);

  if (!topData) {
    topHeight = 0;
  }
  if (!rightData) {
    rightWidth = 0;
  }
  if (!bottomData) {
    bottomHeight = 0;
  }
  if (!leftData) {
    leftWidth = 0;
  }

  // Size of the actual grid. The grid table will need to have these dimensions
  const [contentWidth, contentHeight] = useMemo(() => {
    let width = 0;
    let height = 0;
    if (typeof columnWidth === "function") {
      for (let i = 0; i < data[0].length; ++i) {
        width += columnWidth(i);
      }
    } else {
      width = columnWidth * data[0].length;
    }

    if (typeof rowHeight === "function") {
      for (let i = 0; i < data.length; ++i) {
        height += rowHeight(i);
      }
    } else {
      height = rowHeight * data.length;
    }
    return [width, height];
  }, [data, columnWidth, rowHeight]);

  // Size of the grid plus all the headers. The containing div will need to have these dimensions
  let totalWidth = leftWidth + rightWidth + contentWidth;
  let totalHeight = topHeight + bottomHeight + contentHeight;

  let viewWidth, viewHeight, hasVertScroll, hasHorizScroll;
  if (totalWidth > width) {
    hasHorizScroll = true;
    viewWidth = width;
  } else {
    hasHorizScroll = false;
    viewWidth = totalWidth;
  }
  if (totalHeight > height) {
    hasVertScroll = true;
    viewHeight = height;
  } else {
    hasVertScroll = false;
    viewHeight = totalHeight;
  }

  // The position from the left things like the right table/border/corners will be. This will be the size of the view
  // minus the size of the right header.
  let rightLeftPos = viewWidth - rightWidth;
  let bottomTopPos = viewHeight - bottomHeight;

  if (hasVertScroll || hasHorizScroll) {
    if (hasVertScroll && hasHorizScroll) {
      rightLeftPos -= scrollbarSizes.width;
      bottomTopPos -= scrollbarSizes.height;
    } else if (hasVertScroll) {
      viewWidth += scrollbarSizes.width;
    } else {
      viewHeight += scrollbarSizes.height;
    }
  } else {
    viewWidth += scrollbarSizes.width;
    viewHeight += scrollbarSizes.height;
  }

  let [visibleIndices, setLeft, setTop] = useVirtualize({
    overscan,
    columnCount: data[0].length,
    rowCount: data.length,
    columnWidth,
    rowHeight,
    width: viewWidth - leftWidth - rightWidth,
    height: viewHeight - topHeight - bottomHeight
  });

  return (
    <div
      ref={containerRef}
      className="stickyTableOuter"
      style={{
        width,
        height
      }}
    >
      <div
        className="stickyTable"
        style={{
          width: viewWidth,
          height: viewHeight
        }}
        onScroll={e => {
          setLeft(e.target.scrollLeft);
          setTop(e.target.scrollTop);
        }}
      >
        {topData && leftData && (
          <Corner
            className="nw"
            width={leftWidth}
            height={topHeight}
            top={0}
            left={0}
          />
        )}
        {bottomData && leftData && (
          <Corner
            className="sw"
            width={leftWidth}
            height={bottomHeight}
            top={bottomTopPos}
            left={0}
          />
        )}
        {topData && rightData && (
          <Corner
            className="ne"
            outerWidth
            width={rightWidth}
            height={topHeight}
            top={0}
            left={rightLeftPos}
          />
        )}
        {bottomData && rightData && (
          <Corner
            className="se"
            outerWidth
            width={rightWidth}
            height={bottomHeight}
            top={bottomTopPos}
            left={rightLeftPos}
          />
        )}
        {topData && (
          <TableHeaderRow
            data={topData}
            className="topHeader"
            leftWidth={leftWidth}
            columnWidth={columnWidth}
            rowHeight={topHeight}
            visibleIndices={visibleIndices}
            renderer={topRenderer}
          />
        )}
        {leftData && (
          <TableHeaderCol
            data={leftData}
            className="leftHeader"
            columnWidth={leftWidth}
            rowHeight={rowHeight}
            visibleIndices={visibleIndices}
            renderer={leftRenderer}
          />
        )}
        {rightData && (
          <TableHeaderCol
            data={rightData}
            className="rightHeader"
            left={rightLeftPos}
            columnWidth={rightWidth}
            rowHeight={rowHeight}
            visibleIndices={visibleIndices}
            renderer={rightRenderer}
          />
        )}
        {bottomData && (
          <TableHeaderRow
            data={bottomData}
            className="bottomHeader"
            top={bottomTopPos}
            leftWidth={leftWidth}
            columnWidth={columnWidth}
            rowHeight={bottomHeight}
            visibleIndices={visibleIndices}
            renderer={bottomRenderer}
          />
        )}
        <div
          className="innerGrid"
          style={{
            width: contentWidth + rightWidth,
            maxWidth: contentWidth + rightWidth,
            height: contentHeight,
            maxHeight: contentHeight,
            top: -bottomHeight,
            left: leftWidth
          }}
        >
          <TableGrid
            data={data}
            alternateColors={alternateColors}
            top={topHeight}
            left={leftWidth}
            columnWidth={columnWidth}
            rowHeight={rowHeight}
            visibleIndices={visibleIndices}
            renderer={cellRenderer}
          />
        </div>
      </div>
      {/* Below there are various +/- 2 modifications. These are adjustments for borders. Borders are 2px wide. Without
          adjustment there are no "corners". So certain borders in certain cases need to be extended two pixels in
          either direction. */}
      {!topData && (
        <FakeBorder
          left={leftWidth}
          top={0}
          width={rightLeftPos - leftWidth}
          height={0}
        />
      )}
      {!leftData && (
        <FakeBorder
          left={0}
          top={topHeight}
          height={bottomTopPos - topHeight}
          width={0}
        />
      )}
      {!bottomData && (
        <FakeBorder
          left={leftWidth}
          top={bottomTopPos - 2}
          width={rightLeftPos - leftWidth}
          height={0}
        />
      )}
      {!rightData && (
        <FakeBorder
          left={rightLeftPos - 2}
          top={topHeight - 2}
          height={bottomTopPos - topHeight + 2 + (bottomData ? 2 : 0)}
          width={0}
        />
      )}
    </div>
  );
};

export default StickyTable;
