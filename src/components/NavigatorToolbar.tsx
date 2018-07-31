/**
 * Component template.
 * 
 * Note that this file has a `.tsx` suffix, as it contains React elements.
 */

import * as React from 'react'
import { Toolbar, BackButton } from 'react-onsenui'
import { Props, OwnProps, Actions } from '../containers/NavigatorToolbar'
import { Route, NavigationController } from '../types'
import { NavigationControllerContext } from '../NavigatorContext'

export default class extends React.Component<Props & Actions & OwnProps> {

	render() {
		return (
			<NavigationControllerContext.Consumer>
				{navigationController => this.renderToolbar(navigationController!)}
			</NavigationControllerContext.Consumer>
		)
	}

	private renderToolbar = (navigationController: NavigationController): JSX.Element => {
		const previousRoute = navigationController.previousRoute(this.props.route)
		return (
			<Toolbar>
				{
					this.props.left ? (
						<div className="left">{this.props.left}</div>
					) : (previousRoute && (
						<div className="left">
							<BackButton onClick={this.pop.bind(this, navigationController)}>
								{previousRoute.title}
							</BackButton>
						</div>
					))
				}
				{
					this.props.center ? (
						<div className="center">{this.props.center}</div>
					) : (
						<div className="center">{this.props.route.title}</div>
					)
				}
				{
					this.props.right && (
						<div className="right">{this.props.right}</div>
					)
				}
			</Toolbar>
		)
	}

	private pop = (navigationController: NavigationController) => {
		this.props.pop(navigationController.getNavigatorId())
	}

}
