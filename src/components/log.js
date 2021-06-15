import logStore from "../mobx-store/log-store"
import {observer} from "mobx-react";

const Log = observer((props) => {
        return (
            <div className="log">
                {logStore.log.map((row, rowIndex) => (
                    <div className="history-row">
                        {`Ход ${rowIndex}: [${row.x + 1}, ${row.y + 1}] - `}
                        {row.success ? <span className="red-span">Попал</span> : <span className="italic-span">Мимо</span>}
                    </div>
                ))}
            </div>
        )
    }
)

export default Log;