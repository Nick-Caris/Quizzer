// Imports
import { createStore, applyMiddleware } from 'redux'
import { RootReducer } from './reducers'
import thunk from 'redux-thunk'

// Creation of redux store, uses the following middleware:
// * Redux thunk: to be able to use async actions
export const store = createStore(RootReducer, applyMiddleware(thunk));
