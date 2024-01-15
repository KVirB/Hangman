document.addEventListener("DOMContentLoaded", function () {
  onLoadPage();
});

let index = Math.floor(Math.random() * 3) + 1;
let disableKeypress = false;
let questions;
let incorrect = 0;
let correct = 0;
let modal = document.getElementById("modal");
let answer;
let gameStatus = document.getElementById("game-status");
let gameAnswer = document.getElementById("game-answer");
let numberOfGuesses = document.getElementById("number-of-guesses");

const onLoadPage = () => {
  letters = [];
  fetch("api/letter.json")
    .then((response) => response.json())
    .then((data) => {
      let lettersContainer = document.getElementById("letters-container");
      data.forEach((letter) => {
        let letterButton = document.createElement("button");
        letterButton.classList.add("letter");
        letterButton.textContent = letter;
        letterButton.id = "button-" + letter;
        letterButton.addEventListener("click", function (e) {
          selectLetter(e.target.textContent, letterButton);
        });

        window.addEventListener("keypress", function (e) {
          if (disableKeypress) {
            return;
          }
          var key = e.code.toUpperCase()[3];
          var button = document.getElementById("button-" + key);
          if (button && !button.dataset.isLogged) {
            selectLetter(key, button);
            button.dataset.isLogged = true;
          }
        });
        lettersContainer.appendChild(letterButton);
      });
    });
  fetch("api/data.json")
    .then((response) => response.json())
    .then((data) => {
      questions = data;
      question();
    });
};
const question = () => {
  answer = questions[index - 1].word;
  let question = document.getElementById("question");
  question.textContent = questions[index - 1].question;
  let word = document.getElementById("word");
  questions[index - 1].word.forEach((letter) => {
    let wordLetterUnknown = document.createElement("span");
    wordLetterUnknown.classList.add("word-letter-unknown");
    word.appendChild(wordLetterUnknown);

    let wordLetter = document.createElement("span");
    wordLetter.classList.add("word-letter");
    wordLetter.id = letter;
    wordLetter.textContent = letter;
    wordLetter.style.display = "none";
    wordLetterUnknown.appendChild(wordLetter);
  });
};
let incorrectGuesses = document.getElementById("incorrect");
let guesses = document.createElement("span");
guesses.classList.add("guesses");
guesses.textContent = " " + incorrect + " / " + "6";
incorrectGuesses.appendChild(guesses);

const openModal = () => {
  modal.style.display = "block";
  disableKeypress = true;
};

const closeModal = () => {
  modal.style.display = "none";
  disableKeypress = false;
};

const selectLetter = (letter, letterButton) => {
  letterButton.disabled = true;
  const letters = document.querySelectorAll("#" + letter);

  if (letters.length !== 0) {
    correct += letters.length;
  } else {
    if (incorrect < 6) {
      incorrect += 1;
      guesses.textContent = " " + incorrect + " / " + "6";
    }
  }
  letters.forEach((element) => {
    element.style.display = "block";
  });

  if (correct === answer.length) {
    gameStatus.textContent = "Status: You win!";
    gameAnswer.textContent = `Answer: ${answer.join("")}`;
    numberOfGuesses.textContent =
      "Incorrect guesses " + incorrect + " / " + "6";
    openModal();
  }
  if (incorrect === 6) {
    gameStatus.textContent = "Status: You lose!";
    gameAnswer.textContent = `Answer: ${answer.join("")}`;
    numberOfGuesses.textContent =
      "Incorrect guesses " + incorrect + " / " + "6";
    openModal();
  }
  switch (incorrect) {
    case 1:
      document.getElementById("head").hidden = false;
      break;
    case 2:
      document.getElementById("body").hidden = false;
      break;
    case 3:
      document.getElementById("left-hand").hidden = false;
      break;
    case 4:
      document.getElementById("right-hand").hidden = false;
      break;
    case 5:
      document.getElementById("left-leg").hidden = false;
      break;
    case 6:
      document.getElementById("right-leg").hidden = false;
      break;
    default:
      return;
  }
};

const newGame = () => {
  incorrect = 0;
  correct = 0;
  document.getElementById("head").hidden = true;
  document.getElementById("body").hidden = true;
  document.getElementById("left-hand").hidden = true;
  document.getElementById("right-hand").hidden = true;
  document.getElementById("left-leg").hidden = true;
  document.getElementById("right-leg").hidden = true;
  if (questions.length !== index) {
    index += 1;
  } else {
    index = 1;
  }
  let word = document.getElementById("word");
  while (word.firstChild) {
    word.removeChild(word.firstChild);
  }
  document.querySelectorAll(".letter").forEach((block) => {
    block.disabled = false;
    block.removeAttribute("data-is-logged");
  });
  guesses.textContent = " " + incorrect + " / " + "6";
  closeModal();
  question();
};
