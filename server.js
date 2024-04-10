const server = require('http').createServer();
const io = require('socket.io')(server);
const PORT = 3000;
let readyPlayerCount = 0;
io.on('connection', (socket) => {
    console.log('user connected', socket.id);

    socket.on('ready', () => {
        console.log('Player with id:' + socket.id + 'is ready');
        readyPlayerCount++;
        if (readyPlayerCount === 2) {
            //broadcase startgame
            io.emit('startGame', socket.id);
        }
    });
    socket.on('paddleMove', (paddleData) => {
        socket.broadcast.emit('paddleMove', paddleData);
    });
    socket.on('ballMove', (ballData) => {
        socket.broadcast.emit('ballMove', ballData);
    })
});
server.listen(3000);
console.log(`Listening at port ${PORT}`);
