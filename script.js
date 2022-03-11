'use strict';

const Won = Symbol("win");
const Over = Symbol("high");
const Under = Symbol("low");
const Lost = Symbol("lose");
const None = Symbol("none");

let randNumber = getRandomNumber();

document.querySelector('.check').addEventListener('click', function () {
  let guessValue = Number(document.querySelector('.guess').value);
  let score = Number(document.querySelector('.score').textContent);

  if (guessValue) {
    if (guessValue < randNumber) {
      refreshMessage(score > 1 ? Under : Lost);
    } else if (guessValue > randNumber) {
      refreshMessage(score > 1 ? Over : Lost);
    } else {
      refreshMessage(Won);
      refreshHighscore();
      displayShareButton('visible');
      refreshBackground(Won);
    }
  } else {
    document.querySelector('.message').textContent = 'Guess what? you missed to inform a number 🤭';
  }
});

document.querySelector('.again').addEventListener('click', function () {
  randNumber = getRandomNumber();
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.guess').value = null;
  document.querySelector('.score').textContent = 20;
  document.querySelector('.number').textContent = '?';
  displayShareButton('hidden');
  refreshBackground(None);
});

function refreshHighscore() {
  let highscore = Number(document.querySelector('.highscore').textContent);
  let score = Number(document.querySelector('.score').textContent);
  if (score > highscore) {
    document.querySelector('.highscore').textContent = score
  }
}

function refreshBackground(state) {
  switch (state) {
    case Won:
      document.querySelector('body').style.background = "url('bg-cat.gif') rgba(0, 0, 0, 0.8)";
      break;
    case Lost:
      break;
    default: 
      document.querySelector('body').style.background = "#222";
      break;
  }
}

function refreshMessage(state) {
  let message
  switch (state) {
    case Won:
      message = '🎉 Congrats you got it right';
      revealNumber();
      break;
    case Lost:
      message = '💥 you lost the game :(';
      revealNumber();
      break;
    case Over:
      message = '📈 not that high';
      break;
    case Under:
      message = '📉 not that low';
      break;
  }
  document.querySelector('.message').textContent = message;
  let score = Number(document.querySelector('.score').textContent);
  if (score > 1) {
    document.querySelector('.score').textContent = score - 1  
  }
}

function revealNumber() {
  document.querySelector('.number').textContent = randNumber;
}

function displayShareButton(type) {
  // document.querySelector('.share').style.visibility = type;
}

function getRandomNumber() { 
  return Math.floor(Math.random() * 19) + 1
}
