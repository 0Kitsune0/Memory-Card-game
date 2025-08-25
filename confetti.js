// Simple confetti effect
function launchConfetti() {
  const colors = ['#f94144','#f3722c','#f9c74f','#90be6d','#43aa8b','#577590'];
  const confettiCount = 100;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.animationDuration = 2 + Math.random() * 3 + 's';
    confetti.style.width = 8 + Math.random() * 8 + 'px';
    confetti.style.height = 8 + Math.random() * 8 + 'px';
    document.body.appendChild(confetti);

    // Remove confetti after animation
    confetti.addEventListener('animationend', () => {
      confetti.remove();
    });
  }
}
