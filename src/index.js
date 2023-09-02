// import './style.css';

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

    let attacks = [];
    let ships = [];
    const placeShip = (ship, coordinates) => {
        for (let coordinate in coordinates) {
            if (board[coordinates[coordinate][0]][coordinates[coordinate][1]]) return false;
        }
        ships.push(ship);
        for (let coordinate in coordinates) {
            board[coordinates[coordinate][0]][coordinates[coordinate][1]] = ship;
        }

    }
    
    const receiveAttack = coordinates => {
        if (attacks.includes(coordinates)) return;
        attacks.push(coordinates)
        if (board[coordinates[0]][coordinates[1]]) {
            board[coordinates[0]][coordinates[1]].hit();
        }
    }

    const isDefeated = () => {
        for (let i=0; i < ships.length; i++) {
            if (!ships[i].isSunk) return false;
        }
        return true;
    }

    return {board}
}