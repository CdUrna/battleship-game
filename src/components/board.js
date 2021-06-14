import Cell from "./cell";
import {connect} from "react-redux";

const Board = (props) => {
    return (
        <div className="board">
            {props.firstBoard.map((row, rowIndex) => (
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

const mapStateToProps = (state) => {
    return {
        firstBoard: state.boards.firstBoard,
        secondBoard: state.boards.secondBoard,
    };
}

export default connect(mapStateToProps, null)(Board);