/**
 * Component template.
 * 
 * Note that this file has a `.tsx` suffix, as it contains React elements.
 */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Props, Actions, OwnProps } from '../containers/ReduxNavigator';
import { RouterNavigator, Toolbar, BackButton } from 'react-onsenui';
import { Route, NavigationController, NavigationControllerBarOptions, NavigatorContext } from '../types';

export default class extends React.Component<Props & OwnProps & Actions> implements NavigationController {

	static childContextTypes = {
		navigationController: PropTypes.object,
	};

	push = (route: Route) => {
		this.props.push(route);
	}

	pop = () => {
		this.props.pop();
	}

	previousRoute = (route: Route) => {
		const routeStack = this.props.routeConfig.routeStack;
		let n = routeStack.lastIndexOf(route);
		if (n === -1) {
			/* This route isn't in the stack, so the previous is the last route in the stack, e.g. pushing the given route */
			n = routeStack.length - 1;
		} else {
			/* The previous route in the stack is the previous route for this route */
			n--;
		}
		if (routeStack.length > n) {
			return routeStack[n] as Route;
		} else {
			return undefined;
		}
	}

	renderToolbar = (route: Route, options?: NavigationControllerBarOptions): JSX.Element => {
		const previousRoute = this.previousRoute(route);
		return (
			<Toolbar>
				{
					previousRoute && (
						<div className="left">
							<BackButton onClick={this.props.pop}>
								{previousRoute.title}
							</BackButton>
						</div>
					)
				}
				{
					options && options.center ? (
						<div className="center">{options.center}</div>
					) : (
						<div className="center">{options && options.title ? options.title : route.title}</div>
					)
				}
				{
					options && options.right && (
						<div className="right">{options.right}</div>
					)
				}
			</Toolbar>
		);
	}

	renderPage = (route: Route, navigator: RouterNavigator) => {
		const props = {
			...route.props,
			route,
		};

		return (
			<route.component {...props} key={route.key} />
		);
	}

	componentWillMount() {
		/* When the navigator is mounted, if we don't already have config we initialise using our rootRoute. */
		if (!this.props.routeConfig && this.props.rootRoute) {
			this.props.init(this.props.rootRoute);
		}
	}

	componentWillUnmount() {
		this.props.deinit();
	}

	render() {
		const { routeConfig } = this.props;
		if (!routeConfig) {
			return null;
		}

		return (
			<RouterNavigator 
				routeConfig={routeConfig} 
				renderPage={this.renderPage} 
				onPostPush={this.props.onPostPush}
				onPostPop={this.props.onPostPop}
			/>
		);
	}

	getChildContext(): NavigatorContext {
		return {
			navigationController: this,
		};
	}
}
