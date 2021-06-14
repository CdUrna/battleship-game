import {UPDATE_FIRST_BOARD} from "./types";

const initialState = {
    firstBoard: [],
    secondBoard: [],
};

export const boardReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_FIRST_BOARD:
            return { ...state, firstBoard: action.payload}
        default: return state;
    }
}