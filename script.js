'use strict';

//  Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl1 = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

//Staring condition

score0El.textContent = 0;
score1El.textContent = 0;
diceEl1.classList.add('hidden');

let currentScore, activePlayer, scores, playing;

const init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  current1El.textContent = 0;
  current0El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player-winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('active--player');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dcie functionality
btnRoll.addEventListener('click', function () {
  if (playing === true) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. then we display the dice
    diceEl1.classList.remove('hidden');
    diceEl1.src = `dice-${dice}.png`;
    //3.check rolled 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      // current0El.textContent = currentScore; //Change letter
    }
    //  4. Switch the next player
    else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing === true) {
    // console.log(`btn pressed`);
    scores[activePlayer] += currentScore;
    // console.log(activePlayer);
    // console.log(scores[activePlayer]);

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      diceEl1.classList.add('hidden');
      playing = false;
      //Finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
