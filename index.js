const fs = require('fs')
const express = require('express')
const app = express()
const httpServer = require('https').createServer(
    {
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.cert')
    },
    app
)
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
        io.to(g).emit('getGyro', coords)
    })
})

app.use(express.static(__dirname + '/public'))
httpServer.listen(3000)
