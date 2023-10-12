'use strict';
let randomNumber = Math.trunc(Math.random() * 6) + 1;
let currentPlayer = 0;
const btnRoll = document.querySelector(`.btn--roll`);
const btnNew = document.querySelector(`.btn--new`);
const btnHold = document.querySelector(`.btn--hold`);
const current1 = document.querySelector(`#current--1`);
const score1 = document.querySelector(`#score--1`);
const score0 = document.querySelector(`#score--0`);
const current0 = document.querySelector(`#current--0`);
const player1 = document.querySelector(`.player--0`);
const player2 = document.querySelector(`.player--1`);

const dice = document.querySelector(`.dice`);

function changePlayer() {
  if (currentPlayer !== 0) {
    currentPlayer = 0;
  } else if (currentPlayer === 0) {
    currentPlayer = 1;
  }
}
dice.classList.add('hidden');
btnRoll.setAttribute('disabled', '');
btnHold.setAttribute('disabled', '');
btnRoll.addEventListener(`click`, () => {
  randomNumber = Math.trunc(Math.random() * 6) + 1;

  if (randomNumber !== 1) {
    if (currentPlayer === 0) {
      current0.textContent = Number(current0.textContent) + randomNumber;
      player1.classList.add('player--active');
      player2.classList.remove('player--active');
    } else {
      current1.textContent = Number(current1.textContent) + randomNumber;
      player2.classList.add('player--active');
      player1.classList.remove('player--active');
    }
  } else if (randomNumber === 1) {
    if (currentPlayer === 0) {
      current0.textContent = 0;
      changePlayer();
    } else {
      current1.textContent = 0;
      changePlayer();
    }
  }
  dice.src = `dice-${randomNumber}.png`;
});

btnHold.addEventListener(`click`, () => {
  if (currentPlayer === 0) {
    score0.textContent =
      Number(score0.textContent) + Number(current0.textContent);
    current0.textContent = 0;
    if (Number(score0.textContent) >= 100) {
      player1.classList.add('player--winner');
      if (localStorage.winner) {
        if (parseInt(localStorage.winner) > parseInt(score0.textContent)) {
          //localStorage.winner = score1.textContent;
        } else {
          localStorage.winner = score0.textContent;
        }
        document.querySelector('span').textContent = localStorage.winner;
      } else {
        localStorage.winner = score0.textContent;
      }

      btnHold.setAttribute('disabled', '');
      btnRoll.setAttribute('disabled', '');
    } else {
      changePlayer();
    }
  } else {
    score1.textContent =
      Number(score1.textContent) + Number(current1.textContent);
    current1.textContent = 0;
    if (Number(score1.textContent) >= 100) {
      player2.classList.add('player--winner');

      if (localStorage.winner) {
        if (parseInt(localStorage.winner) > parseInt(score1.textContent)) {
          //localStorage.winner = score1.textContent;
        } else {
          localStorage.winner = score1.textContent;
        }
        document.querySelector('span').textContent = localStorage.winner;
      } else {
        localStorage.winner = score1.textContent;
      }

      btnHold.setAttribute('disabled', '');
      btnRoll.setAttribute('disabled', '');
    } else {
      changePlayer();
    }
  }
});

btnNew.addEventListener(`click`, () => {
  dice.classList.remove('hidden');
  btnRoll.removeAttribute('disabled');
  btnHold.removeAttribute('disabled');
  document.querySelector('.dice2').classList.add('hidden');
  document.querySelectorAll(`.score`).forEach(score => {
    score.textContent = 0;
  });
  document.querySelectorAll(`.player`).forEach(player => {
    player.classList.remove('player--winner');
  });
  currentPlayer = 0;
  if (localStorage.winner) {
    document.querySelector('span').textContent = localStorage.winner;
  }
});
