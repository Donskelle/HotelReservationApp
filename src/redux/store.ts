import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';
import {State as UserState} from './reducers/user'
import {State as RoomsState} from './reducers/rooms'


export interface RootState {
  user: UserState
  rooms: RoomsState
}

const composeEnhancers = (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(
  reducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
);
