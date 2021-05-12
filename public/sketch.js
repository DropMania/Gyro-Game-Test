let isMobile =
    /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    )
let params = new URLSearchParams(location.search)
const socket = io()

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    background(0)
    fill(255)
    textSize(32)
    text(isMobile, 0, 100)

    if (params.has('g')) {
        socket.emit('login', params.get('g'))
    }

    if (isMobile) {
        function handleOrientation(e) {
            fill(255)
            text('aha', 0, 200)
            socket.emit('sendGyro', params.get('g'), {
                absolute: e.absolute,
                alpha: e.alpha,
                beta: e.beta,
                gamma: e.gamma
            })
        }
        window.addEventListener('deviceorientation', handleOrientation)
    }

    if (!isMobile) {
        socket.on('getGyro', (coords) => {
            console.log(coords)
        })
    }
}

function draw() {}
