const fs = require('fs');
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toUpperCase().split("\n");

let accept;
let emptyGuess = [];
let mysteryWord = [];
let word;
let remainingGuesses;
let validWord;
let guess;
let guessedLetters = [];
let playerWord;
let result;

let playGame = function(words) {
  word = words[randomFinder(0, words.length - 1)];
  validWord = word.split('');
  let wordLength = validWord.length;
  if (wordLength >= 4 && wordLength <= 6) {
    for (let i = 0; i < wordLength; i++) {
        emptyGuess.push('');
        mysteryWord.push(validWord[i].toUpperCase());
    }
  } else {
    return playGame(words);
  }
};

function chooseGame(accept) {
  if(accept === 'no') {
    alert('Playing it safe, or nahh?');
  } else if (accept === 'yes') {
    return playGame(words);
  }
}

let randomFinder = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function match(guess) {
  for (let i = 0; i < mysteryWord.length; i++) {
    if (mysteryWord[i] === guess) {
      emptyGuess[i] = guess;
    }
  }
  guessedLetters.push(guess);
  remainingGuesses--;
  return emptyGuess;
}

function repeat() {
  let searchGuesses = guessedLetters.slice().sort();
  for (let i = 0; i < guessedLetters.length; i++) {
    if (searchGuesses[i - 1] == searchGuesses[i]) {
      guessedLetters.pop(searchGuesses[i]);
      remainingGuesses++;
    }
  }
};

function findResult(emptyGuess) {
  let playerWord = emptyGuess.join(',');
  let orignalWord = mysteryWord.join(',');
  for (let i = 0; i < emptyGuess.length; i++) {
    if (remainingGuesses == 0 && emptyGuess[i] == ' ') {
      result = "Game Over! You lost BYE.";
      emptyGuess = mysteryWord;
      return result;
    } else if (playerWord === orignalWord) {
      result = "Congrats";
      return result;
    }
  }
};

module.exports = {
  accept: accept,
  emptyGuess: emptyGuess,
  mysteryWord: mysteryWord,
  word: word,
  remainingGuesses: remainingGuesses,
  validWord: validWord,
  guess: guess,
  guessedLetters: guessedLetters,
  playerWord: playerWord,
  chooseGame: chooseGame,
  match: match,
  repeat: repeat,
  findResult: findResult,
  result: result,
}
