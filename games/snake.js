let playBoard = document.querySelector(".playground")
let gameStatus = document.querySelector(".gameStatus")
let score = document.querySelector(".score")
// let food = document.querySelector(".food");
// let snakehead = document.querySelector(".snakehead")
let foodX, foodY;
let snakeBody = [[0, 0]];
let snakeX = 0, snakeY = 0;
let directionX = 0, directionY = 0;
let gameOver = false;

const changefoodposition = () => {
    foodX = Math.floor(Math.random() * 59);
    foodY = Math.floor(Math.random() * 29);
}

const changeDirection = (e) => {
    if(e.key === "ArrowUp" && directionY !== 1){
        directionX = 0;
        directionY = -1;
    }
    else if(e.key === "ArrowRight" && directionX !== -1){
        directionX = 1;
        directionY = 0;
    }
    else if(e.key === "ArrowDown" && directionY !== -1){
        directionX = 0;
        directionY = 1;
    }
    else if(e.key === "ArrowLeft" && directionX !== 1){
        directionX = -1;
        directionY = 0;
    }
}

const inGame = () => {
    if(gameOver) return;

    let htmlMarkup = `<div class="food" style="grid-area:${foodY} / ${foodX}"></div>`;

    // Check if snake ate food
    if(foodX === snakeX && foodY === snakeY){
        changefoodposition();
        snakeBody.push([foodX, foodY]);
        score.innerHTML = `Score:-${(snakeBody.length - 1)}`
    }

    // Update snake body
    for(let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1];
    }

    // Update snake head position
    snakeX += directionX;
    snakeY += directionY;

    // Check for collisions with walls
    if (snakeX < 0 || snakeX >= 61 || snakeY < 0 || snakeY >= 31) {
        gameOver = true;
        gameStatus.innerHTML = `Game Over!`;
        score.innerHTML = `Score:-${(snakeBody.length - 1)}`
        // gameStatus.style.display = "block"
        return;
    }
    // ${(snakeBody.length - 1)}
    // Check for collisions with the snake's own body
    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true;
            gameStatus.innerHTML = `Game Over!`;
            score.innerHTML = `Score:-${(snakeBody.length - 1)}`
            // gameStatus.style.display = "block"
            return;
        }
    }
    

    // Update snake body position
    snakeBody[0] = [snakeX, snakeY];

    // Render snake
    for(let i = 0; i < snakeBody.length; i++){
        htmlMarkup += `<div class="head" style="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    }
    
    // food.style.gridArea = `${} / ${}`;
    playBoard.innerHTML = htmlMarkup;
}

document.addEventListener("keydown", changeDirection)
changefoodposition();
setInterval(inGame, 125);