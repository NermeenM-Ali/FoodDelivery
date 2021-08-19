import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import LocationReducer from './reducers/LocationReducer';
import UserDataReducer from './reducers/UserDataReducer';

// every reducers in the project
const reducers = combineReducers({
    LocationReducer: LocationReducer,
    UserDataReducer: UserDataReducer
})


const store = createStore(reducers, applyMiddleware(thunk))

export { store }