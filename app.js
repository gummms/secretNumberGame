let secretArray = [];
let maxNumber = randomMaxNumber();
let secretNumber = randomNumber();
let resetBtn = document.getElementById("reset");
let guessBtn = document.getElementById("guessbtn");
let tries = 1;

function randomMaxNumber() {
  return parseInt(Math.random() * 100 + 1);
}

function randomNumber() {
  let secretChosen = parseInt(Math.random() * maxNumber + 1);
  let arraySize = secretArray.length;

  if (arraySize == maxNumber) {
    secretArray = [];
  }

  if (secretArray.includes(secretChosen)) {
    return randomNumber();
  } else {
    secretArray.push(secretChosen);
    return secretChosen;
  }
}

function screenText(tag, text) {
  let fieldText = document.querySelector(tag);
  fieldText.innerHTML = text;
  if ("speechSynthesis" in window) {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1.5;
    window.speechSynthesis.speak(utterance);
  } else {
    console.log("Web Speech not supported on this browser.");
  }
}

function welcomeMessage() {
  screenText("h1", "Secret Number Game");
  screenText("p", `Choose a number between 1 and ${maxNumber}.`);
}

welcomeMessage();

function verifyGuess() {
  let guess = document.querySelector(".container__input").value;

  if (guess == secretNumber && guess != "") {
    screenText("h1", "Congratulations!");
    let wordTry = tries == 1 ? "try" : "tries";
    screenText("p", `You've guessed the secret number! Took you ${tries} ${wordTry}.`);
    resetBtn.disabled = false;
    guessBtn.disabled = true;
  } else if (guess != "") {
    screenText("h1", "Try again!");
    let wordBigLess = guess > secretNumber ? "less" : "bigger";
    screenText("p", `The secret number is ${wordBigLess} than ${guess}.`);
    cleanField();
  }
  tries++;
}

function cleanField() {
  guess = document.querySelector(".container__input");
  guess.value = " ";
}

function newGame() {
  welcomeMessage();
  cleanField();
  maxNumber = randomMaxNumber();
  secretNumber = randomNumber();
  guessBtn.disabled = false;
  resetBtn.disabled = true;
  tries = 1;
}
