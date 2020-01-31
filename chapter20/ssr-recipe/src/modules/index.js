import { combineReducers } from 'redux';
import users, { usersSage } from './users';
import { all } from 'redux-saga/effects';

export function* rootSage() {
    yield all([usersSage()]);
}

const rootReducer = combineReducers({ users });
export default rootReducer;