import {CLEAR_LOG, UPDATE_FIRST_BOARD, UPDATE_LOG} from "./types";

export const updateFirstBoard = (firstBoard) => {
    return {
        type: UPDATE_FIRST_BOARD,
        payload: firstBoard,
    }
}

export const updateLog = (data) => {
    return {
        type: UPDATE_LOG,
        payload: data,
    }
}

export const clearLog = () => {
    return {
        type: CLEAR_LOG,
    }
}