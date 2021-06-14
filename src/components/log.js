import {connect} from "react-redux";

const Log = (props) => {
    return (
        <div className="log">
            {props.history.map((row, rowIndex) => (
                <div className="history-row">
                    {`Ход ${rowIndex}: [${row.x + 1}, ${row.y + 1}] - `}
                    {row.success ? <span className="red-span">Попал</span> : <span className="italic-span">Мимо</span> }
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        history: state.log.history,
    };
}

export default connect(mapStateToProps, null)(Log);