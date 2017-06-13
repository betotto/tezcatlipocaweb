/* eslint no-underscore-dangle: 0 */
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../modules';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
	return createStore(
		rootReducer,
		initialState,
		compose(applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
	);
}
