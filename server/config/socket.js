const SocketController = require('../controllers/SocketController')

module.exports = {
    start: (io) => io.on('connection', (socket) => {
        console.log("a user connected");

        // emit events
        // socket.emit('init', rooms)
    
        // socket.broadcast.emit('updateRoom', rooms)
    
        // socket.broadcast.emit('updateBoard', rooms)
    
        // socket.emit('hello', 'can you hear me?', 1, 2, 'abc');
    
    
        // event listener
        socket.emit('init', SocketController.initialize())
        
        socket.emit('player', SocketController.getUser())

        socket.on('newPlayer', payload => SocketController.createPlayer(payload, socket))

        socket.on('newRoom', payload => SocketController.createRoom(payload, socket))

        socket.on('playerEntersRoom', payload => SocketController.addPlayerToRoom(payload, socket))

        // event listeners on specific ID

        socket.on('clearBoard', payload => SocketController.clearBoard(payload, socket))

        socket.on('updateBoard', payload => SocketController.updateBoard(payload, socket))

        socket.on('playerWins', payload => SocketController.declareWinner(payload, io))

        socket.on('ownerLeavesRoom', payload => SocketController.deleteRoom(payload, io))

        // socket.on('clicked', payload => {
        //     console.log(payload);
        // })
    
        // socket.on('roomUpdate', payload => {
        //     console.log(payload);
        // })
    })
}