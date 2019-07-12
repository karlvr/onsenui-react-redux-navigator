/**
 * Container template for a component.
 */

/* Import the component from the component path */
import Component from '../components/ReduxNavigator'

import { ComponentClass, StatelessComponent } from 'react'
import { connect } from 'react-redux'
import { Dispatch, Action } from 'redux'

/* Import module actions */
import * as actions from '../actions'
import { NavigatorAnimationTypes, AnimationOptions } from 'react-onsenui'
import { Route, RouterUtilState, ComponentRegistry } from '../types'
import { StoreState } from '../reducer'

export interface Props {
	routeConfig: RouterUtilState
}

/**
 * Interface for properties that the container passes to the component.
 */
export interface OwnProps {
	id: string
	rootRoute: Route<any>
	animation?: NavigatorAnimationTypes,
	animationOptions?: AnimationOptions,
	swipeable?: boolean,
	componentRegistry: ComponentRegistry

	/* tslint:disable-next-line:no-any */
	stateSelector: (store: any) => StoreState

	onPrePush?(): void,
	onPostPush?(): void,
	onPrePop?(): void,
	onPostPop?(): void,
}

/**
 * Interface for action callbacks that the container exposes to the component.
 * The component's `this.props` is typed `Props & Actions`.
 */
export interface Actions {
	onPostPush: () => void
	onPostPop: () => void
	init: (route: Route<any>) => void
	deinit: () => void
}

/** Populate the Props from the store state. */
/* tslint:disable-next-line:no-any */
const mapStateToProps = (state: any, ownProps: OwnProps): Props => {
	const routingState = ownProps.stateSelector(state)

	return {
		routeConfig: routingState.stacks[ownProps.id],
	}
}

/** Populate the Actions with the callbacks for the component. */
const mapDispatchToProps = (dispatch: Dispatch<Action<any>>, ownProps: OwnProps): Actions => ({
	init: (route) => {
		dispatch(actions.init({ route, navigator: ownProps.id }))
	},
	deinit: () => {
		dispatch(actions.deinit(ownProps.id))
	},
	onPostPush: () => {
		dispatch(actions.postPush(ownProps.id))
	},
	onPostPop: () => {
		dispatch(actions.postPop(ownProps.id))
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
