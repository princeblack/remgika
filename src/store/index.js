import { createStore, applyMiddleware } from 'redux';
import mainReducer from '../reducers/mainReducer';
import thunk from 'redux-thunk';

const store = createStore(mainReducer, applyMiddleware(thunk));

export default store;