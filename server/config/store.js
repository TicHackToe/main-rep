module.exports = {
    board: {
        // id: 1,
        // name: 'Alpha vs Beta',
        squares: Array(9).fill(null),
        // currentPlayer: ['x', 'o'][Math.round(Math.random())],
        currentPlayer: 'X',
        xPlayerId: 1,
        oPlayerId: 2,
        winner: null
    },
    players: [],
    stats: {
        boardCount: 1,
        playerCount: 1
    }
}