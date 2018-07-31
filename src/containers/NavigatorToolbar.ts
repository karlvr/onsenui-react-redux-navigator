/**
 * Container template for a component.
 */

/* Import the component from the component path */
import Component from '../components/NavigatorToolbar'

import { ComponentClass, StatelessComponent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

/* Import module actions */
import * as actions from '../actions'
import { Route, NavigatorId } from '../types'

export interface Props {
	
}

/**
 * Interface for properties that the container passes to the component.
 */
export interface OwnProps {
	route: Route
	title?: string
	left?: React.ReactNode
	center?: React.ReactNode
	right?: React.ReactNode
}

/**
 * Interface for action callbacks that the container exposes to the component.
 * The component's `this.props` is typed `Props & Actions`.
 */
export interface Actions {
	pop: (navigator: NavigatorId) => void
}

/** Populate the Props from the store state. */
/* tslint:disable-next-line:no-any */
const mapStateToProps = (state: any, ownProps: OwnProps): Props => {
	return {
		
	}
}

/** Populate the Actions with the callbacks for the component. */
const mapDispatchToProps = (dispatch: Dispatch<{}>, ownProps: OwnProps): Actions => ({
	pop: (navigator) => {
		dispatch(actions.pop(navigator))
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
