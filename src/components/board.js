import Cell from "./cell";
import boardStore from "../mobx-store/board-store"
import {observer} from "mobx-react";

const Board = observer((props) => {
        return (
            <div className="board">
                {boardStore.board.map((row, rowIndex) => (
                    <div className="row" key={row}>
                        {row.map((cell, colIndex) => (
                            <Cell
                                key={rowIndex + "" + colIndex}
                                onCellClick={() =>
                                    props.onCellClick(cell)
                                }
                                cell={cell}
                            />
                        ))}
                    </div>
                ))}
            </div>
        );
    }
)

export default Board;