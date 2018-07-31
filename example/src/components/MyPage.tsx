/**
 * Component template.
 * 
 * Note that this file has a `.tsx` suffix, as it contains React elements.
 */

import * as React from 'react'
import { RouteProps, NavigatorToolbar, WithNavigationControllerProps } from 'onsenui-react-redux-navigator'
import { Page, Button } from 'react-onsenui'

import { OwnProps, Props, Actions } from '../containers/MyPage'

export default class MyPage extends React.Component<OwnProps & Props & Actions & RouteProps & WithNavigationControllerProps> {

	renderToolbar = () => (
		<NavigatorToolbar route={this.props.route} />
	)

	pushNewPage = () => {
		this.props.onPush({
			navigator: this.props.navigationController.getNavigatorId(),
			route: {
				component: 'MyPage',
				title: `Page ${this.props.index}`,
				props: {
					index: this.props.index + 1,
				},
			}
		})
	}

	render() {
		return (
			<Page renderToolbar={this.renderToolbar}>
				<Button onClick={this.pushNewPage}>Push</Button>
			</Page>
		)
	}

}
