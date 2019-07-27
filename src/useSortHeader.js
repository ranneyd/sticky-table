import React, { useState, useMemo, useCallback, useEffect } from "react";

import * as R from "ramda";

import "./useSortHeader.scss";

export const useSortHeader = ({ data, topData, renderer = R.prop("data") }) => {
  const [sortParamList, setSortParamList] = useState([]);
  useEffect(() => {
    setSortParamList([]);
  }, [data, topData]);

  const sortMap = useMemo(() => {
    let map = {};
    for (let i = 0; i < sortParamList.length; ++i) {
      let params = sortParamList[i];
      map[params.index] = {
        index: i,
        ascending: params.ascending,
        listIndex: i
      };
    }
    return map;
  }, [sortParamList]);

  const toggleSort = useCallback(
    index => {
      let sortParams = sortMap[index];
      if (sortParams) {
        if (sortParams.ascending) {
          let newParams = {
            index,
            ascending: !sortParams.ascending
          };
          setSortParamList(
            R.update(sortParams.listIndex, newParams, sortParamList)
          );
        } else {
          setSortParamList(R.remove(sortParams.listIndex, 1, sortParamList));
        }
      } else {
        setSortParamList([...sortParamList, { index, ascending: true }]);
      }
    },
    [sortParamList, sortMap, setSortParamList]
  );

  const sortedData = useMemo(
    () =>
      R.sortWith(
        R.map(
          ({ index, ascending }) =>
            (ascending ? R.ascend : R.descend)(
              R.pipe(
                R.prop(index),
                R.defaultTo("")
              )
            ),
          sortParamList
        ),
        data
      ),
    [data, sortParamList]
  );

  const headerRenderer = useCallback(
    ({ data, columnIndex, style, classes }) => {
      let sortParams = sortMap[columnIndex];

      let ourClasses = [...classes, "useSortHeaderCaret"];

      if (sortParams) {
        ourClasses.push(sortParams.ascending ? "up" : "down");
      }
      return (
        <div
          style={style}
          className={ourClasses.join(" ")}
          onClick={() => toggleSort(columnIndex)}
        >
          <span>
            {renderer({
              data,
              columnIndex
            })}
          </span>
        </div>
      );
    },
    [renderer, sortMap, toggleSort]
  );

  return [sortedData, headerRenderer];
};

export default useSortHeader;
