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

const boardDisplay = (() => {
    const clearMain = () => {
        const main = document.querySelector('main');
        Array.from(main.childNodes).forEach(node => node.remove());
    }

    
    const placeShipsBoard = () => {
        clearMain();
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
                cell.classList.remove('danger');
                cell.classList.remove('safe');
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
                })
            })
        }
        placeShip(5);
    }
    return {placeShipsBoard};
})();

boardDisplay.placeShipsBoard();