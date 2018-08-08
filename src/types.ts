import { ReactType } from 'react'
import { RouterUtilRoute, RouterUtilProcessStackItem } from 'react-onsenui'

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

export interface NavigationController {
	getNavigatorId: () => NavigatorId
	previousRoute: (route: Route) => Route | undefined
}

/** Dummy type so we don't have to expose our internal onsenui types. */
export interface RouterUtilState {
	routeStack: Array<RouterUtilRoute>
	processStack: Array<RouterUtilProcessStackItem>
}

export interface ComponentRegistry {
	[componentId: string]: ReactType
}
