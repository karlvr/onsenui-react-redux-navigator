import { reducerWithInitialState, ReducerBuilder } from 'typescript-fsa-reducers';
import { RouterUtil, RouterUtilState } from 'react-onsenui';

/* Import our module's actions */
import * as actions from './actions';
import { Route } from './types';

/**
 * Export the StoreState interface for this module. We always name this interface
 * `StoreState` so it is consistent across each of our modules.
 * All of the properties in the interface should be annotated `readonly`, as should
 * all of the properties down the tree.
 */
export interface StoreState {
	readonly stacks: Stacks;	
}

export interface Stacks {
	[id: string]: RouterUtilState;
}

/**
 * The initial store state for this module.
 */
const INITIAL_STATE: StoreState = {
	stacks: {},
};

let routeAutoKeyCounter = 0;

/** Ensure the route object is complete before it enters the store. */
function completeRoute(route: Route): Route {
	/* Support a static createRoute method on the route component class. */
	if ((route.component as any).createRoute) {
		route = (route.component as any).createRoute(route);
	}

	if (!route.key) {
		/* Auto-assign a key for the route if one wasn't given. */
		route = { ...route, key: `route-${routeAutoKeyCounter++}` };
	}
	return route;
}

/**
 * Reducer function for this module.
 */
export const reducer = reducerWithInitialState(INITIAL_STATE)
	.case(actions.init, (state, payload) => {
		let result = { ...state };
		result.stacks = { ...result.stacks };
		result.stacks[payload.navigator] = RouterUtil.init([ completeRoute(payload.route) ]);
		return result;
	})
	.case(actions.deinit, (state, navigatorId) => {
		let result = { ...state };
		result.stacks = { ...result.stacks };
		delete result.stacks[navigatorId];
		return result;
	})
	.case(actions.push, (state, payload) => {
		let result = { ...state };
		result.stacks = { ...result.stacks };
		result.stacks[payload.navigator] = RouterUtil.push(
			{ routeConfig: result.stacks[payload.navigator], 
			route: completeRoute(payload.route) });
		return result;
	})
	.case(actions.pop, (state, navigatorId) => {
		let result = { ...state };
		result.stacks = { ...result.stacks };
		result.stacks[navigatorId] = RouterUtil.pop({ routeConfig: result.stacks[navigatorId] });
		return result;
	})
	.case(actions.postPush, (state, navigatorId) => {
		let result = { ...state };
		result.stacks = { ...result.stacks };
		result.stacks[navigatorId] = RouterUtil.postPush(result.stacks[navigatorId]);
		return result;
	})
	.case(actions.postPop, (state, navigatorId) => {
		let result = { ...state };
		result.stacks = { ...result.stacks };
		result.stacks[navigatorId] = RouterUtil.postPop(result.stacks[navigatorId]);
		return result;
	})
	;
