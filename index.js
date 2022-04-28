const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.height = 576
canvas.width = 1024

c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = 0.7


const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0,
    },
})

player.draw()

const enemy = new Fighter({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: -50,
        y: 0,
    },
    color: 'blue'
})

enemy.draw()
const imageSrc = './img/background/background_layer_1.png';
const backgroundImage = new Sprite({ position: { x: 0, y: 0 }, imageSrc, scale: 3.2 })


const imageSrcSecond = './img/background/background_layer_2.png';
const backgroundImageSecond = new Sprite({ position: { x: 0, y: 0 }, imageSrc: imageSrcSecond, scale: 3.2 })

const shop = './img/shop_anim.png'
const shopImage = new Sprite({ position: { x: 550, y: 195 }, imageSrc: shop, scale: 3, })
backgroundImage.draw()
backgroundImageSecond.draw()
shopImage.draw()

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
}

let lastKey;

decreaseTimer()
function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    backgroundImage.update();
    backgroundImageSecond.update();
    shopImage.update();
    player.update();
    enemy.update();

    timerSelector.innerHTML = timer;

    player.velocity.x = 0

    if (keys.a.pressed && lastKey === 'a') {
        player.velocity.x = -5
    } else if (keys.d.pressed && lastKey === 'd') {
        player.velocity.x = 5
    }

    enemy.velocity.x = 0

    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
    }

    if (rectangularCollision({ rectangle1: player, rectangle2: enemy }) && player.isAttaking) {
        console.log('go')
        player.isAttaking = false
        enemy.health -= 20;
        document.querySelector('.enemy_health_dynamic_bar').style.width = `${enemy.health}%`;
    }

    if (rectangularCollision({ rectangle1: enemy, rectangle2: player }) && enemy.isAttaking) {
        console.log('go enemy')

        enemy.isAttaking = false
        player.health -= 20;
        document.querySelector('.player_health_dynamic_bar').style.width = `${player.health}%`;
    }

    if (enemy.health < 1 || player.health < 1) {
        stopGame()
    }
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break;
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break;
        case 'w':
            player.velocity.y = -20
            break;
        case ' ':
            player.attack()
            break;
    }
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break;
        case 'ArrowUp':
            enemy.velocity.y = -20
            break;
        case 'ArrowDown':
            enemy.attack()
            break;
        default:
            console.log('default')
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break;
        case 'a':
            keys.a.pressed = false
            break;
        default:
            console.log('default')
    }


    switch (event.key) {
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break;
        default:
            console.log('default')
    }
})