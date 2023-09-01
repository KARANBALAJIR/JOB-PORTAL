import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { loadJobReducer } from './reducers/jobReducer';

// combine reducers
const reducer = combineReducers({
    loadJobs: loadJobReducer
});


//intial state
let initalState = {};
const middleware = [thunk];
const store = createStore(reducer, initalState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;


