import * as _reducer from './reducer';
import * as _types from './types';
import * as _container from './containers/ReduxNavigator';
import { ComponentClass, StatelessComponent } from 'react';
import { Reducer } from 'redux';

export const reducer = _reducer.reducer as Reducer<RoutingStoreState>;
export type RoutingStoreState = _reducer.StoreState;

export type Route = _types.Route;
export type RouteProps = _types.RouteProps;
export type NavigatorContext = _types.NavigatorContext;
export type NavigationController = _types.NavigationController;
export type NavigationControllerBarOptions = _types.NavigationControllerBarOptions;

export const ReduxNavigator = _container.default;
