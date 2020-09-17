const { board, players, stats } = require('../config/store')

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
    
    static createRoom(payload, socket){
        //
    }
    
    static addPlayerToRoom(payload, socket){
        //
    }

    // private event listeners
    
    static updateBoard(payload, socket){
        board.squares[payload.position] = payload.currentPlayer
        
        socket.broadcast.emit('updateBoard', payload)
    }

    static declareWinner(payload, io){
        //
    }

    static deleteRoom(payload, io){
        //
    }
}

module.exports = SocketController