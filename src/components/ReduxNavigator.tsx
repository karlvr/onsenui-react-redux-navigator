/**
 * Component template.
 * 
 * Note that this file has a `.tsx` suffix, as it contains React elements.
 */

import * as React from 'react'
import { Actions, OwnProps, Props } from '../containers/ReduxNavigator'
import { RouterNavigator, PageTransitionOptions, RouterUtilState, Page } from 'react-onsenui'
import { Route, NavigationController } from '../types'
import { NavigationControllerContext } from '../NavigatorContext'
import NavigatorToolbar from '../containers/NavigatorToolbar'

export default class extends React.Component<Props & OwnProps & Actions> implements NavigationController {

	private routerNavigator: React.RefObject<RouterNavigator> = React.createRef()

	getNavigatorId = () => {
		return this.props.id
	}

	previousRoute = (route: Route) => {
		const routeStack = this.props.routeConfig.routeStack
		let n = routeStack.lastIndexOf(route)
		if (n === -1) {
			/* This route isn't in the stack, so the previous is the last route in the stack, e.g. pushing the given route */
			n = routeStack.length - 1
		} else {
			/* The previous route in the stack is the previous route for this route */
			n--
		}
		if (routeStack.length > n) {
			return routeStack[n] as Route
		} else {
			return undefined
		}
	}

	componentWillMount() {
		/* When the navigator is mounted, if we don't already have config we initialise using our rootRoute. */
		if (!this.props.routeConfig && this.props.rootRoute) {
			this.props.init(this.props.rootRoute)
		}
	}

	componentWillUnmount() {
		this.props.deinit()
	}

	render() {
		const { routeConfig } = this.props
		if (!routeConfig) {
			return null
		}

		return (
			<NavigationControllerContext.Provider value={this}>
				<RouterNavigator 
					{...this.props}
					ref={this.routerNavigator}
					routeConfig={routeConfig as RouterUtilState} 
					renderPage={this.renderPage} 
					onPostPush={this.props.onPostPush}
					onPostPop={this.props.onPostPop}
					swipePop={this.swipePop}
				/>
			</NavigationControllerContext.Provider>
		)
	}

	private swipePop = (options?: PageTransitionOptions) => {
		if (this.routerNavigator.current) {
			this.routerNavigator.current.popPage(options)
		}
	}

	private renderPage = (route: Route, navigator: RouterNavigator) => {
		const Component = this.props.componentRegistry[route.component]
		if (!Component) {
			return (
				<Page key={route.key} renderToolbar={this.renderErrorToolbar.bind(this, route)}><p style={{color: 'red'}}><strong>Cannot find component: {route.component !== undefined ? route.component : 'undefined'}</strong></p></Page>
			)
		}

		/* Support a static augmentRoute method on the route component class. */
		/* tslint:disable-next-line:no-any */
		const AnyComponent = Component as any
		if (AnyComponent.augmentRoute) {
			route = AnyComponent.augmentRoute(route)
		}

		return (
			<Component route={route} {...route.props} key={route.key} />
		)
	}

	private renderErrorToolbar = (route: Route) => (
		<NavigatorToolbar route={route} />
	)
}
