document.addEventListener("DOMContentLoaded", function () {
  onLoadPage();
});

let index = 2;
let incorrect = 0;
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
        letterButton.addEventListener("click", function (e) {
          selectLetter(e.target.textContent, letterButton);
        });
        lettersContainer.appendChild(letterButton);
      });
    });
  fetch("api/data.json")
    .then((response) => response.json())
    .then((data) => {
      let question = document.getElementById("question");
      question.textContent = data[index].question;
      let word = document.getElementById("word");
      data[index].word.forEach((letter) => {
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
    });
};
let incorrectGuesses = document.getElementById("incorrect");
let guesses = document.createElement("span");
guesses.classList.add("guesses");
guesses.textContent = " " + incorrect + " / " + "6";
incorrectGuesses.appendChild(guesses);

const selectLetter = (letter, letterButton) => {
  console.log(letterButton);
  letterButton.disabled = true;
  let test = document.querySelectorAll("#" + letter);
  if (test.length === 0) {
    if (incorrect < 6) {
      incorrect += 1;
      guesses.textContent = " " + incorrect + " / " + "6";
    }
  }
  test.forEach((element) => {
    element.style.display = "block";
  });
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
      alert("Нет таких значений");
  }
};
