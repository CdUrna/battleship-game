import {makeAutoObservable} from "mobx";

class ShipsStore {
    ships = [];
    shipBlocksRevealed = 0;
    totalShipBlocks = 0;
    totalShootCount = 0;
    gameOver = false;

    constructor() {
        makeAutoObservable(this)
    }

    setShips(ships) {
        this.ships = [...ships];
    }

    incrementTotalShootCount() {
        this.totalShootCount++;
    }

    incrementShipBlocksRevealed() {
        this.shipBlocksRevealed++;
    }

    setTotalShipBlocks(blocks) {
        this.totalShipBlocks = blocks;
    }

    setGameOver(status) {
        this.gameOver = status;
    }

    restartShips() {
        this.gameOver = false;
        this.shipBlocksRevealed = 0;
        this.totalShipBlocks = 0;
        this.totalShootCount = 0;
    }
}
export default new ShipsStore();