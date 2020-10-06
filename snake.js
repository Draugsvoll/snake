import { getInputDirection } from './input.js'

export const SNAKE_SPEED = 8 // move 2 times per second
export const snakeBody = [{ x: 11, y: 11}]
let newSnakeSegments = 0 // beginning segments

export function update() {
    addSegments()
    const inputDirection = getInputDirection()
        // start from bottom of snake and worke our way up. First iteratoin gives us second to last elementm. the last element will simply disappear
    for (let i = snakeBody.length - 2; i>=0; i--) {
    snakeBody[i+1] = { ...snakeBody[i] } // ducplicate snakeBody. 
    }

    // [0] is the head. Adds the direction every update/second.
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

                    // pass the game-board to draw on
export function draw (gameBoard) {
    // draw each segment of the snake (array values)
    snakeBody.forEach(snakeSegment => {
        const snake = document.createElement('div')
        // tell grid where to place div
        snake.style.gridRowStart = snakeSegment.y
        snake.style.gridColumnStart = snakeSegment.x
        // add css class 'snake' to the const snake (a div)
        snake.classList.add('snake')
        // adding snakeSegments  (divs) to the gameBoard.
        gameBoard.appendChild(snake)
    })
}

// snake growth used in food.js
export function expandSnake (amount) {
    newSnakeSegments += amount
}

function addSegments () {
    for (let i=0; i<newSnakeSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length-1] }) // ducplicate end of snake, append to new last
    }
    newSnakeSegments = 0
}

// used in food.js
export function snakeOnFood (position) {
    return snakeBody.some(snakeSegment => {
        return equalsPositions(snakeSegment, position) // return result of this function if true ('some' function)
    })
}

// used in 'snakeOnFood' check
function equalsPositions(pos1, pos2) {
    return (pos1.x == pos2.x && pos1.y == pos2.y) // return true if same
}

// used in game.js
export function getSnakeHead () {
    return snakeBody[0]
}


// used in game.js
export function snakeInterception () {
    // check if the head is on the snake body. Ignore the head itself
  return snakeBody.some((segment, index) => {
            if ( index > 0) {
                return (equalsPositions(segment, snakeBody[0])) 
            }
    })
}

