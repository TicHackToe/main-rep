const { board, players, stats } = require('../config/store');

class SocketController {
    // public event listeners

    static initialize() {
        return { board, players }
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

        console.log(`Clearing the board...`);
        socket.emit('afterClear', board)
        
        console.log(`Populating players on the board...`);
        socket.emit('populatePlayer', players)

        console.log(`List players...`, players);
        socket.broadcast.emit('player', players)
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
        // oke ar

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