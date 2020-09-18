const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkForWin = (squares) => {
    let player = null

    for(let position of winningConditions) {
        const [ a, b, c ] = position

        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            player = squares[a]
        }
    }
    // return sebagai object
    return { player }
}

module.exports = checkForWin