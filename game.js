import { update as updateSnake, draw as drawSnake, SNAKE_SPEED } from './snake.js'
import { update as updateFood, draw as drawFood, scoreboard, score} from './food.js'
import { getSnakeHead, snakeInterception} from './snake.js'
import { outsideGrid } from './grid.js'

scoreboard.textContent = "Score: " + score;
let lastRenderTime = 0
var gameBoard = document.getElementById('game-board')
let gameOver = false

 // *game loop  timestamp
function main(currentTime) {
    if(gameOver === true ) {
        scoreboard.textContent = "Score: " + score;
       if (confirm(score+' Points! Press OK to restart')) {
           window.location = '/'   // refresh page
       }
       return
    }

    // setup a loop
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000  // 1000 for miliseconds

    if (secondsSinceLastRender > 1/SNAKE_SPEED ) {
        lastRenderTime = currentTime
        update() // update logic
        draw()  // render 
    }
}

// *start the loop
window.requestAnimationFrame(main)


function update () {
    updateSnake()
    updateFood()
    checkForDeath()
}


function draw () {
    gameBoard.innerHTML = '' // clears the old snake
    drawSnake(gameBoard) // gameboard is grabbed as element(div) line 4
    drawFood(gameBoard)
}


function checkForDeath() {
    gameOver = snakeInterception() || outsideGrid(getSnakeHead())
}






