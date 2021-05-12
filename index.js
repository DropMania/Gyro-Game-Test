const express = require('express')
const app = express()
const httpServer = require('http').createServer(app)
const options = {}
const io = require('socket.io')(httpServer, options)

const games = {}
io.on('connection', (socket) => {
    socket.on('login', (g) => {
        if (!games.hasOwnProperty(g)) {
            games[g] = {}
        }
        socket.join(g)
        console.log(games)
    })

    socket.on('sendGyro', (g, coords) => {
        console.log(coords)
        io.to(g).emit('getGyro', coords)
    })
})

app.use(express.static(__dirname + '/public'))
httpServer.listen(3000)
