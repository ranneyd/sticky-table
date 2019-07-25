import React, { useMemo, useRef } from "react";

import * as R from "ramda";

import useScrollbarSizes from "./useScrollbarSizes";
import useVirtualize from "./useVirtual";

import "./StickyTable.scss";

const DEFAULT_WIDTH = 100;
const DEFAULT_HEIGHT = 50;

// Basically a rehash of https://github.com/bvaughn/react-window with position: sticky

// Virtual and Data are values that get passed to our various sub-elements. They are large objects. I don't want to
// deeply compare each object when it's time to check if we should re-render. So deep equal everything but those two.
// We'll do a shallow check on data. Virtual is a little particular (vertical headers only care if the row sub-object
// changes; no need to re-render if column virtual data changes) so we leave that comparison to the parent.
const allButDataAndVirtualEqual = (prev, next) => {
  if (prev.data !== next.data) {
    return false;
  }
  let getAllButData = obj =>
    R.props(
      R.pipe(
        R.keys,
        R.without(["data", "virtual"])
      )(obj),
      obj
    );
  return R.equals(getAllButData(prev), getAllButData(next));
};

// Don't do much but memoize and run the render function.
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
        width: columnWidth,
        height: rowHeight
      },
      classes: ["stickyTableCell", ...classes],
      rowIndex,
      columnIndex
    }),
  allButDataAndVirtualEqual
);

// This is the actual grid. It needs to do a 2d for loop
const TableGrid = React.memo(
  ({ data, alternateColors, virtual, renderer }) => {
    const { cols, rows } = virtual;
    let items = [];
    // Only render items that our virtualization says we should
    for (let i = rows.visible.min; i <= rows.visible.max; ++i) {
      for (let j = cols.visible.min; j <= cols.visible.max; ++j) {
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
            columnWidth={cols.sizes[j]}
            rowHeight={rows.sizes[i]}
            style={{
              top: rows.positions[i],
              left: cols.positions[j]
            }}
          />
        );
      }
    }
    return <div className="actualGrid">{items}</div>;
  },
  (prev, next) => {
    // We depend on the row and col sub-objects, so if they aren't shallow-equal that's good enough to know we have to
    // re-render.
    if (prev.virtual !== next.virtual) {
      return false;
    }
    return allButDataAndVirtualEqual(prev, next);
  }
);

// Horizontal header bars. These take a 1d data prop and some offsets for positioning
const TableHeaderRow = React.memo(
  ({ data, className, leftWidth = 0, top = 0, height, virtual, renderer }) => {
    const { cols } = virtual;
    const { visible, sizes, positions } = cols;

    let items = [];
    for (let i = visible.min; i <= visible.max; ++i) {
      items.push(
        <TableCell
          key={i}
          renderer={renderer}
          data={data[i]}
          // Only one row!
          rowIndex={0}
          columnIndex={i}
          // our odd/even alternating only happens for rows. This is only one row.
          odd={false}
          columnWidth={sizes[i]}
          rowHeight={height}
          style={{
            left: leftWidth + positions[i]
          }}
        />
      );
    }
    return (
      <div
        className={["stickyHeader", className].join(" ")}
        style={{
          height,
          top
        }}
      >
        {items}
      </div>
    );
  },
  (prev, next) => {
    // If virtual.rows changes, we don't care, so we can still return true. If the cols change, we need to re-render
    if (prev.virtual.cols !== next.virtual.cols) {
      return false;
    }
    return allButDataAndVirtualEqual(prev, next);
  }
);

// The vertical headers. These also only take 1d arrays for data
const TableHeaderCol = React.memo(
  ({
    data,
    alternateColors,
    className,
    left = 0,
    width,
    virtual,
    renderer
  }) => {
    const { rows } = virtual;
    const { visible, sizes, positions } = rows;

    let items = [];
    for (let i = visible.min; i <= visible.max; ++i) {
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
          columnWidth={width}
          rowHeight={sizes[i]}
          style={{
            top: positions[i]
          }}
        />
      );
    }
    return (
      <div
        className={["stickyHeader", className].join(" ")}
        style={{
          width,
          left
        }}
      >
        {items}
      </div>
    );
  },
  (prev, next) => {
    if (prev.virtual.rows !== next.virtual.rows) {
      return false;
    }
    return allButDataAndVirtualEqual(prev, next);
  }
);

// These corners have z-index: 2 and sit above the headers. To get properly synchronized positioning, they also need
// "position: sticky". However, if they have a width or height, they'll offset the headers, kind of defeating the
// purpose. We can get around this by actually giving them a height/width of 0, giving them "overflow: visible", and
// sizing the sub-divs. The exception is some hackery for the right-side corners: they need to actually have a width to
// appear properly, so we take a flag to determine if the outer div should have the same width.
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

// When we don't have a border on a side, we want to replace it with a simple border to keep things looking neat. This
// is done simply with absolute positioning. The props will be directly mapped to styles. This is better than taking a
// style object because we get that free shallow-equality memoization. It's also more declarative in the react code
const FakeBorder = React.memo(style => (
  <div className="fakeBorder" style={style} />
));

// Basic cell renderer. If someone wants to provide a custom function but only wants to change it slightly from the
// default, they can use a wrapper around this.
export const basicRenderer = ({ data, style, classes }) => (
  <div style={style} className={classes.join(" ")}>
    {data}
  </div>
);

// This is where the magic happens!
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
  // This goes on the outermost div. We just use it for the scrollbar hook.
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

  console.log(
    "ok render this shit",
    rightLeftPos,
    scrollbarSizes.width,
    viewWidth,
    width,
    totalWidth,
    rightWidth,
    contentWidth
  );

  let [virtual, setLeft, setTop] = useVirtualize({
    overscan,
    columnCount: data[0].length,
    rowCount: data.length,
    columnWidth,
    rowHeight,
    width: viewWidth - leftWidth - rightWidth,
    height: viewHeight - topHeight - bottomHeight
  });

  console.log(virtual);

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
            height={topHeight}
            virtual={virtual}
            renderer={topRenderer}
          />
        )}
        {leftData && (
          <TableHeaderCol
            data={leftData}
            className="leftHeader"
            width={leftWidth}
            virtual={virtual}
            renderer={leftRenderer}
          />
        )}
        {rightData && (
          <TableHeaderCol
            data={rightData}
            className="rightHeader"
            left={rightLeftPos}
            width={rightWidth}
            virtual={virtual}
            renderer={rightRenderer}
          />
        )}
        {bottomData && (
          <TableHeaderRow
            data={bottomData}
            className="bottomHeader"
            top={bottomTopPos}
            leftWidth={leftWidth}
            height={bottomHeight}
            virtual={virtual}
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
            virtual={virtual}
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
