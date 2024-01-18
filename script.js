document.addEventListener('DOMContentLoaded', function () {
  onLoadPage();
});

let index = Math.floor(Math.random() * 10) + 1;
let disableKeypress = false;
let questions;
let incorrect = 0;
let correct = 0;
let answer;

const page = document.getElementById('page');

const modalWindow = document.createElement('div');
modalWindow.classList.add('modal-window');
modalWindow.id = 'modal';
page.appendChild(modalWindow);

const modalWindowContent = document.createElement('div');
modalWindowContent.classList.add('modal-window-content');
modalWindow.appendChild(modalWindowContent);

const gameStatusP = document.createElement('p');
gameStatusP.id = 'game-status';
modalWindowContent.appendChild(gameStatusP);

const gameAnswerP = document.createElement('p');
gameAnswerP.id = 'game-answer';
modalWindowContent.appendChild(gameAnswerP);

const numberOfGuessesP = document.createElement('p');
numberOfGuessesP.id = 'number-of-guesses';
modalWindowContent.appendChild(numberOfGuessesP);

const btnNext = document.createElement('button');
btnNext.textContent = 'New Game';
btnNext.classList.add('btn-next');
btnNext.addEventListener('click', function () {
  newGame();
});
modalWindowContent.appendChild(btnNext);

const main = document.createElement('div');
main.classList.add('main');
page.appendChild(main);

const gallowsContainer = document.createElement('section');
gallowsContainer.classList.add('gallows-container');
main.appendChild(gallowsContainer);

const gallows = document.createElement('div');
gallows.classList.add('gallows');
gallowsContainer.appendChild(gallows);

const gallowsRectangle1 = document.createElement('span');
gallowsRectangle1.classList.add('gallows-rectangle-1');
gallows.appendChild(gallowsRectangle1);

const gallowsRectangle2 = document.createElement('span');
gallowsRectangle2.classList.add('gallows-rectangle-2');
gallows.appendChild(gallowsRectangle2);

const gallowsRectangle3 = document.createElement('span');
gallowsRectangle3.classList.add('gallows-rectangle-3');
gallows.appendChild(gallowsRectangle3);

const gallowsRectangle4 = document.createElement('span');
gallowsRectangle4.classList.add('gallows-rectangle-4');
gallows.appendChild(gallowsRectangle4);

const head = document.createElement('img');
head.classList.add('head');
head.id = 'head';
head.src = './img/head.svg';
head.alt = 'head';
head.hidden = true;
gallows.appendChild(head);

const body = document.createElement('img');
body.classList.add('body');
body.id = 'body';
body.src = './img/body.svg';
body.alt = 'head';
body.hidden = true;
gallows.appendChild(body);

const leftHand = document.createElement('img');
leftHand.classList.add('left-hand');
leftHand.id = 'left-hand';
leftHand.src = './img/hand-left.svg';
leftHand.alt = 'left hand';
leftHand.hidden = true;
gallows.appendChild(leftHand);

const rightHand = document.createElement('img');
rightHand.classList.add('right-hand');
rightHand.id = 'right-hand';
rightHand.src = './img/hand-right.svg';
rightHand.alt = 'right hand';
rightHand.hidden = true;
gallows.appendChild(rightHand);

const leftLeg = document.createElement('img');
leftLeg.classList.add('left-leg');
leftLeg.id = 'left-leg';
leftLeg.src = './img/leg-left.svg';
leftLeg.alt = 'left leg';
leftLeg.hidden = true;
gallows.appendChild(leftLeg);

const rightLeg = document.createElement('img');
rightLeg.classList.add('right-leg');
rightLeg.id = 'right-leg';
rightLeg.src = './img/leg-right.svg';
rightLeg.alt = 'right leg';
rightLeg.hidden = true;
gallows.appendChild(rightLeg);

const divForH1 = document.createElement('div');
gallowsContainer.appendChild(divForH1);

const gameName = document.createElement('h1');
gameName.textContent = 'Hangman game';
gameName.classList.add('game-name');
divForH1.appendChild(gameName);

const gameContainer = document.createElement('section');
gameContainer.classList.add('game-container');
main.appendChild(gameContainer);

const word = document.createElement('div');
word.classList.add('word');
word.id = 'word';
gameContainer.appendChild(word);

const questionP = document.createElement('p');
questionP.classList.add('question');
questionP.id = 'question';
gameContainer.appendChild(questionP);

const guessesContainer = document.createElement('div');
gameContainer.appendChild(guessesContainer);

const incorrectP = document.createElement('p');
incorrectP.id = 'incorrect';
incorrectP.textContent = 'Incorrect guesses:';
guessesContainer.appendChild(incorrectP);

const lettersContainer = document.createElement('div');
lettersContainer.classList.add('letters-container');
lettersContainer.id = 'letters-container';
gameContainer.appendChild(lettersContainer);

const onLoadPage = () => {
  fetch('api/letter.json')
    .then((response) => response.json())
    .then((data) => {
      let lettersContainer = document.getElementById('letters-container');
      data.forEach((letter) => {
        let letterButton = document.createElement('button');
        letterButton.classList.add('letter');
        letterButton.textContent = letter;
        letterButton.id = 'button-' + letter;
        letterButton.addEventListener('click', function (e) {
          selectLetter(e.target.textContent, letterButton);
        });

        window.addEventListener('keypress', function (e) {
          if (disableKeypress) {
            return;
          }
          let check = e.code.substring(0, 3);
          if (check === 'Key') {
            let key = e.code.toUpperCase()[3];
            let button = document.getElementById('button-' + key);
            if (button && !button.dataset.isLogged) {
              selectLetter(key, button);
              button.dataset.isLogged = true;
            }
          }
        });
        lettersContainer.appendChild(letterButton);
      });
    });
  fetch('api/data.json')
    .then((response) => response.json())
    .then((data) => {
      questions = data;
      question();
    });
};
const question = () => {
  answer = questions[index - 1].word;
  console.log('Answer: ' + answer.join(''));
  let question = document.getElementById('question');
  question.textContent = questions[index - 1].question;
  let word = document.getElementById('word');
  questions[index - 1].word.forEach((letter) => {
    let wordLetterUnknown = document.createElement('span');
    wordLetterUnknown.classList.add('word-letter-unknown');
    word.appendChild(wordLetterUnknown);

    let wordLetter = document.createElement('span');
    wordLetter.classList.add('word-letter');
    wordLetter.id = letter;
    wordLetter.textContent = letter;
    wordLetter.style.display = 'none';
    wordLetterUnknown.appendChild(wordLetter);
  });
};
let incorrectGuesses = document.getElementById('incorrect');
let guesses = document.createElement('span');
guesses.classList.add('guesses');
guesses.textContent = ' ' + incorrect + ' / ' + '6';
incorrectGuesses.appendChild(guesses);

const openModal = () => {
  modalWindow.style.display = 'block';
  disableKeypress = true;
};

const closeModal = () => {
  modalWindow.style.display = 'none';
  disableKeypress = false;
};

const selectLetter = (letter, letterButton) => {
  letterButton.disabled = true;
  const letters = document.querySelectorAll('#' + letter);

  if (letters.length !== 0) {
    correct += letters.length;
  } else {
    if (incorrect < 6) {
      incorrect += 1;
      guesses.textContent = ' ' + incorrect + ' / ' + '6';
    }
  }
  letters.forEach((element) => {
    element.style.display = 'block';
  });

  if (correct === answer.length) {
    gameStatusP.textContent = 'Status: You win!';
    gameAnswerP.textContent = `Answer: ${answer.join('')}`;
    numberOfGuessesP.textContent =
      'Incorrect guesses ' + incorrect + ' / ' + '6';
    openModal();
  }
  if (incorrect === 6) {
    gameStatusP.textContent = 'Status: You lose!';
    gameAnswerP.textContent = `Answer: ${answer.join('')}`;
    numberOfGuessesP.textContent =
      'Incorrect guesses ' + incorrect + ' / ' + '6';
    openModal();
  }
  switch (incorrect) {
    case 1:
      document.getElementById('head').hidden = false;
      break;
    case 2:
      document.getElementById('body').hidden = false;
      break;
    case 3:
      document.getElementById('left-hand').hidden = false;
      break;
    case 4:
      document.getElementById('right-hand').hidden = false;
      break;
    case 5:
      document.getElementById('left-leg').hidden = false;
      break;
    case 6:
      document.getElementById('right-leg').hidden = false;
      break;
    default:
      return;
  }
};

const newGame = () => {
  incorrect = 0;
  correct = 0;
  document.getElementById('head').hidden = true;
  document.getElementById('body').hidden = true;
  document.getElementById('left-hand').hidden = true;
  document.getElementById('right-hand').hidden = true;
  document.getElementById('left-leg').hidden = true;
  document.getElementById('right-leg').hidden = true;
  if (questions.length !== index) {
    index += 1;
  } else {
    index = 1;
  }
  let word = document.getElementById('word');
  while (word.firstChild) {
    word.removeChild(word.firstChild);
  }
  document.querySelectorAll('.letter').forEach((block) => {
    block.disabled = false;
    block.removeAttribute('data-is-logged');
  });
  guesses.textContent = ' ' + incorrect + ' / ' + '6';
  closeModal();
  question();
};
