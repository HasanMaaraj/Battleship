import './style.css';

const shipFactory = length => {
    return {
        length,
        hits:0,
        hit() {
            this.hits++
        },
        isSunk() {
            return hits >= length;
        }

    }
}

const gameboardFactory = () => {
    let board = [
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
    ]

    const placeShip = (ship, coordinates) => {
        for (let coordinate in coordinates) {
            if (board[coordinates[coordinate][0]][coordinates[coordinate][1]]) return false;
        }
        for (let coordinate in coordinates) {
            board[coordinates[coordinate][0]][coordinates[coordinate][1]] = ship;
        }

    }

    placeShip(ship, [[0,0],[0,1]])
    return {board}
}