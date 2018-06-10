/**
 * Container template for a component.
 */

/* Import the component from the component path */
import Component from '../components/ReduxNavigator';

import { ComponentClass, StatelessComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

/* Import module actions */
import * as actions from '../actions';
import { RouterUtilState, RouterNavigator, NavigatorAnimationTypes, AnimationOptions } from 'react-onsenui';
import { Route } from '../types';
import { StoreState } from '../reducer';

/**
 * Interface for properties that the container passes to the component.
 */
export interface Props {
	routeConfig: RouterUtilState;
}

export interface OwnProps {
	id: string;
	rootRoute: Route;
	stateSelector: (store: any) => StoreState;

	onPrePush?(): void,
	onPostPush?(): void,
	onPrePop?(): void,
	onPostPop?(): void,
	animation?: NavigatorAnimationTypes,
	animationOptions?: AnimationOptions,
	swipeable?: boolean,
}

/**
 * Interface for action callbacks that the container exposes to the component.
 * The component's `this.props` is typed `Props & Actions`.
 */
export interface Actions {
	push: (route: Route) => void;
	pop: () => void;
	onPostPush: () => void;
	onPostPop: () => void;
	init: (route: Route) => void;
	deinit: () => void;
}

/** Populate the Props from the store state. */
const mapStateToProps = (state: any, ownProps: OwnProps): Props => {
	const routingState = ownProps.stateSelector(state);

	return {
		routeConfig: routingState.stacks[ownProps.id],
	};
};

/** Populate the Actions with the callbacks for the component. */
const mapDispatchToProps = (dispatch: Dispatch<{}>, ownProps: OwnProps): Actions => ({
	init: (route) => {
		dispatch(actions.init({ route, navigator: ownProps.id }));
	},
	deinit: () => {
		dispatch(actions.deinit(ownProps.id));
	},
	push: (route) => {
		dispatch(actions.push({ route, navigator: ownProps.id }));
	},
	pop: () => {
		dispatch(actions.pop(ownProps.id));
	},
	onPostPush: () => {
		dispatch(actions.postPush(ownProps.id));
	},
	onPostPop: () => {
		dispatch(actions.postPop(ownProps.id));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
