import * as routing from 'onsenui-react-redux-navigator'
import { combineReducers, createStore } from 'redux'

export interface RootStoreState {
	readonly routing: routing.RoutingStoreState
}

export const routingStoreStateSelector = (state: RootStoreState) => state.routing

const reducer = combineReducers<RootStoreState>({
	routing: routing.reducer,
})

export const store = createStore<RootStoreState>(reducer)
