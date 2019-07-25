import { useState, useLayoutEffect } from "react";

// Given the ref of a DOM node, find the size of scroll bars rendered within it.
export default ref => {
  const [sizes, setScrollbarWidths] = useState({
    width: 0,
    height: 0
  });
  // After the component loads, do this. If we ever change the ref, we'll re-compute, but if the ref stays the same
  // (points to the same element) this will only run once.
  useLayoutEffect(() => {
    // Make a div
    let detector = document.createElement("div");
    // Make it a somewhat arbitrary size that's bigger than we expect the scroll bars to be.
    detector.style.width = "1000px";
    detector.style.height = "1000px";
    // Make it overflow: scroll. This gives it scroll bars even if it has nothing to scroll (which it won't because it
    // will be empty)
    detector.style.overflow = "scroll";
    // This should get added and removed from the DOM before the browser repaints. In the off chance it doesn't, make
    // sure it's invisible.
    detector.style.visibility = "hidden";
    // Add it to the ref component
    ref.current.appendChild(detector);

    // offsetWidth is the space outside the div, clientWidth is the space inside it. So the difference is the size of
    // the scroll bar!
    let sizes = {
      width: detector.offsetWidth - detector.clientWidth,
      height: detector.offsetHeight - detector.clientHeight
    };

    // Delete our detector.
    ref.current.removeChild(detector);

    // Save the values!
    setScrollbarWidths(sizes);
  }, [ref]);
  return sizes;
};
