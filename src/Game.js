import React from 'react'
import Board from "./components/board";
import GameOver from "./components/gameOver";
import GameInfo from "./components/gameInfo";
import GameBot from "./utils/gameBot";
import StartGame from "./components/startGame";
import Log from "./components/log";
import boardStore from "./mobx-store/board-store"
import logStore from "./mobx-store/log-store"
import shipsStore from "./mobx-store/ships-store"
import {observer} from "mobx-react";

const Game = observer(() => {


    const gameWithBotInitialize = () => {
        const gameBot = new GameBot();
        const gameBoard = gameBot.GenerateBoard();
        boardStore.updateBoard(gameBoard);
        logStore.clearLog();
        shipsStore.restartShips();
        shipsStore.setShips(gameBot.ships);
        shipsStore.setTotalShipBlocks(gameBot.totalShipBlocks);
    }

    const handleCellClick = (cell) => {
        if (cell.isSelected) {
            return;
        }

        // сохраняем координаты хода для записи в лог
        const dataForLog = {
            x: cell.coordinates.x,
            y: cell.coordinates.y,
            success: false,
        }

        let selectedItem = {...cell};
        selectedItem.isSelected = true;

        let board = [...boardStore.board];
        board[cell.coordinates.x][cell.coordinates.y] = selectedItem;

        shipsStore.incrementTotalShootCount()

        if (selectedItem.isShip) {
            shipsStore.incrementShipBlocksRevealed();

            for (let ship of shipsStore.ships) {
                let isBreak = false;
                for (let shipCell of ship.points) {
                    if (shipCell.x === cell.coordinates.x && shipCell.y === cell.coordinates.y) {
                        shipCell.isRevealed = true;
                        isBreak = true;
                        dataForLog.success = true;
                        break;
                    }
                }
                if (isBreak) {
                    break;
                }
            }
        }

        boardStore.updateBoard(board);
        logStore.updateLog(dataForLog);

        if (shipsStore.shipBlocksRevealed === shipsStore.totalShipBlocks) {
            console.log(true);
            shipsStore.setGameOver(true);
        }
    }

    const handlePlayAgain = () => {
        gameWithBotInitialize();
    }

    return (
        <div className="game">
            <div className="heading">
                <h1>Battleship</h1>
            </div>
            <div>
                <button onClick={handlePlayAgain}>Start to play</button>
            </div>
            <div className="game-board">
                <Board
                    board={boardStore.board}
                    onCellClick={(cell) => handleCellClick(cell)
                    }
                />
                <Log/>
            </div>
            <GameInfo ships={shipsStore.ships}/>
            {shipsStore.gameOver && (
                <GameOver
                    onPlayAgain={() => handlePlayAgain()}
                />
            )}
        </div>
    );
})

export default Game;