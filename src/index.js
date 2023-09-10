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
    ];

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

    return {board};
}



const getPlayersBoard = (() => {

    const getShipCoordinate = length => {
        const dimensions = ['x', 'y']
        let axis = dimensions[Math.floor(Math.random()*dimensions.length)]
        if (axis === 'x') {
            const y = Math.floor(Math.random()*10);
            const startingX = Math.floor(Math.random()*(10-length));
            const coordinates = [];
            for (let i=0; i<length; i++) {
                coordinates.push([y, startingX + i])
            }
            return coordinates;
        }
        if (axis === 'y') {
            const x = Math.floor(Math.random()*10);
            const startingY = Math.floor(Math.random()*(10-length));
            const coordinates = [];
            for (let i=0; i<length; i++) {
                coordinates.push([startingY + i, x])
            }
            return coordinates;
        }
    }

    const verifyCoordinates = (coordinates, board) => {
        for (let i = 0; i<coordinates.length; i++) {
            if (board[coordinates[i][0]][coordinates[i][1]]) return false
        }
        return true;
    }

    const getComputerBoard = () => {
        const computerBoard = gameboardFactory();
        const ship1 = shipFactory(5);
        let ship1Coordinates = getShipCoordinate(5);
        computerBoard.placeShip(ship1, ship1Coordinates);
        const ship2 = shipFactory(4);
        let ship2Coordinates = getShipCoordinate(4);
        while(verifyCoordinates(ship2Coordinates, computerBoard.board)) {
            ship2Coordinates = getShipCoordinate(4);
        }
        computerBoard.placeShip(ship2, ship2Coordinates);
        const ship3 = shipFactory(3);
        let ship3Coordinates = getShipCoordinate(3);
        while(verifyCoordinates(ship3Coordinates, computerBoard.board)) {
            ship3Coordinates = getShipCoordinate(3);
        }
        computerBoard.placeShip(ship3, ship3Coordinates);
        const ship4 = shipFactory(3);
        let ship4Coordinates = getShipCoordinate(3);
        while(verifyCoordinates(ship4Coordinates, computerBoard.board)) {
            ship4Coordinates = getShipCoordinate(3);
        }
        computerBoard.placeShip(ship4, ship4Coordinates);
        const ship5 = shipFactory(2);
        let ship5Coordinates = getShipCoordinate(2);
        while(verifyCoordinates(ship5Coordinates, computerBoard.board)) {
            ship5Coordinates = getShipCoordinate(2);
        }
        computerBoard.placeShip(ship5, ship5Coordinates);
        return computerBoard;
    }

    let playerShips = []
    const getPlayerBoard = () => {

        const playersBoard = gameboardFactory();
        const ships = boardDisplay.playerShips;
        for (let i=0; i<ships.length; i++) {
            let ship = shipFactory(ships[i].length);
            let shipCoordinates = ships[i];
            playersBoard.placeShip(ship, shipCoordinates);
        }
        return playersBoard;
    }

    return {getComputerBoard, getPlayerBoard, playerShips};
})();


const boardDisplay = (() => {
    const clearMain = () => {
        const main = document.querySelector('main');
        Array.from(main.childNodes).forEach(node => node.remove());
    }

    let playerShips = [];
    const placeShipsBoard = () => {
        clearMain();
        let ships = [];
        const container = document.createElement('div');
        container.className = 'place-ship-container';
        let axis = 'x';
        const rotateButton = document.createElement('button');
        rotateButton.textContent = 'Rotate';
        rotateButton.className = 'rotate-btn';
        rotateButton.addEventListener('click', () => {
            axis = axis === 'x' ? 'y':'x';
        });
        container.appendChild(rotateButton);
        const board = document.createElement('div');
        board.className = 'board';

        for (let i=0; i<10; i++) {
            for (let j=0; j<10; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.column = j;
                cell.dataset.row = i;
                board.appendChild(cell);
            }
        }
        container.appendChild(board)
        document.querySelector('main').appendChild(container);
        const getShipCells = (cell, length) => {
            const column = parseInt(cell.dataset.column);
            const row = parseInt(cell.dataset.row);
            const shipCells = [];
            if (axis === 'x') {
                for (let i = column; i-column<length; i++) {
                    shipCells.push(document.querySelector(`.cell[data-column="${i}"][data-row="${row}"]`));
                }
            }
            if (axis === 'y') {
                const column = parseInt(cell.dataset.column);
                for (let i = row; i-row<length; i++) {
                    shipCells.push(document.querySelector(`.cell[data-column="${column}"][data-row="${i}"]`));
                }
            }
            return shipCells;
        }

        const verifyCells = cells => {
            for (let i=0; i < cells.length; i++) {
                if (!cells[i]) return false;
                if (Array.from(cells[i].classList).includes('occupied')) return false;
            }
            return true;
        }

        const unHighlightCells = cells => {
            cells.forEach(cell => {
                if (cell) {
                    cell.classList.remove('danger');
                    cell.classList.remove('safe');
                }
            })
        }

        const highlightCells = cells => {
            const isValid = verifyCells(cells)
            cells[0].addEventListener('mouseout', () => {
              unHighlightCells(cells);
            });
            if (!isValid) cells[0].classList.add('danger')
            else {
                cells.forEach(cell => {
                    cell.classList.add('safe');
                });
            }
        }

        const placeShip = length => {
            const cells = document.querySelectorAll('.cell');
            cells.forEach(cell => {
            cell.addEventListener('mouseover', () => {
                const shipCells = getShipCells(cell, length);
                highlightCells(shipCells);
                console.log(shipCells);
                cell.addEventListener('click', () => {
                    const shipCells = getShipCells(cell, length);
                    const shipCoordinates = [];
                    if (verifyCells(shipCells)) {
                        shipCells.forEach(cell => {
                            cell.classList.add('occupied')
                            shipCoordinates.push([parseInt(cell.dataset.row), parseInt(cell.dataset.column)])
                        })
                        document.querySelectorAll('.cell').forEach(cell => {
                            cell.replaceWith(cell.cloneNode(true))
                        })
                        ships.push(shipCoordinates)
                        console.log('ships', ships)
                        if (ships.length === 1) {
                            placeShip(4)
                        }
                        else if (ships.length === 2 || ships.length === 3) {
                            placeShip(3)
                        }
                        else if (ships.length === 4) {
                            placeShip(2)
                        }
                        else getPlayersBoard.playerShips = ships
                    }
                })
            })
        })
        }
        console.log('ships', placeShip(5));
    }



    return {placeShipsBoard, playerShips};
})();




boardDisplay.placeShipsBoard();