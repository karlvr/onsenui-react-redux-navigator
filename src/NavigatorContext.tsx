import * as React from 'react'
import { NavigationController } from './types'

export const NavigationControllerContext = React.createContext<NavigationController | undefined>(undefined)

export interface WithNavigationControllerProps {
	navigationController: NavigationController
}

export const withNavigationController = (Component: React.ComponentType<WithNavigationControllerProps>) =>
	class WithNavigationController extends React.Component<WithNavigationControllerProps> {
		render() {
			return (
				<NavigationControllerContext.Consumer>
					{navigationController => (
						<Component {...this.props} navigationController={navigationController!} />
					)}
				</NavigationControllerContext.Consumer>
			)
		}
	}
