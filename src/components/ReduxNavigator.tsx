/**
 * Component template.
 * 
 * Note that this file has a `.tsx` suffix, as it contains React elements.
 */

import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Actions, OwnProps, Props } from '../containers/ReduxNavigator'
import { RouterNavigator, Toolbar, BackButton, PageTransitionOptions, RouterUtilState } from 'react-onsenui'
import { Route, NavigationController, NavigationControllerBarOptions, NavigatorContext } from '../types'

export default class extends React.Component<Props & OwnProps & Actions> implements NavigationController {

	static childContextTypes = {
		navigationController: PropTypes.object,
	}

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

	renderToolbar = (route: Route, options?: NavigationControllerBarOptions): JSX.Element => {
		const previousRoute = this.previousRoute(route)
		return (
			<Toolbar>
				{
					options && options.left ? (
						<div className="left">{options.left}</div>
					) : (previousRoute && (
						<div className="left">
							<BackButton onClick={this.props.pop}>
								{previousRoute.title}
							</BackButton>
						</div>
					))
				}
				{
					options && options.center ? (
						<div className="center">{options.center}</div>
					) : (
						<div className="center">{route.title}</div>
					)
				}
				{
					options && options.right && (
						<div className="right">{options.right}</div>
					)
				}
			</Toolbar>
		)
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
			<RouterNavigator 
				{...this.props}
				ref={this.routerNavigator}
				routeConfig={routeConfig as RouterUtilState} 
				renderPage={this.renderPage} 
				onPostPush={this.props.onPostPush}
				onPostPop={this.props.onPostPop}
				swipePop={this.swipePop}
			/>
		)
	}

	getChildContext(): NavigatorContext {
		return {
			navigationController: this,
		}
	}

	private swipePop = (options?: PageTransitionOptions) => {
		if (this.routerNavigator.current) {
			this.routerNavigator.current.popPage(options)
		}
	}

	private renderPage = (route: Route, navigator: RouterNavigator) => {
		const props = {
			...route.props,
			route,
		}

		const Component = this.props.componentRegistry[route.component]
		if (!Component) {
			return (
				<div><p style={{color: 'red'}}><strong>Cannot find component: {route.component}</strong></p></div>
			)
		}

		/* Support a static createRoute method on the route component class. */
		/* tslint:disable-next-line:no-any */
		const AnyComponent = Component as any
		if (AnyComponent.createRoute) {
			route = AnyComponent.createRoute(route)
		}

		return (
			<Component {...props} key={route.key} />
		)
	}
}
