/**
 * Component template.
 * 
 * Note that this file has a `.tsx` suffix, as it contains React elements.
 */

import * as React from 'react'
import { Toolbar, BackButton } from 'react-onsenui'
import { Props, OwnProps, Actions } from '../containers/NavigatorToolbar'
import { Route, NavigationController, NavigationControllerBarOptions } from '../types'
import { NavigationControllerContext } from '../NavigatorContext'

export default class extends React.Component<Props & Actions & OwnProps> {

	render() {
		const { route, options } = this.props

		return (
			<NavigationControllerContext.Consumer>
				{navigationController => this.renderToolbar(route, navigationController!, options)}
			</NavigationControllerContext.Consumer>
		)
	}

	private renderToolbar = (route: Route, navigationController: NavigationController, options?: NavigationControllerBarOptions): JSX.Element => {
		const previousRoute = navigationController.previousRoute(route)
		return (
			<Toolbar>
				{
					options && options.left ? (
						<div className="left">{options.left}</div>
					) : (previousRoute && (
						<div className="left">
							<BackButton onClick={this.pop.bind(this, navigationController)}>
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

	private pop = (navigationController: NavigationController) => {
		this.props.pop(navigationController.getNavigatorId())
	}

}
