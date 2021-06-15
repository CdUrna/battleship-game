import {makeAutoObservable} from "mobx";

class BoardStore {
    board = [];
    constructor() {
        makeAutoObservable(this)
    }

    updateBoard(board) {
        this.board = [...board];
    }
}
export default new BoardStore();