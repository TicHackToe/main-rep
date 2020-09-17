const { board, players, stats } = require('../config/store');

class SocketController {
    // public event listeners

    static initialize(){
        return board
    }
    
    static createPlayer(payload, socket){
        players.push(payload)
        console.log(players, "List online players");
    }

    static deletePlayer(payload, socket){
        players = players.filter(player => player.socketId !== socket.id)
    }

    // private event listeners
    
    static updateBoard(payload, socket){
        console.log(payload, board);

        if (!board.winner) {
            board.squares[payload.position] = payload.currentPlayer

            if (payload.player) board.winner = payload.player
        }

        socket.broadcast.emit('updateBoard', payload)
    }

    static clearBoard(payload, socket){
        board.winner = null
        board.squares = Array(9).fill(null)

        socket.broadcast.emit('updateBoard', SocketController.initialize())
    }
}

module.exports = SocketController