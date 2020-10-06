import { snakeOnFood, expandSnake} from './snake.js'
import { randomGridPosition } from './grid.js'

var food = randomFoodposition()
const EXPANSION_RATE = 2
export var scoreboard = document.querySelector(".scoreboard");
export let score = 0


export function update() {
  if(snakeOnFood(food)) {
          expandSnake(EXPANSION_RATE)
          food = randomFoodposition()
          score += 10
          scoreboard.textContent = "Score: " + score;
  }
}

                    // pass the game-board to draw on
export function draw (gameBoard) {
        const foodElement = document.createElement('div')
        // tell grid where to place div
        foodElement.style.gridRowStart = food.y
        foodElement.style.gridColumnStart = food.x
        // add css class 'food' to the const food (a div)
        foodElement.classList.add('food')
        // adding foods  (divs) to the gameBoard.
        gameBoard.appendChild(foodElement)
}



function randomFoodposition() {
        let newFoodPosition
                                          // check if crash with snkae
        while (newFoodPosition == null || snakeOnFood(newFoodPosition)) {
                newFoodPosition = randomGridPosition()
        }
        return newFoodPosition
}