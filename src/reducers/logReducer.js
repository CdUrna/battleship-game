import {UPDATE_LOG, CLEAR_LOG} from "./types";

const initialState = {
    history: [],
};

export const logReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_LOG:
            return { ...state, history: [...state.history, action.payload]}
        case CLEAR_LOG:
            return { ...state, history: []}
        default: return state;
    }
}