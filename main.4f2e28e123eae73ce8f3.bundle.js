(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{246:function(module,__webpack_exports__,__webpack_require__){"use strict";var _Users_dustinkane_git_sticky_table_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(12),_Users_dustinkane_git_sticky_table_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(55),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__),ramda__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(530),_src_StickyTable__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(88),makeCustomSizeFunc=function makeCustomSizeFunc(count,min,max){for(var sizes=[],i=0;i<count;++i)sizes.push(Math.floor(Math.random()*(max-min))+min);return function(i){return sizes[i]}},reducer=function reducer(state,action){switch(action.type){case"rowCount":return Object(_Users_dustinkane_git_sticky_table_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__.a)({},state,{rowCount:action.rowCount,rowFunc:makeCustomSizeFunc(action.rowCount,25,100)});case"colCount":return Object(_Users_dustinkane_git_sticky_table_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__.a)({},state,{colCount:action.colCount,colFunc:makeCustomSizeFunc(action.colCount,50,300)});default:return state}},BasicStickyTable=function BasicStickyTable(_ref){var rowCount=_ref.rowCount,colCount=_ref.colCount,width=_ref.width,height=_ref.height,colWidth=_ref.colWidth,rowHeight=_ref.rowHeight,leftWidth=_ref.leftWidth,rightWidth=_ref.rightWidth,topHeight=_ref.topHeight,bottomHeight=_ref.bottomHeight,overscan=_ref.overscan,showTop=_ref.showTop,showRight=_ref.showRight,showBottom=_ref.showBottom,showLeft=_ref.showLeft,usingColFunc=_ref.usingColFunc,usingRowFunc=_ref.usingRowFunc,_useReducer=Object(react__WEBPACK_IMPORTED_MODULE_2__.useReducer)(reducer,{rowCount:rowCount,colCount:colCount,rowFunc:makeCustomSizeFunc(rowCount,25,100),colFunc:makeCustomSizeFunc(colCount,50,300)}),_useReducer2=Object(_Users_dustinkane_git_sticky_table_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.a)(_useReducer,2),state=_useReducer2[0],dispatch=_useReducer2[1],_R$props=ramda__WEBPACK_IMPORTED_MODULE_3__.a(["rowCount","colCount","rowFunc","colFunc"],state),_R$props2=Object(_Users_dustinkane_git_sticky_table_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.a)(_R$props,4),ourRowCount=_R$props2[0],ourColCount=_R$props2[1],rowFunc=_R$props2[2],colFunc=_R$props2[3];Object(react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function(){rowCount!==ourRowCount&&dispatch({type:"rowCount",rowCount:rowCount})},[rowCount,ourRowCount]),Object(react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function(){colCount!==ourColCount&&dispatch({type:"colCount",colCount:colCount})},[colCount,ourColCount]);var _useMemo=Object(react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(function(){var topData,rightData,bottomData,leftData,data=[];showTop&&(topData=[]),showRight&&(rightData=[]),showBottom&&(bottomData=[]),showLeft&&(leftData=[]);for(var rowI=0;rowI<ourRowCount;++rowI){for(var row=[],colI=0;colI<ourColCount;++colI)row.push("row: ".concat(rowI,", col ").concat(colI));data.push(row),showLeft&&leftData.push(rowI),showRight&&rightData.push(ourRowCount-rowI-1)}for(var _colI=0;_colI<ourColCount;++_colI)showTop&&topData.push(_colI),showBottom&&bottomData.push(ourColCount-_colI-1);return[data,topData,rightData,bottomData,leftData]},[showTop,showRight,showBottom,showLeft,ourRowCount,ourColCount]),_useMemo2=Object(_Users_dustinkane_git_sticky_table_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.a)(_useMemo,5),data=_useMemo2[0],topData=_useMemo2[1],rightData=_useMemo2[2],bottomData=_useMemo2[3],leftData=_useMemo2[4];return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div",{style:{padding:50}},react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_src_StickyTable__WEBPACK_IMPORTED_MODULE_4__.a,{data:data,width:width,height:height,columnWidth:usingColFunc?colFunc:colWidth,rowHeight:usingRowFunc?rowFunc:rowHeight,leftWidth:leftWidth,rightWidth:rightWidth,topHeight:topHeight,bottomHeight:bottomHeight,topData:topData,rightData:rightData,bottomData:bottomData,leftData:leftData,overscan:overscan}))};__webpack_exports__.a=BasicStickyTable,BasicStickyTable.__docgenInfo={description:"",methods:[],displayName:"BasicStickyTable"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["stories/BasicStickyTable.jsx"]={name:"BasicStickyTable",docgenInfo:BasicStickyTable.__docgenInfo,path:"stories/BasicStickyTable.jsx"})},248:function(module,__webpack_exports__,__webpack_require__){"use strict";var slicedToArray=__webpack_require__(12),objectSpread=__webpack_require__(55),react=__webpack_require__(0),react_default=__webpack_require__.n(react),StickyTable=__webpack_require__(88),toConsumableArray=__webpack_require__(87),prop=__webpack_require__(540),update=__webpack_require__(538),remove=__webpack_require__(531),sortWith=__webpack_require__(532),map=__webpack_require__(539),ascend=__webpack_require__(533),descend=__webpack_require__(534),pipe=__webpack_require__(537),defaultTo=__webpack_require__(535),src_useSortHeader_0=(__webpack_require__(527),function useSortHeader(_ref){var data=_ref.data,topData=_ref.topData,_ref$renderer=_ref.renderer,renderer=void 0===_ref$renderer?prop.a("data"):_ref$renderer,_useState=Object(react.useState)([]),_useState2=Object(slicedToArray.a)(_useState,2),sortParamList=_useState2[0],setSortParamList=_useState2[1];Object(react.useEffect)(function(){setSortParamList([])},[data,topData]);var sortMap=Object(react.useMemo)(function(){for(var map={},i=0;i<sortParamList.length;++i){var params=sortParamList[i];map[params.index]={index:i,ascending:params.ascending,listIndex:i}}return map},[sortParamList]),toggleSort=Object(react.useCallback)(function(index){var sortParams=sortMap[index];if(sortParams)if(sortParams.ascending){var newParams={index:index,ascending:!sortParams.ascending};setSortParamList(update.a(sortParams.listIndex,newParams,sortParamList))}else setSortParamList(remove.a(sortParams.listIndex,1,sortParamList));else setSortParamList([].concat(Object(toConsumableArray.a)(sortParamList),[{index:index,ascending:!0}]))},[sortParamList,sortMap,setSortParamList]);return[Object(react.useMemo)(function(){return sortWith.a(map.a(function(_ref2){var index=_ref2.index;return(_ref2.ascending?ascend.a:descend.a)(pipe.a(prop.a(index),defaultTo.a("")))},sortParamList),data)},[data,sortParamList]),Object(react.useCallback)(function(_ref3){var data=_ref3.data,columnIndex=_ref3.columnIndex,style=_ref3.style,classes=_ref3.classes,sortParams=sortMap[columnIndex],ourClasses=[].concat(Object(toConsumableArray.a)(classes),["useSortHeaderCaret"]);return sortParams&&ourClasses.push(sortParams.ascending?"up":"down"),react_default.a.createElement("div",{style:style,className:ourClasses.join(" "),onClick:function onClick(){return toggleSort(columnIndex)}},react_default.a.createElement("span",null,renderer({data:data,columnIndex:columnIndex})))},[renderer,sortMap,toggleSort])]}),HEADERS=["First Name","Last Name","Grade","Birthday","Eye Color","Pet"],RAW_DATA=[["Angelita","Almendarez",79,"2011-01-09","brown","bird"],["Ofelia","Oliveros",71,"2010-04-24","blue","bird"],["Brittny","Brinegar",97,"2010-08-27","brown","cat"],["Elisabeth","Eisenhauer",45,"2010-01-11","brown",null],["Bonnie","Barkan",55,"2010-06-26","green","cat"],["Shaunte","Strong",26,"2011-01-21","brown",null],["Myra","Mcnicholas",42,"2011-01-11","green","dog"],["Shavonne","Salgado",98,"2010-01-13","blue","dog"],["Valery","Vandermeer",30,"2010-05-08","blue","dog"],["Charissa","Carlon","0","2011-07-08","brown","dog"],["Mandie","Mannino",98,"2010-04-10","brown","cat"],["Shayna","Schapiro",57,"2011-11-17","green","dog"],["Wendell","Walck","1","2011-02-14","green","cat"],["Teddy","Tidwell",84,"2011-05-28","blue","cat"],["Jetta","Jimison",29,"2010-10-10","blue","cat"],["Kenton","Kinloch",45,"2010-03-14","green",null],["Nakia","Nappi",12,"2011-04-03","brown","bird"],["Crystal","Comeaux","4","2010-02-13","brown","bird"],["Alaina","Atterberry",21,"2011-04-20","brown","cat"],["Roger","Revelle",23,"2010-04-19","blue",null],["Pamela","Pedraza",82,"2011-04-11","blue","bird"],["Coralee","Cluff",75,"2011-09-26","brown","dog"],["Rayford","Runyan",20,"2010-02-04","green","cat"],["Maritza","Midgley",39,"2010-07-05","green",null],["Vertie","Villalba",80,"2011-07-15","brown","dog"],["Vivian","Velarde",98,"2011-08-27","green","cat"],["Hermine","Herzberg",52,"2011-03-17","blue","cat"],["Deandrea","Doucet",20,"2011-11-13","blue",null],["Melva","Muntz","2","2011-04-11","green","dog"],["Luetta","Lanning",32,"2010-04-08","green","bird"],["Sammy","Stills",18,"2011-06-10","green",null],["Brittanie","Bronstein",70,"2011-03-03","blue","cat"],["Cristopher","Crosier","3","2011-08-05","brown","bird"],["Mitsuko","Mchenry","1","2011-07-14","blue","dog"],["Miquel","Murrah",27,"2010-03-05","brown","cat"],["Carlita","Collum",39,"2011-11-17","brown",null],["Debi","Deanda",22,"2010-04-16","green","dog"],["Edgar","Edson",83,"2010-08-16","brown","bird"],["Tiny","Turner",67,"2010-07-09","blue","dog"],["Jaclyn","Jimenez",35,"2011-03-13","brown",null],["Mayola","Mccormack",74,"2011-07-04","green","bird"],["Hilary","Hougen",60,"2011-05-09","blue","dog"],["Willene","Woodby",61,"2010-03-09","blue","bird"],["Lena","Larusso",34,"2010-03-10","blue",null],["Roman","Rames",25,"2011-02-08","blue","bird"],["Samual","Scally",88,"2010-04-04","blue","bird"],["Tobie","Trombly",25,"2011-05-13","brown","dog"],["Elenor","Ephraim",30,"2011-10-25","green","cat"],["Alyson","Arocho",31,"2010-08-02","brown","cat"],["Marine","Mouser",74,"2010-03-05","green","cat"]],SortTable_SortTable=function SortTable(_ref){var width=_ref.width,height=_ref.height,usingCustomRenderer=_ref.usingCustomRenderer,args={data:RAW_DATA,topData:HEADERS};usingCustomRenderer&&(args.renderer=function(_ref2){var data=_ref2.data,classes=_ref2.classes,style=_ref2.style;return Object(StickyTable.b)({data:data,classes:classes,style:Object(objectSpread.a)({},style,{fontSize:"12px",fontWeight:"bold",padding:"2px",textAlign:"center"})})});var _useSortHeader=src_useSortHeader_0(args),_useSortHeader2=Object(slicedToArray.a)(_useSortHeader,2),sortedData=_useSortHeader2[0],headerRenderer=_useSortHeader2[1];return react_default.a.createElement("div",{style:{padding:50}},react_default.a.createElement(StickyTable.a,{width:width,height:height,data:sortedData,topData:HEADERS,topRenderer:headerRenderer}))};__webpack_exports__.a=SortTable_SortTable;SortTable_SortTable.__docgenInfo={description:"",methods:[],displayName:"SortTable"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["stories/SortTable.jsx"]={name:"SortTable",docgenInfo:SortTable_SortTable.__docgenInfo,path:"stories/SortTable.jsx"})},249:function(module,exports,__webpack_require__){__webpack_require__(250),__webpack_require__(352),module.exports=__webpack_require__(353)},353:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var _storybook_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(113),req=__webpack_require__(513);Object(_storybook_react__WEBPACK_IMPORTED_MODULE_0__.configure)(function loadStories(){req.keys().forEach(function(filename){return req(filename)})},module)}.call(this,__webpack_require__(187)(module))},513:function(module,exports,__webpack_require__){var map={"./index.stories.js":514};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=513},514:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),_storybook_react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(113),_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(9),_BasicStickyTable__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(246),_SortTable__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(248),stickyStories=(__webpack_require__(528),Object(_storybook_react__WEBPACK_IMPORTED_MODULE_1__.storiesOf)("StickyTable",module).addDecorator(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.withKnobs));stickyStories.add("Basic",function(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_BasicStickyTable__WEBPACK_IMPORTED_MODULE_3__.a,{rowCount:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.number)("Row Count",200),colCount:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.number)("Column Count",200),width:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.number)("Width",900),height:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.number)("Height",400),colWidth:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.number)("Column Width",150),rowHeight:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.number)("Row Height",50),topHeight:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.number)("Top Height",50),rightWidth:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.number)("Right Width",50),bottomHeight:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.number)("Bottom Height",50),leftWidth:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.number)("Left Width",50),overscan:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.number)("Overscan",10),showTop:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.boolean)("Use Top Header",!0),showRight:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.boolean)("Use Right Header",!0),showBottom:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.boolean)("Use Bottom Header",!0),showLeft:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.boolean)("Use Left Header",!0),usingColFunc:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.boolean)('Use Dynamic Column Widths (overrides "Column Width" above)',!1),usingRowFunc:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.boolean)('Use Dynamic Row Heights (overrides "Row Height" above)',!1)})}),stickyStories.add("Sort",function(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SortTable__WEBPACK_IMPORTED_MODULE_4__.a,{width:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.number)("Width",900),height:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.number)("Height",400),usingCustomRenderer:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.boolean)("Use custom header render function",!1)})})}.call(this,__webpack_require__(187)(module))},526:function(module,exports,__webpack_require__){},527:function(module,exports,__webpack_require__){},528:function(module,exports,__webpack_require__){},88:function(module,__webpack_exports__,__webpack_require__){"use strict";var slicedToArray=__webpack_require__(12),toConsumableArray=__webpack_require__(87),objectSpread=__webpack_require__(55),react=__webpack_require__(0),react_default=__webpack_require__.n(react),props=__webpack_require__(530),pipe=__webpack_require__(537),keys=__webpack_require__(54),without=__webpack_require__(536),equals=__webpack_require__(247),findNearestItem=function findNearestItem(posIndexPairs,pos){for(var left=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],high=posIndexPairs.length,low=0;low<=high;){var middle=low+Math.floor((high-low)/2),currentOffset=posIndexPairs[middle];if(currentOffset===pos)return middle;currentOffset<pos?low=middle+1:high=middle-1}return low>0?low-(left?1:0):0};__webpack_require__(526);__webpack_require__.d(__webpack_exports__,"b",function(){return StickyTable_basicRenderer}),__webpack_require__.d(__webpack_exports__,"a",function(){return StickyTable_StickyTable});var StickyTable_allButDataAndVirtualEqual=function allButDataAndVirtualEqual(prev,next){if(prev.data!==next.data)return!1;var getAllButData=function getAllButData(obj){return props.a(pipe.a(keys.a,without.a(["data","virtual"]))(obj),obj)};return equals.a(getAllButData(prev),getAllButData(next))},TableCell=react_default.a.memo(function(_ref){var data=_ref.data,_ref$classes=_ref.classes,classes=void 0===_ref$classes?[]:_ref$classes,style=_ref.style,rowIndex=_ref.rowIndex,columnIndex=_ref.columnIndex,columnWidth=_ref.columnWidth,rowHeight=_ref.rowHeight;return(0,_ref.renderer)({data:data,style:Object(objectSpread.a)({},style,{width:columnWidth,height:rowHeight}),classes:["stickyTableCell"].concat(Object(toConsumableArray.a)(classes)),rowIndex:rowIndex,columnIndex:columnIndex})},StickyTable_allButDataAndVirtualEqual),TableGrid=react_default.a.memo(function(_ref2){for(var data=_ref2.data,alternateColors=_ref2.alternateColors,virtual=_ref2.virtual,renderer=_ref2.renderer,cols=virtual.cols,rows=virtual.rows,items=[],i=rows.visible.min;i<=rows.visible.max;++i)for(var j=cols.visible.min;j<=cols.visible.max;++j){var classes=[];alternateColors&&i%2&&classes.push("odd"),items.push(react_default.a.createElement(TableCell,{key:"".concat(i,"_").concat(j),classes:classes,renderer:renderer,data:data[i][j],rowIndex:i,columnIndex:j,columnWidth:cols.sizes[j],rowHeight:rows.sizes[i],style:{top:rows.positions[i],left:cols.positions[j]}}))}return react_default.a.createElement("div",{className:"actualGrid"},items)},function(prev,next){return prev.virtual===next.virtual&&StickyTable_allButDataAndVirtualEqual(prev,next)}),TableHeaderRow=react_default.a.memo(function(_ref3){for(var data=_ref3.data,className=_ref3.className,_ref3$leftWidth=_ref3.leftWidth,leftWidth=void 0===_ref3$leftWidth?0:_ref3$leftWidth,_ref3$top=_ref3.top,top=void 0===_ref3$top?0:_ref3$top,height=_ref3.height,virtual=_ref3.virtual,renderer=_ref3.renderer,cols=virtual.cols,visible=cols.visible,sizes=cols.sizes,positions=cols.positions,items=[],i=visible.min;i<=visible.max;++i)items.push(react_default.a.createElement(TableCell,{key:i,renderer:renderer,data:data[i],rowIndex:0,columnIndex:i,odd:!1,columnWidth:sizes[i],rowHeight:height,style:{left:leftWidth+positions[i]}}));return react_default.a.createElement("div",{className:["stickyHeader",className].join(" "),style:{height:height,top:top}},items)},function(prev,next){return prev.virtual.cols===next.virtual.cols&&StickyTable_allButDataAndVirtualEqual(prev,next)}),TableHeaderCol=react_default.a.memo(function(_ref4){for(var data=_ref4.data,alternateColors=_ref4.alternateColors,className=_ref4.className,_ref4$left=_ref4.left,left=void 0===_ref4$left?0:_ref4$left,width=_ref4.width,virtual=_ref4.virtual,renderer=_ref4.renderer,rows=virtual.rows,visible=rows.visible,sizes=rows.sizes,positions=rows.positions,items=[],i=visible.min;i<=visible.max;++i){var classes=[];alternateColors&&i%2&&classes.push("odd"),items.push(react_default.a.createElement(TableCell,{key:i,classes:classes,renderer:renderer,data:data[i],rowIndex:i,columnIndex:0,columnWidth:width,rowHeight:sizes[i],style:{top:positions[i]}}))}return react_default.a.createElement("div",{className:["stickyHeader",className].join(" "),style:{width:width,left:left}},items)},function(prev,next){return prev.virtual.rows===next.virtual.rows&&StickyTable_allButDataAndVirtualEqual(prev,next)}),Corner=react_default.a.memo(function(_ref5){var _ref5$outerWidth=_ref5.outerWidth,outerWidth=void 0!==_ref5$outerWidth&&_ref5$outerWidth,className=_ref5.className,width=_ref5.width,height=_ref5.height,top=_ref5.top,left=_ref5.left;return react_default.a.createElement("div",{className:"corner",style:{top:top,left:left,width:outerWidth?width:0}},react_default.a.createElement("div",{className:"cornerInner ".concat(className),style:{width:width,height:height}}))}),FakeBorder=react_default.a.memo(function(style){return react_default.a.createElement("div",{className:"fakeBorder",style:style})}),StickyTable_basicRenderer=function basicRenderer(_ref6){var data=_ref6.data,_ref6$style=_ref6.style,style=void 0===_ref6$style?{}:_ref6$style,_ref6$classes=_ref6.classes,classes=void 0===_ref6$classes?[]:_ref6$classes;return react_default.a.createElement("div",{style:style,className:classes.join(" ")},data)},StickyTable_StickyTable=function StickyTable(_ref7){var ref,_useState,_useState2,sizes,setScrollbarWidths,topData=_ref7.topData,rightData=_ref7.rightData,bottomData=_ref7.bottomData,leftData=_ref7.leftData,data=_ref7.data,width=_ref7.width,height=_ref7.height,_ref7$alternateColors=_ref7.alternateColors,alternateColors=void 0===_ref7$alternateColors||_ref7$alternateColors,_ref7$columnWidth=_ref7.columnWidth,columnWidth=void 0===_ref7$columnWidth?100:_ref7$columnWidth,_ref7$rowHeight=_ref7.rowHeight,rowHeight=void 0===_ref7$rowHeight?50:_ref7$rowHeight,_ref7$topHeight=_ref7.topHeight,topHeight=void 0===_ref7$topHeight?rowHeight:_ref7$topHeight,_ref7$rightWidth=_ref7.rightWidth,rightWidth=void 0===_ref7$rightWidth?columnWidth:_ref7$rightWidth,_ref7$bottomHeight=_ref7.bottomHeight,bottomHeight=void 0===_ref7$bottomHeight?rowHeight:_ref7$bottomHeight,_ref7$leftWidth=_ref7.leftWidth,leftWidth=void 0===_ref7$leftWidth?columnWidth:_ref7$leftWidth,_ref7$cellRenderer=_ref7.cellRenderer,cellRenderer=void 0===_ref7$cellRenderer?StickyTable_basicRenderer:_ref7$cellRenderer,_ref7$topRenderer=_ref7.topRenderer,topRenderer=void 0===_ref7$topRenderer?StickyTable_basicRenderer:_ref7$topRenderer,_ref7$rightRenderer=_ref7.rightRenderer,rightRenderer=void 0===_ref7$rightRenderer?StickyTable_basicRenderer:_ref7$rightRenderer,_ref7$bottomRenderer=_ref7.bottomRenderer,bottomRenderer=void 0===_ref7$bottomRenderer?StickyTable_basicRenderer:_ref7$bottomRenderer,_ref7$leftRenderer=_ref7.leftRenderer,leftRenderer=void 0===_ref7$leftRenderer?StickyTable_basicRenderer:_ref7$leftRenderer,_ref7$overscan=_ref7.overscan,overscan=void 0===_ref7$overscan?10:_ref7$overscan,containerRef=Object(react.useRef)(),scrollbarSizes=(ref=containerRef,_useState=Object(react.useState)({width:0,height:0}),_useState2=Object(slicedToArray.a)(_useState,2),sizes=_useState2[0],setScrollbarWidths=_useState2[1],Object(react.useLayoutEffect)(function(){var detector=document.createElement("div");detector.style.width="1000px",detector.style.height="1000px",detector.style.overflow="scroll",detector.style.visibility="hidden",ref.current.appendChild(detector);var sizes={width:detector.offsetWidth-detector.clientWidth,height:detector.offsetHeight-detector.clientHeight};ref.current.removeChild(detector),setScrollbarWidths(sizes)},[ref]),sizes);topData||(topHeight=0),rightData||(rightWidth=0),bottomData||(bottomHeight=0),leftData||(leftWidth=0);var viewWidth,viewHeight,hasVertScroll,hasHorizScroll,_useMemo=Object(react.useMemo)(function(){var width=0,height=0;if("function"==typeof columnWidth)for(var i=0;i<data[0].length;++i)width+=columnWidth(i);else width=columnWidth*data[0].length;if("function"==typeof rowHeight)for(var _i=0;_i<data.length;++_i)height+=rowHeight(_i);else height=rowHeight*data.length;return[width,height]},[data,columnWidth,rowHeight]),_useMemo2=Object(slicedToArray.a)(_useMemo,2),contentWidth=_useMemo2[0],contentHeight=_useMemo2[1],totalWidth=leftWidth+rightWidth+contentWidth,totalHeight=topHeight+bottomHeight+contentHeight;totalWidth+scrollbarSizes.width>width?(hasHorizScroll=!0,viewWidth=width):(hasHorizScroll=!1,viewWidth=totalWidth),totalHeight+scrollbarSizes.height>height?(hasVertScroll=!0,viewHeight=height):(hasVertScroll=!1,viewHeight=totalHeight);var rightLeftPos=viewWidth-rightWidth,bottomTopPos=viewHeight-bottomHeight;(hasVertScroll||hasHorizScroll)&&(hasVertScroll&&hasHorizScroll?(rightLeftPos-=Math.max(scrollbarSizes.width,width-viewWidth),bottomTopPos-=scrollbarSizes.height):hasVertScroll?viewWidth+=scrollbarSizes.width:viewHeight+=scrollbarSizes.height);var _useVirtualize=function(_ref){var overscan=_ref.overscan,columnCount=_ref.columnCount,columnWidth=_ref.columnWidth,width=_ref.width,rowCount=_ref.rowCount,rowHeight=_ref.rowHeight,height=_ref.height,granularMemo=Object(react.useRef)({rows:{},cols:{}}),_useMemo=Object(react.useMemo)(function(){granularMemo.current.cols={};for(var isFunc="function"==typeof columnWidth,positions=[0],sizes=[isFunc?columnWidth(0):columnWidth],last=0,i=1;i<columnCount;++i){var point=last+sizes[i-1];positions.push(point),last=point,sizes.push(isFunc?columnWidth(i):columnWidth)}return[sizes,positions]},[columnCount,columnWidth]),_useMemo2=Object(slicedToArray.a)(_useMemo,2),colSizes=_useMemo2[0],colPositions=_useMemo2[1],_useMemo3=Object(react.useMemo)(function(){granularMemo.current.rows={};for(var isFunc="function"==typeof rowHeight,positions=[0],sizes=[isFunc?rowHeight(0):rowHeight],last=0,i=1;i<rowCount;++i){var point=last+sizes[i-1];positions.push(point),last=point,sizes.push(isFunc?rowHeight(i):rowHeight)}return[sizes,positions]},[rowCount,rowHeight]),_useMemo4=Object(slicedToArray.a)(_useMemo3,2),rowSizes=_useMemo4[0],rowPositions=_useMemo4[1];Object(react.useEffect)(function(){granularMemo.current={rows:{},cols:{}}},[overscan]);var rows,cols,_useState=Object(react.useState)(0),_useState2=Object(slicedToArray.a)(_useState,2),left=_useState2[0],setLeft=_useState2[1],_useState3=Object(react.useState)(0),_useState4=Object(slicedToArray.a)(_useState3,2),top=_useState4[0],setTop=_useState4[1];return granularMemo.current.rows[top]?rows=granularMemo.current.rows[top]:(rows={min:Math.max(0,findNearestItem(rowPositions,top,!0)-overscan),max:Math.min(rowCount-1,findNearestItem(rowPositions,top+height,!1)+overscan)},granularMemo.current.rows[top]=rows),granularMemo.current.cols[left]?cols=granularMemo.current.cols[left]:(cols={min:Math.max(0,findNearestItem(colPositions,left,!0)-overscan),max:Math.min(columnCount-1,findNearestItem(colPositions,left+width,!1)+overscan)},granularMemo.current.cols[left]=cols),[{rows:{visible:rows,sizes:rowSizes,positions:rowPositions},cols:{visible:cols,sizes:colSizes,positions:colPositions}},setLeft,setTop]}({overscan:overscan,columnCount:data[0].length,rowCount:data.length,columnWidth:columnWidth,rowHeight:rowHeight,width:viewWidth-leftWidth-rightWidth,height:viewHeight-topHeight-bottomHeight}),_useVirtualize2=Object(slicedToArray.a)(_useVirtualize,3),virtual=_useVirtualize2[0],setLeft=_useVirtualize2[1],setTop=_useVirtualize2[2];return react_default.a.createElement("div",{ref:containerRef,className:"stickyTableOuter",style:{width:width,height:height}},react_default.a.createElement("div",{className:"stickyTable",style:{width:viewWidth,height:viewHeight},onScroll:function onScroll(e){setLeft(e.target.scrollLeft),setTop(e.target.scrollTop)}},topData&&leftData&&react_default.a.createElement(Corner,{className:"nw",width:leftWidth,height:topHeight,top:0,left:0}),bottomData&&leftData&&react_default.a.createElement(Corner,{className:"sw",width:leftWidth,height:bottomHeight,top:bottomTopPos,left:0}),topData&&rightData&&react_default.a.createElement(Corner,{className:"ne",outerWidth:!0,width:rightWidth,height:topHeight,top:0,left:rightLeftPos}),bottomData&&rightData&&react_default.a.createElement(Corner,{className:"se",outerWidth:!0,width:rightWidth,height:bottomHeight,top:bottomTopPos,left:rightLeftPos}),topData&&react_default.a.createElement(TableHeaderRow,{data:topData,className:"topHeader",leftWidth:leftWidth,height:topHeight,virtual:virtual,renderer:topRenderer}),leftData&&react_default.a.createElement(TableHeaderCol,{data:leftData,className:"leftHeader",width:leftWidth,virtual:virtual,renderer:leftRenderer}),rightData&&react_default.a.createElement(TableHeaderCol,{data:rightData,className:"rightHeader",left:rightLeftPos,width:rightWidth,virtual:virtual,renderer:rightRenderer}),bottomData&&react_default.a.createElement(TableHeaderRow,{data:bottomData,className:"bottomHeader",top:bottomTopPos,leftWidth:leftWidth,height:bottomHeight,virtual:virtual,renderer:bottomRenderer}),react_default.a.createElement("div",{className:"innerGrid",style:{width:contentWidth+rightWidth,maxWidth:contentWidth+rightWidth,height:contentHeight,maxHeight:contentHeight,top:-bottomHeight,left:leftWidth}},react_default.a.createElement(TableGrid,{data:data,alternateColors:alternateColors,top:topHeight,left:leftWidth,virtual:virtual,renderer:cellRenderer}))),!topData&&react_default.a.createElement(FakeBorder,{left:leftWidth,top:0,width:rightLeftPos-leftWidth,height:0}),!leftData&&react_default.a.createElement(FakeBorder,{left:0,top:topHeight,height:bottomTopPos-topHeight,width:0}),!bottomData&&react_default.a.createElement(FakeBorder,{left:leftWidth,top:bottomTopPos-2,width:rightLeftPos-leftWidth,height:0}),!rightData&&react_default.a.createElement(FakeBorder,{left:rightLeftPos-2,top:topHeight-2,height:bottomTopPos-topHeight+2+(bottomData?2:0),width:0}))};StickyTable_basicRenderer.__docgenInfo={description:"",methods:[],displayName:"basicRenderer"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/StickyTable.jsx"]={name:"basicRenderer",docgenInfo:StickyTable_basicRenderer.__docgenInfo,path:"src/StickyTable.jsx"}),StickyTable_StickyTable.__docgenInfo={description:"",methods:[],displayName:"StickyTable"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/StickyTable.jsx"]={name:"StickyTable",docgenInfo:StickyTable_StickyTable.__docgenInfo,path:"src/StickyTable.jsx"})}},[[249,1,2]]]);
//# sourceMappingURL=main.4f2e28e123eae73ce8f3.bundle.js.map