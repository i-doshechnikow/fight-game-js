
function rectangularCollision({
    rectangle1,
    rectangle2
}) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x
        && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

var timer = 59;
var timerSelector = document.querySelector('.timer');

function stopGame() {
    clearInterval(gameTimer)

    document.querySelector('.tie').style.display = 'flex'

    document.querySelector('.tie').innerHTML = player.health === enemy.health ? "Tie" : player.health > enemy.health ? 'Player wins' : 'Enemy wins'
};

let gameTimer;

function decreaseTimer() {

    gameTimer = setInterval(() => {
        if (timer > 0) {
            timer--
        } else {
            clearInterval(gameTimer)
            stopGame();
        }
    }, 1000);
}

