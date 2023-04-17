import { createStore, combineReducers } from 'redux';

import buttonReducer from './button/reducer';

const reducers = combineReducers({
    buttonReducer,
});

const store = createStore(
    reducers,
);

export default store;