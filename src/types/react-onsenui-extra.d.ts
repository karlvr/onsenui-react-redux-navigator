import { NavigatorAnimationTypes } from 'react-onsenui';
import { Component } from 'react';

declare module 'react-onsenui' {
	export interface RouterUtilProcessStackItem {
		type: string;
		route: RouterUtilRoute;
	}
	
	export interface RouterUtilState {
		routeStack: Array<RouterUtilRoute>;
		processStack: Array<RouterUtilProcessStackItem>;
	}
	
	export type RouterUtilRoute = {};
	
	export type RouterUtilPushPayload = {
		routeConfig: RouterUtilState,
		route: RouterUtilRoute,
		options?: {},
		key?: string,
	};
	
	export type RouterUtilPopPayload = {
		routeConfig: RouterUtilState,
		options?: {},
		key?: string,
	};
	
	export interface RouterUtilType {
		init: (stack: Array<RouterUtilRoute>) => RouterUtilState;
		push: (payload: RouterUtilPushPayload) => RouterUtilState;
		pop: (payload: RouterUtilPopPayload) => RouterUtilState;
		postPush: (routeConfig: RouterUtilState) => RouterUtilState;
		postPop: (routeConfig: RouterUtilState) => RouterUtilState;
	}
	
	export const RouterUtil: RouterUtilType;

	export class RouterNavigator extends Component<{
			renderPage(route: any, navigator?: RouterNavigator): JSX.Element,
			routeConfig: RouterUtilState,
			onPrePush?(): void,
			onPostPush?(): void,
			onPrePop?(): void,
			onPostPop?(): void,
			animation?: NavigatorAnimationTypes,
			animationOptions?: AnimationOptions,
			swipeable?: boolean,
			swipePop?: (options?: PageTransitionOptions) => void,
		}, any> {
			pages: any[];
			routeConfig: RouterUtilState;
			resetPage(route: any, options?: PageTransitionOptions): Promise<HTMLElement>;
			resetPageStack(route: any, options?: PageTransitionOptions): Promise<HTMLElement>;
			pushPage(route: any, options?: PageTransitionOptions): Promise<HTMLElement>;
			popPage(options?: PageTransitionOptions): Promise<HTMLElement>;
	}
}
