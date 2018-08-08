import { ReactType } from 'react'
import { RouterUtilRoute, RouterUtilProcessStackItem } from 'react-onsenui'

export type NavigatorId = string
export type ComponentId = string

export interface RouteProps<P> {
	route: Route<P>
}

export interface Route<P> {
	readonly component: ComponentId
	readonly title?: string
	readonly key?: string
	readonly props?: P
}

export interface NavigationController {
	getNavigatorId: () => NavigatorId
	previousRoute: (route: Route<any>) => Route<any> | undefined
}

/** Dummy type so we don't have to expose our internal onsenui types. */
export interface RouterUtilState {
	routeStack: Array<RouterUtilRoute>
	processStack: Array<RouterUtilProcessStackItem>
}

export interface ComponentRegistry {
	[componentId: string]: ReactType
}
