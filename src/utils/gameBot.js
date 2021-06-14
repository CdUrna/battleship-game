export default class GameBot {
    constructor(size) {
        this.size = size;
        console.clear();
    }

    board = null;
    ships = [];
    totalShipBlocks = 0;
    invalidAttempts = 0;

    GenerateBoard() {
        this.SetEmptyBoard();
        this.SetShipsLength();
        this.SetAllShips();
        return this.board;
    }

    SetEmptyBoard() {

        let emptyBoard = [];

        for (let x = 0; x < this.size; x++) {
            emptyBoard.push([]);
            for (let y = 0; y < this.size; y++) {
                emptyBoard[x].push({
                    isSelected: false,
                    isShip: false,
                    coordinates: {
                        x: x,
                        y: y
                    }
                });
            }
        }

        this.board = emptyBoard;
    }

    SetShipsLength() {
        const shipsMap = [[1,4],[2,3],[3,2],[4,1]]; // 4 однопалубных, 3 двухпалубных, 2 трёхпалубных, и 1 четырёхпалубный
        shipsMap.map(ship => {
            for (let i = 0; i < ship[0]; i++) {
                let shipLength = ship[1];
                this.ships.push({ length: shipLength });
                this.totalShipBlocks += shipLength;
            }
        })
    }

    SetAllShips() {
        for (let i = 0; i < this.ships.length; i++) {
            this.BuildShip(this.ships[i]);
        }
    }

    BuildShip(ship) {
        let boardCopy = GameBot.CopyArrayOfObjects(this.board);
        let direction = this.GetDirection();

        let shipCoordinates = [];

        let startPoint = {
            x: this.GetRandomNumber(0, this.size - 1),
            y: this.GetRandomNumber(0, this.size - 1),
            isRevealed: false
        };

        let currentPoint;

        for (let i = 1; i <= ship.length; i++) {

            let nextPoint =
                i === 1 ? startPoint : this.getNextPoint(currentPoint, direction);

            if (!this.IsValidPoint(boardCopy, nextPoint)) {
                this.invalidAttempts += 1;
                this.BuildShip(ship);
                return;
            }

            this.SetIsShip(boardCopy, nextPoint);
            currentPoint = nextPoint;
            shipCoordinates.push(currentPoint);
        }

        this.board = boardCopy;

        ship["points"] = shipCoordinates;
    }

    static CopyArrayOfObjects(arrayObj) {
        return JSON.parse(JSON.stringify(arrayObj));
    }

    IsValidPoint(board, point) {
        //inside the board
        if (!board[point.x] || !board[point.x][point.y]) {
            return false;
        }
        //already a ship check
        if (board[point.x][point.y].isShip && this.board[point.x][point.y].isShip) {
            return false;
        }

        return true;
    }

    getNextPoint(currentPoint, direction) {
        let nextPoint = {};
        switch (direction) {
            case "left":
                nextPoint.x = currentPoint.x;
                nextPoint.y = currentPoint.y - 1;
                break;
            case "right":
                nextPoint.x = currentPoint.x;
                nextPoint.y = currentPoint.y + 1;
                break;
            case "up":
                nextPoint.x = currentPoint.x - 1;
                nextPoint.y = currentPoint.y;
                break;
            case "down":
                nextPoint.x = currentPoint.x + 1;
                nextPoint.y = currentPoint.y;
                break;
            default:
                throw "invalid position";
        }

        nextPoint.isRevealed = false;
        return nextPoint;
    }

    SetIsShip(board, point) {
        let selectedSquare = Object.assign({}, board[point.x][point.y]);
        selectedSquare.isShip = true;
        board[point.x][point.y] = selectedSquare;
    }

    GetDirection() {
        let direction = ["left", "right", "up", "down"];
        let directionIndex = this.GetRandomNumber(0, 3);
        return direction[directionIndex];
    }

    GetRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}