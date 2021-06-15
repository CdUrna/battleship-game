import shipsStore from "../mobx-store/ships-store"
import {observer} from "mobx-react";

const GameInfo = observer((props) => {
    return (
        <div className="game-info">
            <p>Sink all ships by clicking on grid</p>
            <div className="ship-info">
                {shipsStore.ships.map((ship) => (
                    <div className="ship-item">
                        {ship.points.map((cell) =>(
                            <div
                                className={
                                    "ship-block " +
                                    (cell.isRevealed ? "revealed " : "")
                                }
                            />
                        ))

                        }
                    </div>
                ))}
            </div>
        </div>
    );
})

export default GameInfo;