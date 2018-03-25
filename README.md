# onsenui-react-redux-navigator

A package to integrate Redux with an Onsen UI `<RouterNavigator>` React component.

We setup a React component, `<ReduxNavigator>`, that provides a context to child React components
allowing them to push new pages, to pop, and to render a title bar / toolbar including a page
title and back button.

`<ReduxNavigator` requires the following parameters:

* `id` an id string to uniquely identify the navigator in the app, so we can track multiple
  active navigators (such as, one per tab).
* `rootRoute` the `Route` to show in the navigator when it is first loaded.
* `stateSelector` a function to select the routing state from the Redux store.

`Route` is an object that contains the following properties:

* `component` a React component class to render the page in the navigator.
* `title` the title of the page.
* `props` props to pass to the component

## Example

See the `example` folder for a working example created using `create-react-app` with TypeScript.

## Caveats

This relies on some extra type definitions for `react-onsenui`, which are included in the example.
