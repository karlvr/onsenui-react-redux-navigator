import * as _reducer from './reducer'
import { Reducer } from 'redux'

export const reducer = _reducer.reducer as Reducer<_reducer.StoreState>
export { StoreState as RoutingStoreState } from './reducer'

export { Route, RouteProps, NavigationController, NavigationControllerBarOptions } from './types'

export { default as ReduxNavigator } from './containers/ReduxNavigator'
export { default as NavigatorToolbar} from './containers/NavigatorToolbar'

export { PushPayload as NavigatorPushPayload, push as navigatorPush, pop as navigatorPop } from './actions'
export { withNavigationController, WithNavigationControllerProps } from './NavigatorContext'
