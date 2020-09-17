module.exports = {
    board: {
        // id: 1,
        // name: 'Alpha vs Beta',
        squares: Array(9).fill(null),
        xPlayerId: 1,
        oPlayerId: 2,
    },
    players: [
        {
            id: 1,
            name: 'alpha',
        },
        {
            id: 2,
            name: 'beta',
        }
    ],
    stats: {
        boardCount: 1,
        playerCount: 1
    }
}