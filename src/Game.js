import React from 'react'
import Board from "./components/board";
import GameOver from "./components/gameOver";
import GameInfo from "./components/gameInfo";
import GameUtil from "./utils/gameUtil";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.gameInitialize();
  }

  gameInitialize() {
    const gameUtil = new GameUtil(this.props.size);
    const gameBoard = gameUtil.GenerateBoard();
    this.state = {
      board: gameBoard,
      ships: gameUtil.ships,
      shipBlocksRevealed: 0,
      totalShipBlocks: gameUtil.totalShipBlocks,
      totalShootCount: 0,
      gameOver: false
    };
  }

  handleCellClick(cell) {
    if (cell.isSelected) {
      return;
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

  render() {
    return (
        <div className="game">
          <div className="heading">
            <h1>Battleship</h1>
          </div>
          <div className="game-board">
            <Board
                board={this.state.board}
                onCellClick={(cell) =>
                    this.handleCellClick(cell)
                }
            />
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
