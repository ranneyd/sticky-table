This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Demo made with the lovely [Storybook Project](https://github.com/storybookjs/storybook).

This is a remake of [the incredible react-window lib by @bvaughn](https://github.com/bvaughn/react-window). It has
optionally "locked" headers on all sides implemented with `position: sticky`.

[Live Demo](https://ranneyd.github.io/sticky-table).

# Why

The latest version of Chrome for MacOSX (and it looks like other platforms too) computes scrolling in a separate thread.
This is to get the "smooth scrolling effect". However, this means scrolling animates faster than V8/Chrome redraw. Thus,
if you want to hook into something scrolling and do something with JavaScript, it won't be synchronized. If you want
"sticky headers", this is a big problem. You can get it pretty performant using absolute positioning (see `SyncedTable`
in this repo), which will be perfectly synchronized on standard monitors. However, it failed on a Macbook Pro screen.

I turned to `position: sticky`, which is essentially designed for this use case. This component (and the component in
the demo) is `StickyTable`.

# Compatibility

This uses hooks and requires React 16.8+.

`position: sticky`, and thus this, won't work in [some browsers, including IE11](https://caniuse.com/#feat=css-sticky).
There are ways to work around it, namely [this library](https://github.com/dollarshaveclub/stickybits).

# `npm start`

Runs the storybook demo.
Open [http://localhost:6006/](http://localhost:6006/) to view it in the browser.
