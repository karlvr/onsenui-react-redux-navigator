import { ReduxNavigator, NavigatorContext } from 'onsenui-react-redux-navigator'
import { Page, Tabbar, Tab, TabbarRenderTab } from 'react-onsenui'
import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { store, routingStoreStateSelector } from './redux'

import MyPage from './containers/MyPage'

import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'

class Tabs extends React.Component {

	static contextTypes = {
		navigationController: PropTypes.object,
	}

	context: NavigatorContext

	renderTabs = (): TabbarRenderTab[] => {
		return [
			{
				content: (
					<Page key="example">
						<ReduxNavigator 
							id="example1" 
							rootRoute={{
								component: 'MyPage',
								title: 'Example 1',
								props: {
									index: 1,
								},
							}}
							stateSelector={routingStoreStateSelector}
							swipeable={true}
							componentRegistry={{
								MyPage,
							}}
						/>
					</Page>
				),
				tab: <Tab key="example1" label="Tab 1" />
			},
			{
				content: (
					<Page key="another">
						<ReduxNavigator 
							id="example2" 
							rootRoute={{
								component: 'MyPage',
								title: 'Example 2',
								props: {
									index: 1,
								},
							}}
							stateSelector={routingStoreStateSelector}
							componentRegistry={{
								MyPage,
							}}
						/>
					</Page>
				),
				tab: <Tab key="example2" label="Tab 2" />
			}
		]
	}

	render() {
		return (
			<Page>
				<Tabbar index={0} renderTabs={this.renderTabs} animation="none" />
			</Page>
		)
	}
}

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Tabs />
			</Provider>
		)
	}
}
