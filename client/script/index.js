import { dictionary } from "../Dictionary/dictionary.js";

// console.log("dictionary: ",dictionary)

const gameplayLetters = document.getElementById("gameplayLetters");
const emptyLetters = document.getElementsByClassName("emptyLetters");
const gallows = document.getElementById("gallows");
const usedLetterSection = document.getElementById("usedLetterSection");
const buttons = document.getElementsByTagName("button");

const wordList = {
  animals: [
    "cat",
    "dog",
    "bunny",
    "rabbit",
    "panda",
    "capybara",
    "monkey",
    "kitten",
    "puppy",
    "cow",
    "horse",
    "chicken",
    "sheep",
    "pig",
    "lamb",
    "donkey",
  ],
  people: [
    "korra",
    "sam",
    "leo",
    "dash",
    "whitney",
    "sankara",
    "liliana",
    "ruthie",
    "ruby",
    "sophia",
    "mira",
    "chase",
    "val",
    "jenny",
    "amy",
    "rebecca",
    "bea",
    "trey",
    "daniel",
    "baah",
  ],
  cars: [
    "mustang",
    "bugatti",
    "toyota",
    "chevy",
    "double-decker bus",
    "minivan",
    "van",
    "bus",
    "forklift",
    "limo",
    "firetruck",
    "ambulance",
    "police car",
    "car",
    "matchbox",
  ],
  cartoons: [
    "bluey",
    "bingo",
    "mom",
    "dad",
    "bandit",
    "chili",
    "superkitties",
    "ginny",
    "sparks",
    "buddy",
    "bitsy",
    "paw patrol",
    "chase",
    "marshall",
    "skye",
    "zuma",
    "everest",
    "rubble",
    "rider",
    "liberty",
  ],
  youtubers: [
    "camodo gaming",
    "kindly keyin",
    "unspeakable",
    "mr beast",
    "spycakes",
    "ob",
    "glitch",
    "oh my god person",
    "preston",
    "the angry videogame nerd",
  ],
  videogames: [
    "wobbly life",
    "minecraft",
    "i am fish",
    "beamng",
    "teardown",
    "dronko wanko",
    "big brain run",
    "animal suika",
    "gato roboto",
    "super mario bros",
    "plants vs zombies",
  ],
  songs: ["lava chicken", "im a gummy bear", "unstopable"],
  movies: [
    "ghostbusters",
    "daddy daycare",
    "home alone",
    "garfield",
    "minecraft movie",
    "super mario bros movie",
    "pixels",
    "kungfu panda",
    "",
  ],
  tvshows: ["dexter"],
  books: [
    "i want my book back",
    "murder the truth",
    "the hug machine",
    "lou",
    "peanut goes for the gold",
    "you read to me i'll read to you",
    "if you give a mouse a cookie",
    "if you give a cat a cupcake",
    "if you give a moose a muffin",
    "kitty",
    "goodnight moon",
    "click clack goodnight",
    "little blue truck",
    "my bike",
    "the crayons love our planet",
    "too many rabbits",
    "inside cat",
    "mad at dad",
    "who is the mystery reader",
    "cats can't read",
    "penelope rex and the problem with pets",
    "where the wild things are",
    "the cat way",
    ""
  ],
  scrabbledictionary: dictionary,
  // games: [""]
};

let word;

for (let button of buttons) {
  button.addEventListener("click", selectRandomWord);
}

function selectRandomWord() {
  const category = wordList[this.id];
  const randomNum = Math.floor(Math.random() * category.length);
  // console.log(randomNum)
  word = category[randomNum];
  // console.log(word)
  document.removeEventListener("keypress", handleSubmitStartingWord);

  for (let button of buttons) {
    button.removeEventListener("click", selectRandomWord);
  }

  document.addEventListener("keypress", checkWord);
  placeEmptySpaces(word);
  addTextField();
}

const allowedCharacters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  " ",
  "-",
  "'"
];

let usedPile = [];

// const server = `http://127.0.0.1:5500/client`;
const server = `https://danhenrydev.com/projects/hangman/client`;

document.addEventListener("keypress", handleSubmitStartingWord);

function placeEmptySpaces(word) {
  document.getElementById("wordEntry").remove();
  document.getElementById("categories").remove();
  for (let i = 0; i < word.length; i++) {
    const emptyLetter = document.createElement("span");
    emptyLetter.className = "emptyLetters";
    document.getElementById("gameplayLetters").appendChild(emptyLetter);
    if (word[i] === " ") {
      emptyLetter.style.borderTop = "0";
      emptyLetter.style.borderBottom = "0";
    }
  }
}

function checkInputAgainstWord(word, key) {
  if (word.includes(key)) {
    for (let i = 0; i < word.length; i++) {
      if (word[i] === key) {
        usedPile.push(key);
        emptyLetters[i].textContent = key;
      }
    }

    let playedWord = "";
    for (let i = 0; i < emptyLetters.length; i++) {
      playedWord += emptyLetters[i].textContent;
    }

    let checkWord = "";
    for (let i = 0; i < word.length; i++) {
      if (word[i] !== " ") {
        checkWord += word[i];
      }
    }

    // console.log(checkWord);

    if (playedWord === checkWord) {
      setTimeout(() => {
        alert("Congratulations! You Win!");
        restartGame();
      }, 500);
    }
  } else {
    if (!usedPile.includes(key)) {
      usedPile.push(key);

      const usedLetter = document.createElement("span");
      usedLetter.className = "usedLetters";
      usedLetter.textContent = key;

      usedLetterSection.appendChild(usedLetter);

      let prevNum = gallows.src[gallows.src.length - 5];

      const newNum = `${server}/media/${+prevNum + 1}.png`;
      if (+prevNum + 1 < 7) {
        gallows.src = newNum;
      } else if (+prevNum + 1 === 7) {
        gallows.src = newNum;
        for (let i = 0; i < word.length; i++) {
          emptyLetters[i].textContent = word[i];
        }
        document.removeEventListener("keypress", checkWord);
        setTimeout(() => {
          alert("Game Over");
          setTimeout(() => {
            restartGame();
          }, 2000);
        }, 500);
      }
    }
  }
}

function handleSubmitStartingWord(event) {
  const wordEntry = document.getElementById("wordEntry");

  word = wordEntry.value;
  // console.log(word)
  for (let i = 0; i < word.length; i++) {
    if (!allowedCharacters.includes(word[i])) {
      return;
    }
  }

  const key = event.key.toLowerCase() || event.keyCode;
  if (key === "enter" && word.length > 0) {
    document.removeEventListener("keypress", handleSubmitStartingWord);

    document.addEventListener("keypress", checkWord);
    addTextField();
    placeEmptySpaces(word);
  }
}

function addTextField() {
  const textField = document.createElement("input");
  textField.id = "inputField";
  textField.autocomplete = "off";
  textField.autofocus = true;
  document.getElementById("gameplayLetters").after(textField);
}

function checkWord(event) {
  const key = event.key.toLowerCase() || event.keyCode;

  if (allowedCharacters.includes(key)) {
    checkInputAgainstWord(word, key);
  }
}

function restartGame() {
  word = "";
  location.reload();
}
