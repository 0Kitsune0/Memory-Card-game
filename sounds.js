// Load sounds from the "SoundEffects" folder
const flipSound = new Audio('SoundEffects/flip.mp3');
const matchSound = new Audio('SoundEffects/match.mp3');

// Functions to play sounds
function playFlip() {
  flipSound.currentTime = 0;
  flipSound.play();
}

function playMatch() {
  matchSound.currentTime = 0;
  matchSound.play();
}
