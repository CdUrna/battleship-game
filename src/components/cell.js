export default function Cell(props) {
    return (
        <div
            className={
                "cell " +
                (props.cell.isSelected ? "selected " : "") +
                (props.cell.isShip ? "ship " : "")
            }
            onClick={props.onCellClick}
        />
    );
}