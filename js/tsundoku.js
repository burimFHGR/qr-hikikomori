const gameContainer = document.getElementById('game-container');
const stack = document.getElementById('stack');
const fallingBook = document.getElementById('falling-book');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('game-over');

let score = 0;
let gameActive = true;
let initialFallingSpeed = 0.5; // Start with a very slow falling speed
let fallingSpeed = initialFallingSpeed;
let speedIncreaseRate = 0.2; // Increase speed by this amount after each catch
let bookWidth = 15; // Adjusted for responsive design
let stackPositionX = 50; // Horizontal position

function updateScore() {
    score++;
    scoreElement.textContent = `Score: ${score}`;
    fallingSpeed += speedIncreaseRate; // Increase falling speed
    bookWidth += 0.3; // Adjust growth rate for responsive design
}

function createStackBook(width = bookWidth) {
    const book = document.createElement('div');
    book.className = 'book';
    book.style.width = `${width}vw`; // Adjust width for responsive design
    stack.prepend(book);
}

function startFalling() {
    if (!gameActive) return;

    fallingBook.style.left = `${Math.random() * (100 - bookWidth)}vw`; // Adjust left for responsive design
    fallingBook.style.top = '-5vh'; // Adjust for responsive design
    fallingBook.style.width = `${bookWidth}vw`;

    let fallingInterval = setInterval(() => {
        let currentTop = parseFloat(fallingBook.style.top) || 0;
        fallingBook.style.top = `${currentTop + fallingSpeed}vh`; // Adjust for responsive design

        // Calculate the bottom position of the falling book
        const fallingBottom = currentTop + 22 * (fallingSpeed / 2); // Estimate the falling book's bottom

        if (fallingBottom >= window.innerHeight - stack.offsetHeight) { // Check if the falling book is at the stack's top
            clearInterval(fallingInterval);

            if (checkCollision()) {
                updateScore();
                createStackBook(); // Add a new book to the stack after a successful catch
                startFalling();
            } else {
                gameOver();
            }
        }
    }, 20);
}

function checkCollision() {
    const fallingRect = fallingBook.getBoundingClientRect();
    const stackRect = stack.lastElementChild ? stack.lastElementChild.getBoundingClientRect() : null;

    if (!stackRect) {
        // If there's no stack, collision cannot occur.
        return false;
    }

    return (
        fallingRect.left < stackRect.right &&
        fallingRect.right > stackRect.left &&
        fallingRect.bottom >= stackRect.top // Simple check if the falling book's bottom is at or below the top of the stack
    );
}

function gameOver() {
    gameActive = false;
    gameOverElement.style.display = 'block';
}

function moveStack(event) {
    if (!gameActive) return;

    let touchX = event.touches ? event.touches[0].clientX : event.clientX;

    // Convert touch X-coordinate to percentage
    stackPositionX = (touchX / window.innerWidth) * 100;

    // Move stack horizontally
    stack.style.left = `${stackPositionX}%`;
}

document.addEventListener('mousemove', moveStack);
document.addEventListener('touchmove', moveStack);

function init() {
    createInitialStackBook(); // Add an initial book to the stack
    startFalling();
}

function createInitialStackBook() {
    // Create a book that sits at the bottom of the stack
    const initialBook = document.createElement('div');
    initialBook.className = 'book';
    initialBook.style.width = `${bookWidth}vw`; // Adjust width for responsive design
    initialBook.style.position = 'absolute';
    initialBook.style.bottom = '0px'; // Position it at the bottom
    initialBook.style.left = '50%'; // Center it horizontally
    initialBook.style.transform = 'translateX(-50%)';
    stack.appendChild(initialBook);
}

init();
