const symbols = [
  "assets/sprites/cherry.png",
  "assets/sprites/lemon.png",
  "assets/sprites/orange.png",
  "assets/sprites/watermelon.png",
  "assets/sprites/star.png",
  "assets/sprites/diamond.png"
];

// reels
const reel1 = document.getElementById("reel1");
const reel2 = document.getElementById("reel2");
const reel3 = document.getElementById("reel3");

const result = document.getElementById("result");

// sounds (optional but included)
const spinSound = new Audio("assets/sound/spin.mp3");
const winSound = new Audio("assets/sound/win.mp3");

// spin button
document.getElementById("spinBtn").addEventListener("click", spin);

// get random symbol
function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// spinning effect
function startSpinning(reel) {
  return setInterval(() => {
    reel.src = getRandomSymbol();
  }, 80);
}

// main spin function
function spin() {
  result.textContent = "";

  // play spin sound
  spinSound.currentTime = 0;
  spinSound.play();

  // remove win styling
  reel1.classList.remove("win");
  reel2.classList.remove("win");
  reel3.classList.remove("win");

  // start spinning reels
  const spin1 = startSpinning(reel1);
  const spin2 = startSpinning(reel2);
  const spin3 = startSpinning(reel3);

  // stop reels one by one
  setTimeout(() => clearInterval(spin1), 800);
  setTimeout(() => clearInterval(spin2), 1200);

  setTimeout(() => {
    clearInterval(spin3);
    finalizeSpin();
  }, 1600);
}

// final result
function finalizeSpin() {
  const s1 = getRandomSymbol();
  const s2 = getRandomSymbol();
  const s3 = getRandomSymbol();

  reel1.src = s1;
  reel2.src = s2;
  reel3.src = s3;

  if (s1 === s2 && s2 === s3) {
    result.textContent = "🎉 JACKPOT!!!";

    reel1.classList.add("win");
    reel2.classList.add("win");
    reel3.classList.add("win");

    // play win sound
    winSound.currentTime = 0;
    winSound.play();
  } else {
    result.textContent = "Try again!";
  }
}