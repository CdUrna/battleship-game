import {makeAutoObservable} from "mobx";

class LogStore {
    log = [];
    constructor() {
        makeAutoObservable(this)
    }

    updateLog(item) {
        this.log.push(item);
    }

    clearLog() {
        this.log = [];
    }
}

export default new LogStore()