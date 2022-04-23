'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const wins0El = document.querySelector('.wins--0');
const wins1El = document.querySelector('.wins--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const modalOverlay = document.querySelector('.modal-overlay');
const modalWindow = document.querySelector('.modal');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnRules = document.querySelector('.btn--rules');
const closeModalEl = document.querySelector('.close-modal');

let scores, currentScore, activePlayer, playing, playerWins;

// Starting conditions
const init = function () {
  scores = [0, 0];
  playerWins = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  wins0El.textContent = 0;
  wins1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const resetRound = function () {
  scores = [0, 0];
  currentScore = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
  }

  // Checks if players score is >= 100
  // If yes, adds a point to the wins score
  if (scores[activePlayer] >= 100) {
    playerWins[activePlayer] += 1;
    document.querySelector(`.wins--${activePlayer}`).textContent =
      playerWins[activePlayer];
    resetRound();
  }
  // If wins equals 3 points, player wins
  if (playerWins[activePlayer] === 3) {
    playing = false;
    diceEl.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
  } else {
    // Else, switch players
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);

// Modal

const closeModal = function () {
  modalWindow.classList.add('hidden');
  modalOverlay.classList.add('hidden');
};

const openModal = function () {
  modalWindow.classList.remove('hidden');
  modalOverlay.classList.remove('hidden');
};

btnRules.addEventListener('click', function () {
  openModal();
});

closeModalEl.addEventListener('click', function () {
  closeModal();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModal();
  }
});

modalOverlay.addEventListener('click', closeModal);
