import React from 'react'
import Board from "./components/board";
import GameOver from "./components/gameOver";
import GameInfo from "./components/gameInfo";
import GameBot from "./utils/gameBot";
import StartGame from "./components/startGame";
import {updateFirstBoard, updateLog, clearLog} from "./reducers/actions";
import {connect} from "react-redux";
import Log from "./components/log";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.gameInitialize();
  }

  gameInitialize() {
    const gameBot = new GameBot(this.props.size);
    const gameBoard = gameBot.GenerateBoard();
    this.props.updateFirstBoard(gameBoard);
    this.props.clearLog();
    this.state = {
      board: gameBoard,
      ships: gameBot.ships,
      shipBlocksRevealed: 0,
      totalShipBlocks: gameBot.totalShipBlocks,
      totalShootCount: 0,
      gameOver: false
    };
  }

  handleCellClick(cell) {
    console.log('this.state', this.state);
    if (cell.isSelected) {
      return;
    }

    const dataForLog = {
      x: cell.coordinates.x,
      y: cell.coordinates.y,
      success: false,
    }

    let selectedItem = { ...cell };
    selectedItem.isSelected = true;

    let board = [...this.state.board];
    board[cell.coordinates.x][cell.coordinates.y] = selectedItem;

    let totalShootCount = this.state.totalShootCount;
    totalShootCount += 1;

    let shipBlocksRevealed = this.state.shipBlocksRevealed;
    let ships = this.state.ships;

    if (selectedItem.isShip) {
      shipBlocksRevealed += 1;

      for(let ship of ships){
        let isBreak = false;
        for(let shipCell of ship.points){
          if(shipCell.x === cell.coordinates.x && shipCell.y === cell.coordinates.y){
            shipCell.isRevealed = true;
            isBreak = true;
            dataForLog.success = true;
            break;
          }
        }
        if(isBreak){
          break;
        }
      }
      console.log(this.state);

    }

    this.setState({
      ships:ships,
      board: board,
      shipBlocksRevealed: shipBlocksRevealed,
      totalShootCount: totalShootCount
    });
    this.props.updateFirstBoard(board);
    this.props.updateLog(dataForLog);

    if (shipBlocksRevealed === this.state.totalShipBlocks) {
      this.setState({
        gameOver: true
      });
    }
  }

  handlePlayAgain() {
    this.gameInitialize();

    this.setState(this.state);
  }

  handlePlayerOption(player) {
    console.log(player);
    const players = player === 'one' ? 1 : 2;
    this.setState({
      players,
    });
  }

  render() {
    return (
        <div className="game">
          <div className="heading">
            <h1>Battleship</h1>
          </div>
          {/*<div>*/}
          {/*  <StartGame handlePlayerOption={this.handlePlayerOption.bind(this)}/>*/}
          {/*</div>*/}
          <div className="game-board">
            <Board
                board={this.state.board}
                onCellClick={(cell) =>
                    this.handleCellClick(cell)
                }
            />
          <Log/>
          </div>
          <GameInfo ships={this.state.ships} />
          {this.state.gameOver && (
              <GameOver
                  game={this.state}
                  onPlayAgain={() => this.handlePlayAgain()}
              />
          )}
        </div>
    );
  }
}

const mapDispatchToProps = {
  updateFirstBoard,
  updateLog,
  clearLog,
};

export default connect(null, mapDispatchToProps)(Game);