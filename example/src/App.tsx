import { ReduxNavigator, RouteProps, NavigatorContext } from 'onsenui-react-redux-navigator';
import { Page, Button, Tabbar, Tab, TabbarRenderTab } from 'react-onsenui';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { store, routingStoreStateSelector } from './modules';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

class MyPage extends React.Component<RouteProps & {
	index: number	
}> {

	static contextTypes = {
		navigationController: PropTypes.object,
	};

	context: NavigatorContext;

	renderToolbar = () => {
		return this.context.navigationController.renderToolbar(this.props.route);
	}

	pushNewPage = () => {
		this.context.navigationController.push({
			component: MyPage,
			title: `Page ${this.props.index}`,
			props: {
				index: this.props.index + 1,
			},
		});
	}

	render() {
		return (
			<Page renderToolbar={this.renderToolbar}>
				<Button onClick={this.pushNewPage}>Push</Button>
			</Page>
		);
	}
}

class Tabs extends React.Component {

	static contextTypes = {
		navigationController: PropTypes.object,
	};

	context: NavigatorContext;

	renderTabs = (): TabbarRenderTab[] => {
		return [
			{
				content: (
					<Page key="example">
						<ReduxNavigator 
							id="example1" 
							rootRoute={{
								component: MyPage,
								title: 'Example 1',
								props: {
									index: 1,
								},
							}}
							stateSelector={routingStoreStateSelector}
							swipeable={true}
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
								component: MyPage,
								title: 'Example 2',
								props: {
									index: 1,
								},
							}}
							stateSelector={routingStoreStateSelector}
						/>
					</Page>
				),
				tab: <Tab key="example2" label="Tab 2" />
			}
		];
	}

	render() {
		return (
			<Page>
				<Tabbar index={0} renderTabs={this.renderTabs} animation="none" />
			</Page>
		);
	}
}

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Tabs />
			</Provider>
		);
	}
}
