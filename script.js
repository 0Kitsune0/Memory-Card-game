// Make sure confetti.js is loaded in index.html before script.js
//s <script src="confetti.js"></script>


const gameBoard = document.querySelector('.game-board');
const movesCounter = document.getElementById('moves');
const restartBtn = document.getElementById('restart');

let emojis = ['🐶','🐱','🐼','🦊','🐸','🐵','🐯','🦁']; // 8 pairs
emojis = [...emojis, ...emojis]; // duplicate for pairs
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;

// Shuffle array
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Create cards dynamically
function createCards() {
  const shuffled = shuffleArray(emojis);
  gameBoard.innerHTML = '';

  shuffled.forEach(emoji => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.card = emoji;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">${emoji}</div>
        <div class="card-back"></div>
      </div>
    `;

    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

// Flip card function
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flipped');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  hasFlippedCard = false;

  checkForMatch();
}

// Check for match
function checkForMatch() {
  const isMatch = firstCard.dataset.card === secondCard.dataset.card;
  isMatch ? disableCards() : unflipCards();

  moves++;
  movesCounter.textContent = moves;
}

// Disable matched cards
function disableCards() {
  firstCard.classList.add('matched');
  secondCard.classList.add('matched');

  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
  checkWin();
}

// Unflip cards
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetBoard();
  }, 1000);
}

// Reset board turn
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Check win
function checkWin() {
  const allMatched = [...document.querySelectorAll('.card')].every(card =>
    card.classList.contains('matched')
  );
  if (allMatched) {
    launchConfetti(); // ← THIS LINE ADDED
    setTimeout(() => {
      alert(`🎉 You won in ${moves} moves!`);
    }, 500);
  }
}


// Restart game
function restartGame() {
  moves = 0;
  movesCounter.textContent = moves;
  createCards();
  resetBoard();
}

// Start game
createCards();
restartBtn.addEventListener('click', restartGame);
