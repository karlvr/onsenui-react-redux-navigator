import { ReactType } from 'react';

export type NavigatorId = string;

export interface RouteProps {
	route: Route;
}

export interface Route {
	readonly component: ReactType;
	readonly title?: string;
	readonly key?: string;
	readonly props?: {};
}

export interface NavigatorContext {
	navigationController: NavigationController;
}

export interface NavigationController {
	push: (route: Route) => void;
	pop: () => void;
	previousRoute: (route: Route) => Route | undefined;
	renderToolbar: (route: Route, options?: NavigationControllerBarOptions) => JSX.Element | undefined;
}

export interface NavigationControllerBarOptions {
	title?: string;
	right?: JSX.Element;
}
