import shipsStore from "../mobx-store/ships-store"
import {observer} from "mobx-react";

const GameOver = observer((props) => {

        let accuracy = 100 * shipsStore.totalShipBlocks / shipsStore.totalShootCount;

        return (
            <div className="modal">
                <div className="modal-content">
                    <h1>Game Over</h1>
                    <p>
                        You have sunk all ships with <strong>{parseInt(accuracy)}% </strong>{" "}
                        accuracy
                    </p>
                    <button onClick={props.onPlayAgain}> Play Again</button>
                </div>
            </div>
        );
    }
)

export default GameOver;