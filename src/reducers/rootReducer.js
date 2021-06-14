import { combineReducers } from 'redux';
import {boardReducer} from "./boardsReducer";
import {logReducer} from "./logReducer";

export const rootReducer = combineReducers( {
    boards: boardReducer,
    log: logReducer,
})