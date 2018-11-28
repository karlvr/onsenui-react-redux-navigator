/**
 * Component template.
 * 
 * Note that this file has a `.tsx` suffix, as it contains React elements.
 */

import * as React from 'react'
import { Toolbar, BackButton } from 'react-onsenui'
import { Props, OwnProps, Actions } from '../containers/NavigatorToolbar'
import { NavigationController, Route } from '../types'
import { NavigationControllerContext } from '../NavigatorContext'

export default class NavigatorToolbar extends React.Component<Props & Actions & OwnProps> {

	render() {
		return (
			<NavigationControllerContext.Consumer>
				{navigationController => this.props.renderToolbar 
					? this.props.renderToolbar(navigationController!, this.props, {
						previousRoute: () => this.previousRoute(navigationController!),
						pop: () => this.pop(navigationController!),
					}) 
					: this.renderToolbar(navigationController!)}
			</NavigationControllerContext.Consumer>
		)
	}

	protected renderToolbar = (navigationController: NavigationController): JSX.Element => {
		const previousRoute = this.previousRoute(navigationController)
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
						<div className="center">{this.props.title || this.props.route.title}</div>
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

	public previousRoute = (navigationController: NavigationController): Route<any> | undefined => {
		return navigationController.previousRoute(this.props.route)
	}

	public pop = (navigationController: NavigationController) => {
		this.props.pop(navigationController.getNavigatorId())
	}

}
