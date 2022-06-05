import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'
import thunkMiddleware from 'redux-thunk'

export default createStore(rootReducer, applyMiddleware(thunkMiddleware))
