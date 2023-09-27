import './style.css';

const shipFactory = length => {
    return {
        length,
        hits:0,
        hit() {
            this.hits++;
        },
        isSunk() {
            return this.hits >= length;
        }

    }
}

const playerFactory = (name, board) => {
    return {
        name,
        board,
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
        attacks.push(coordinates);
        if (board[coordinates[0]][coordinates[1]]) {
            board[coordinates[0]][coordinates[1]].hit();
        }
    }

    const isDefeated = () => {
        for (let i=0; i < ships.length; i++) {
            if (!ships[i].isSunk()) return false;
        }
        return true;
    }

    return {board, placeShip, receiveAttack, isDefeated};
}



const getPlayersBoard = (() => {

    const getShipCoordinate = length => {
        const dimensions = ['x', 'y'];
        let axis = dimensions[Math.floor(Math.random()*dimensions.length)];
        if (axis === 'x') {
            const y = Math.floor(Math.random()*10);
            const startingX = Math.floor(Math.random()*(10-length));
            const coordinates = [];
            for (let i=0; i<length; i++) {
                coordinates.push([y, startingX + i]);
            }
            return coordinates;
        }
        if (axis === 'y') {
            const x = Math.floor(Math.random()*10);
            const startingY = Math.floor(Math.random()*(10-length));
            const coordinates = [];
            for (let i=0; i<length; i++) {
                coordinates.push([startingY + i, x]);
            }
            return coordinates;
        }
    }

    const verifyCoordinates = (coordinates, board) => {
        for (let i = 0; i<coordinates.length; i++) {
            if (board[coordinates[i][0]][coordinates[i][1]]) return false;
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
        while(!verifyCoordinates(ship2Coordinates, computerBoard.board)) {
            ship2Coordinates = getShipCoordinate(4);
        }
        computerBoard.placeShip(ship2, ship2Coordinates);
        const ship3 = shipFactory(3);
        let ship3Coordinates = getShipCoordinate(3);
        while(!verifyCoordinates(ship3Coordinates, computerBoard.board)) {
            ship3Coordinates = getShipCoordinate(3);
        }
        computerBoard.placeShip(ship3, ship3Coordinates);
        const ship4 = shipFactory(3);
        let ship4Coordinates = getShipCoordinate(3);
        while(!verifyCoordinates(ship4Coordinates, computerBoard.board)) {
            ship4Coordinates = getShipCoordinate(3);
        }
        computerBoard.placeShip(ship4, ship4Coordinates);
        const ship5 = shipFactory(2);
        let ship5Coordinates = getShipCoordinate(2);
        while(!verifyCoordinates(ship5Coordinates, computerBoard.board)) {
            ship5Coordinates = getShipCoordinate(2);
        }
        computerBoard.placeShip(ship5, ship5Coordinates);
        return computerBoard;
    }

    const getPlayerBoard = (ships) => {

        const playersBoard = gameboardFactory();
        for (let i=0; i<ships.length; i++) {
            let ship = shipFactory(ships[i].length);
            let shipCoordinates = ships[i];
            playersBoard.placeShip(ship, shipCoordinates);
        }
        return playersBoard;
    }

    return {getComputerBoard, getPlayerBoard};
})();


const boardDisplay = (() => {
    const clearMain = () => {
        const main = document.querySelector('main');
        Array.from(main.childNodes).forEach(node => node.remove());
    }

    const getBoardHTML = () => {
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
        return board;
    }

    const displayBattleBoard = (() => {
        
        const renderBattleBoards = () => {
            clearMain();
            const playerBoardHTML = getBoardHTML();
            playerBoardHTML.classList.add('player-board');
            const computerBoardHTML = getBoardHTML();
            computerBoardHTML.classList.add('computer-board');
            const container = document.createElement('div');
            container.className = 'battle-board-container';
            container.appendChild(playerBoardHTML);
            container.appendChild(computerBoardHTML);
            document.querySelector('main').appendChild(container);

        }
        
        const receiveAttack = (player, coordinates) => {
            if (player.board.board[coordinates[0]][coordinates[1]]) {
                player.board.receiveAttack(coordinates);
            }
        }
        
        
        const announceWinner = winner => {
            clearMain();
            const container = document.createElement('div');
            container.className = 'winner-container';
            const winnerAnnouncement = document.createElement('div');
            winnerAnnouncement.textContent = `${winner.name} is the winner.`;
            winnerAnnouncement.className = 'winner';
            container.appendChild(winnerAnnouncement);
            const playAgainButton = document.createElement('button');
            playAgainButton.textContent = 'Play Again';
            playAgainButton.addEventListener('click', () => {
                window.location.reload();
            })
            container.appendChild(playAgainButton);
            document.querySelector('main').appendChild(container);
        }

        const startGame = playerShips => {
            const playerBoard = getPlayersBoard.getPlayerBoard(playerShips);
            const computerBoard = getPlayersBoard.getComputerBoard();
            const player = playerFactory('player',  playerBoard);
            const computer = playerFactory('computer', computerBoard);
            const getRoundPlayer = (round) => {
                if (round % 2 === 1) return player;
                else return computer;
            }
            let playerOccupiedCells = [];
            let computerOccupiedCells = [];
            for (let i=0; i<10; i++) {
                for (let j=0; j<10; j++) {
                    if (playerBoard.board[i][j]) playerOccupiedCells.push([i, j]);
                    if (computerBoard.board[i][j]) computerOccupiedCells.push([i, j]);

                }
            }
            let playerAttackedCells = [];
            let computerAttackedCells = [];
            const attackedCellsContain = (cellCoordinates, cells) => {
                for(let i=0; i<cells.length; i++) {
                    if (cells[i][0] === cellCoordinates[0] && cells[i][1] === cellCoordinates[1]) return true;
                }
                return false;
            }

            renderBattleBoards();
            const startRound = round => {
                document.querySelectorAll('.cell').forEach(cell => cell.replaceWith(cell.cloneNode(true)));
                if (computer.board.isDefeated()) {
                    announceWinner(player);
                    return;
                } else if (player.board.isDefeated()) {
                    announceWinner(computer);
                    return;
                }
                let roundPlayer = getRoundPlayer(round);
                if (roundPlayer === player) {
                    const playerCells = document.querySelectorAll('.computer-board .cell');
                    playerCells.forEach(cell => {
                        const row = parseInt(cell.dataset.row);
                        const column = parseInt(cell.dataset.column);
                        if (!attackedCellsContain([row, column], computerAttackedCells)) {
                            cell.addEventListener('click', () => {
                                if (computer.board.board[row][column]) {
                                    receiveAttack(roundPlayer, [row, column]);
                                    receiveAttack(computer, [row, column]);
                                    cell.classList.add('attacked');
                                }  else {
                                    cell.classList.add('safe');
                                }
                                computerAttackedCells.push([row, column]);
                                startRound(round+1);
                            })
                        }
    
                    })
                } else  if (roundPlayer === computer) {
                    const playerCells = document.querySelectorAll('.player-board .cell');
                    let row = Math.floor(Math.random()*10);
                    let column = Math.floor(Math.random()*10);
                    while(attackedCellsContain([row, column], playerAttackedCells)) {
                        row = Math.floor(Math.random()*10);
                        column = Math.floor(Math.random()*10);
                    }
                    const cell = document.querySelector(`.player-board .cell[data-row="${row}"][data-column="${column}"]`);
                    if (player.board.board[row][column]) {
                        receiveAttack(player, [row, column]);
                        cell.classList.add('attacked');
                    }  else {
                        cell.classList.add('safe');
                    }
                    playerAttackedCells.push([row, column]);
                    startRound(round+1);

                }
            }
            startRound(1);
        }
        return {startGame};
    })();

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
        const board = getBoardHTML();
        container.appendChild(board);
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
                    cell.classList.remove('empty');
                }
            })
        }

        const highlightCells = cells => {
            const isValid = verifyCells(cells);
            cells[0].addEventListener('mouseout', () => {
              unHighlightCells(cells);
            });
            if (!isValid) cells[0].classList.add('danger');
            else {
                cells.forEach(cell => {
                    cell.classList.add('empty');
                });
            }
        }

        const placeShip = length => {
            const cells = document.querySelectorAll('.cell');
            cells.forEach(cell => {
            cell.addEventListener('mouseover', () => {
                const shipCells = getShipCells(cell, length);
                highlightCells(shipCells);
                cell.addEventListener('click', () => {
                    const shipCells = getShipCells(cell, length);
                    const shipCoordinates = [];
                    if (verifyCells(shipCells)) {
                        shipCells.forEach(cell => {
                            cell.classList.add('occupied');
                            shipCoordinates.push([parseInt(cell.dataset.row), parseInt(cell.dataset.column)]);
                        })
                        document.querySelectorAll('.cell').forEach(cell => {
                            cell.replaceWith(cell.cloneNode(true));
                        })
                        ships.push(shipCoordinates);
                        if (ships.length === 1) {
                            placeShip(4);
                        }
                        else if (ships.length === 2 || ships.length === 3) {
                            placeShip(3);
                        }
                        else if (ships.length === 4) {
                            placeShip(2);
                        }
                        else {
                            displayBattleBoard.startGame(ships);
                        }
                    }
                })
            })
        })
        }
        placeShip(5)
    }

    

    return {placeShipsBoard, playerShips};
})();

boardDisplay.placeShipsBoard();