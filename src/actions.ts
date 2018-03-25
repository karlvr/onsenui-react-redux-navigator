import actionCreatorFactory from 'typescript-fsa';
import { ActionCreator } from 'typescript-fsa';
import { NavigatorId, Route } from './types';

/**
 * The action creator for this module. Note that it contains the module name.
 */
const actionCreator = actionCreatorFactory('Routing');

/** The payload required for the push and init actions. */
export interface PushPayload {
	navigator: NavigatorId;
	route: Route;
}

/** Initialise a navigator's root route. */
export const init = actionCreator<PushPayload>('INIT');

/** Deinitialise a navigator, removing it from the store. */
export const deinit = actionCreator<NavigatorId>('DEINIT');

/** Push a new route onto a navigator. */
export const push = actionCreator<PushPayload>('PUSH');

/** Pop the top route off a navigator. */
export const pop = actionCreator<NavigatorId>('POP');

/** Called after a navigator has handled a push. */
export const postPush = actionCreator<NavigatorId>('POST_PUSH');

/** Called after a navigator has handled a pop. */
export const postPop = actionCreator<NavigatorId>('POST_POP');
