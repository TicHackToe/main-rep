const { board, players, stats } = require('../config/store');

class SocketController {
    // public event listeners


    static initialize() {
        return board
    }
    
    static getUser() {
        return players
    }

    static createPlayer(payload, socket) {
        if(players.length >= 2) {
            return
        }
        payload.UserId = socket.id
        players.push(payload)

        socket.emit('afterClear', board)
        socket.emit('populatePlayer', players)
        socket.emit('player', players)
    }

    static deletePlayer(payload, socket) {
        players = players.filter(player => player.socketId !== socket.id)
    }

    // private event listeners

    static updateBoard(payload, socket) {
        console.log(payload, board);

        // if (!board.winner) {
        //     board.squares[payload.position] = payload.currentPlayer

        //     if (payload.player) board.winner = payload.player
        // }
        // gw fix ya yas
        if (board.squares[payload.position] != null || payload.winner != null) {
            return
        }

        board.squares[payload.position] = payload.currentPlayer

        socket.broadcast.emit('updateBoard', payload)
    }

    static clearBoard(payload, socket) {
        board.winner = null
        board.squares = Array(9).fill(null)

        socket.broadcast.emit('afterClear', board)
    }
}

module.exports = SocketController