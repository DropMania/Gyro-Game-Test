class Box {
    constructor() {
        this.x = 0
        this.y = 0
        this.w = 100
        this.h = 300
    }
    rotate(a) {
        translate(width / 2, height / 2)
        rotate(radians(floor((a - 90) * -1)))
        rect(this.x, this.y, this.w, this.h)
    }
}
