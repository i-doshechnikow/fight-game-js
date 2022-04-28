class Fighter {
    constructor({ position, velocity, color = 'red', offset }) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset,
            width: 100,
            height: 50,
        }
        this.color = color
        this.isAttaking
        this.health = 100
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        if (this.isAttaking) {
            c.fillStyle = 'green'
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }

    }

    update() {
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity
        }
    }

    attack() {
        this.isAttaking = true
        setTimeout(() => {
            this.isAttaking = false
        }, 100)
    }
}

// class Sprite {
//     constructor({ position, imgSrc }) {
//         this.position = position
//         this.width = 50
//         this.height = 150
//         this.image = new Image(imgSrc)
//     }

//     draw() {
//         c.drawImage(this.image, 0, 0)
//     }

//     update() {
//         this.draw()
//     }
// }

class Sprite {
    constructor({
        position,
        imageSrc,
    }) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
    }

    draw() {
        c.drawImage(this.image, 0, 0, 1024, 576)
    }

    update() {
        this.draw()
    }
}