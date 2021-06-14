import Cell from "./cell";

export default function Board(props) {
    return (
        <div className="board">
            {props.board.map((row, rowIndex) => (
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