import './style.css';

const shipFactory = (length) => {
    return {
        length,
        hits:0,
        hit() {
            hits++
        },
        isSunk() {
            return hits >= length;
        }

    }
}