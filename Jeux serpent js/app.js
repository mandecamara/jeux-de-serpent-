const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");

const tileSize = 20;
const rows = canvas.height / tileSize;
const columns = canvas.width / tileSize;

let snake = [{ x: 5, y: 5 }];
let direction = { x: 1, y: 0 };
let food = { x: Math.floor(Math.random() * columns), y: Math.floor(Math.random() * rows) };
let score = 0;
let isPaused = false;
let gameInterval;

// Initialisation du jeu
function initGame() {
    score = 0;
    snake = [{ x: 5, y: 5 }];
    direction = { x: 1, y: 0 };
    food = { x: Math.floor(Math.random() * columns), y: Math.floor(Math.random() * rows) };
    scoreElement.textContent = `Score: ${score}`;
    isPaused = false;
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 100);
}

// Boucle principale du jeu
function gameLoop() {
    if (isPaused) return;
    moveSnake();
    checkCollision();
    drawGame();
}

// Déplacement du serpent
function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
        generateFood();
    } else {
        snake.pop();
    }
}

// Génération d'une nouvelle position de la nourriture
function generateFood() {
    food = {
        x: Math.floor(Math.random() * columns),
        y: Math.floor(Math.random() * rows),
    };
}

// Vérification des collisions avec les murs ou le corps du serpent
function checkCollision() {
    const head = snake[0];

    // Collision avec les murs
    if (head.x < 0 || head.x >= columns || head.y < 0 || head.y >= rows) {
        initGame();
    }

    // Collision avec le corps du serpent
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            initGame();
        }
    }
}

// Dessiner le serpent, la nourriture et le fond du canvas
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner la nourriture
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

    // Dessiner le serpent
    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    });
}

// Gestion des entrées du clavier pour changer la direction
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction.y === 0) {
        direction = { x: 0, y: -1 };
    } else if (event.key === "ArrowDown" && direction.y === 0) {
        direction = { x: 0, y: 1 };
    } else if (event.key === "ArrowLeft" && direction.x === 0) {
        direction = { x: -1, y: 0 };
    } else if (event.key === "ArrowRight" && direction.x === 0) {
        direction = { x: 1, y: 0 };
    }
});

// Pause et reprise du jeu
pauseBtn.addEventListener("click", () => {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? "Reprendre" : "Pause";
});

// Réinitialiser le jeu
resetBtn.addEventListener("click", () => {
    initGame();
});

// Démarrer le jeu
initGame();
