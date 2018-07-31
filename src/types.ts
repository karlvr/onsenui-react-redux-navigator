import { ReactType } from 'react'

export type NavigatorId = string
export type ComponentId = string

export interface RouteProps {
	route: Route
}

export interface Route {
	readonly component: ComponentId
	readonly title?: string
	readonly key?: string
	readonly props?: {}
}

export interface NavigatorContext {
	navigationController: NavigationController
}

export interface NavigationController {
	getNavigatorId: () => NavigatorId
	previousRoute: (route: Route) => Route | undefined
	renderToolbar: (route: Route, options?: NavigationControllerBarOptions) => React.ReactNode | undefined
}

export interface NavigationControllerBarOptions {
	left?: React.ReactNode
	center?: React.ReactNode
	right?: React.ReactNode
}

/** Dummy type so we don't have to expose our internal onsenui types. */
export type RouterUtilRoute = {}

/** Dummy type so we don't have to expose our internal onsenui types. */
export interface RouterUtilState {
	routeStack: Array<RouterUtilRoute>
}

export interface ComponentRegistry {
	[componentId: string]: ReactType
}
