import { useState, useLayoutEffect } from "react";

export default ref => {
  const [sizes, setScrollbarWidths] = useState({
    width: 0,
    height: 0
  });
  useLayoutEffect(() => {
    console.log("layout the boi");

    let detector = document.createElement("div");
    detector.style.width = "1000px";
    detector.style.height = "1000px";
    detector.style.overflow = "scroll";
    detector.style.visibility = "hidden";
    ref.current.appendChild(detector);

    let sizes = {
      width: detector.offsetWidth - detector.clientWidth,
      height: detector.offsetHeight - detector.clientHeight
    };

    ref.current.removeChild(detector);

    setScrollbarWidths(sizes);
  }, [ref]);
  return sizes;
};
