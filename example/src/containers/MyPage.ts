/**
 * Container template for a component.
 */

/* Import the component from the component path */
import Component from '../components/MyPage'

import { connect } from 'react-redux'
import { Dispatch, Action } from 'redux'
import { navigatorPush, NavigatorPushPayload, withNavigationController } from 'onsenui-react-redux-navigator'

/* Import RootStoreState */
import { RootStoreState } from '../redux'

/* Import module actions */
// import * as actions from '../actions'

/** Interface for properties that are passed to the container/ */
export interface OwnProps {
	index: number
}

/** Interface for properties that the container passes to the component. */
export interface Props {
	// exampleProperty: string
}

/**
 * Interface for action callbacks that the container exposes to the component.
 * The component's `this.props` is typed `Props & Actions`.
 */
export interface Actions {
	onPush: (payload: NavigatorPushPayload) => void
}

/** Populate the Props from the store state. */
const mapStateToProps = (state: RootStoreState, ownProps: OwnProps): Props => {
	return {
		// exampleProperty: state.template.name,
	}
}

/** Populate the Actions with the callbacks for the component. */
const mapDispatchToProps = (dispatch: Dispatch<Action>): Actions => ({
	onPush: (payload) => {
		dispatch(navigatorPush(payload))
	},
})

export default withNavigationController(connect(mapStateToProps, mapDispatchToProps)(Component))
