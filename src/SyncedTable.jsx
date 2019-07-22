import React, { useState, useRef, useLayoutEffect } from "react";

import * as R from "ramda";

import "./SyncedTable.scss";

const DEFAULT_WIDTH = 100;
const DEFAULT_HEIGHT = 50;

// TODO: I think there's a library that does this and is more cross-platform compatible
const useScrollbarSizes = ref => {
  const [sizes, setScrollbarWidths] = useState({
    width: 0,
    height: 0
  });
  useLayoutEffect(() => {
    setScrollbarWidths({
      width: ref.current.offsetWidth - ref.current.clientWidth,
      height: ref.current.offsetHeight - ref.current.clientHeight
    });
  }, [ref]);
  return sizes;
};

const basicRenderer = ({ data, style, classes }) => (
  <div style={style} className={classes.join(" ")}>
    {data}
  </div>
);

const TableCell = React.memo(
  ({
    data,
    classes = [],
    index,
    min,
    max,
    style,
    rowIndex,
    columnIndex,
    renderer
  }) => {
    if (index < min || index > max) {
      return null;
    }
    return renderer({
      data,
      style,
      classes: ["syncedTableCell", ...classes],
      rowIndex,
      columnIndex
    });
  }
);

const TableCorner = React.memo(({ left, top, width, height, className }) => (
  <div
    className={["corner", className].join(" ")}
    style={{
      left,
      top,
      width,
      height
    }}
  />
));

const TableGrid = React.memo(
  ({
    data,
    alternateColors,
    top,
    left,
    columnWidth,
    rowHeight,
    visibleIndices,
    renderer
  }) => (
    <div>
      {data.map((item, i) => {
        if (i < visibleIndices.rows.min || i > visibleIndices.rows.max) {
          return null;
        }
        return item.map((contents, j) => {
          const classes = [];
          if (alternateColors && i % 2) {
            classes.push("odd");
          }
          return (
            <TableCell
              key={`${i}_${j}`}
              classes={classes}
              renderer={renderer}
              data={contents}
              rowIndex={i}
              columnIndex={j}
              index={j}
              min={visibleIndices.cols.min}
              max={visibleIndices.cols.max}
              style={{
                width: columnWidth,
                height: rowHeight,
                top: top + i * rowHeight,
                left: left + j * columnWidth
              }}
            />
          );
        });
      })}
    </div>
  ),
  (prev, next) => {
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
  }
);

const TableHeaderRow = React.memo(
  ({
    data,
    className,
    top,
    left,
    columnWidth,
    rowHeight,
    visibleIndices,
    renderer
  }) => (
    <div>
      {data.map((contents, i) => (
        <TableCell
          key={i}
          classes={["syncedTableHeader", className]}
          renderer={renderer}
          data={contents}
          rowIndex={0}
          columnIndex={i}
          odd={false}
          index={i}
          min={visibleIndices.cols.min}
          max={visibleIndices.cols.max}
          style={{
            width: columnWidth,
            height: rowHeight,
            top,
            left: left + i * columnWidth
          }}
        />
      ))}
    </div>
  )
);

const TableHeaderCol = React.memo(
  ({
    data,
    alternateColors,
    className,
    top,
    left,
    columnWidth,
    rowHeight,
    visibleIndices,
    renderer
  }) => (
    <div>
      {data.map((contents, i) => {
        const classes = ["syncedTableHeader", className];
        if (alternateColors && i % 2) {
          classes.push("odd");
        }
        return (
          <TableCell
            key={i}
            classes={classes}
            renderer={renderer}
            data={contents}
            rowIndex={i}
            columnIndex={0}
            index={i}
            min={visibleIndices.rows.min}
            max={visibleIndices.rows.max}
            style={{
              width: columnWidth,
              height: rowHeight,
              left,
              top: top + i * rowHeight
            }}
          />
        );
      })}
    </div>
  )
);

// The props will be directly mapped to styles. This is better than taking a style object because we get that free
// shallow-equality memoization. It's also more declarative in the react code
const FakeBorder = React.memo(style => (
  <div className="fakeBorder" style={style} />
));

export const SyncedTable = ({
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
  leftRenderer = basicRenderer
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

  let contentWidth = data[0].length * columnWidth;
  let totalWidth = leftWidth + rightWidth + contentWidth;
  let contentHeight = data.length * rowHeight;
  let totalHeight = topHeight + bottomHeight + contentHeight;

  let viewWidth = Math.min(totalWidth, width);
  let viewHeight = Math.min(totalHeight, height);

  let [left, setLeft] = useState(0);
  let [top, setTop] = useState(0);

  let rightLeftPos = viewWidth - rightWidth + left;
  let bottomTopPos = viewHeight - bottomHeight + top;

  let visibleIndices = {
    cols: {
      min: Math.floor(left / columnWidth),
      max: Math.ceil((width - leftWidth - rightWidth + left) / columnWidth)
    },
    rows: {
      min: Math.floor(top / rowHeight),
      max: Math.ceil((height - topHeight - bottomHeight + top) / rowHeight)
    }
  };

  return (
    <div
      className="syncedTableOuter"
      style={{
        width,
        height
      }}
    >
      {!topData && (
        <FakeBorder
          width={viewWidth - leftWidth - rightWidth}
          height={1}
          top={0}
          left={leftWidth}
        />
      )}
      {!(bottomData || R.prop("height", scrollbarSizes)) && (
        <FakeBorder
          width={viewWidth - leftWidth - rightWidth + (leftData ? 4 : 2)}
          height={1}
          top={viewHeight}
          left={leftWidth - (leftData ? 2 : 0)}
        />
      )}
      {!leftData && (
        <FakeBorder
          width={1}
          height={viewHeight - topHeight - bottomHeight}
          top={topHeight}
          left={0}
        />
      )}
      {!(rightData || R.prop("width", scrollbarSizes)) && (
        <FakeBorder
          width={1}
          height={viewHeight - topHeight - bottomHeight + (topData ? 4 : 2)}
          top={topHeight - (topData ? 2 : 0)}
          left={viewWidth}
        />
      )}
      <div
        ref={containerRef}
        className="syncedTable"
        style={{
          width: viewWidth + scrollbarSizes.width,
          height: viewHeight + scrollbarSizes.height
        }}
        onScroll={e => {
          setLeft(e.target.scrollLeft);
          setTop(e.target.scrollTop);
        }}
      >
        <div
          className="innerGrid"
          style={{
            width: totalWidth,
            maxWidth: totalWidth,
            height: totalHeight,
            maxHeight: totalHeight
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
          {topData && (
            <TableHeaderRow
              data={topData}
              className="topHeader"
              top={top}
              left={leftWidth}
              columnWidth={columnWidth}
              rowHeight={topHeight}
              visibleIndices={visibleIndices}
              renderer={topRenderer}
            />
          )}
          {bottomData && (
            <TableHeaderRow
              data={bottomData}
              className="bottomHeader"
              top={bottomTopPos}
              left={leftWidth}
              columnWidth={columnWidth}
              rowHeight={bottomHeight}
              visibleIndices={visibleIndices}
              renderer={bottomRenderer}
            />
          )}
          {leftData && (
            <TableHeaderCol
              data={leftData}
              className="leftHeader"
              alternateColors={alternateColors}
              top={topHeight}
              left={left}
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
              alternateColors={alternateColors}
              top={topHeight}
              left={rightLeftPos}
              columnWidth={rightWidth}
              rowHeight={rowHeight}
              visibleIndices={visibleIndices}
              renderer={rightRenderer}
            />
          )}

          {topData && leftData && (
            <TableCorner
              className="nw"
              left={left}
              top={top}
              width={leftWidth}
              height={topHeight}
            />
          )}
          {topData && rightData && (
            <TableCorner
              className="ne"
              left={rightLeftPos}
              top={top}
              width={rightWidth}
              height={topHeight}
            />
          )}
          {bottomData && leftData && (
            <TableCorner
              className="sw"
              left={left}
              top={bottomTopPos}
              width={leftWidth}
              height={bottomHeight}
            />
          )}
          {bottomData && rightData && (
            <TableCorner
              className="se"
              left={rightLeftPos}
              top={bottomTopPos}
              width={rightWidth}
              height={bottomHeight}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SyncedTable;
