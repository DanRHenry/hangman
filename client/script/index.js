// import {dictionary} from "../Dictionary/dictionary.js"

// console.log("dictionary: ",dictionary)

const gameplayLetters = document.getElementById("gameplayLetters");
const emptyLetters = document.getElementsByClassName("emptyLetters");
const gallows = document.getElementById("gallows");
const usedLetterSection = document.getElementById("usedLetterSection");
const buttons = document.getElementsByTagName("button")

const dictionary = {
    animals: ["cat", "dog", "bunny", "rabbit", "panda", "capybara", "monkey", "kitten", "puppy","cow", "horse", "chicken", "sheep", "pig", "lamb", "donkey"],
    classmates: ["korra", "sam", "leo", "dash", "whitney", "sankara", "liliana", "ruthie", "ruby", "sophia", "mira", "chase", "val", "jenny", "amy", "rebecca", "bea"],
    cars: ["mustang", "bugatti", "toyota", "chevy", "double-decker bus"],
    cartoons: ["bluey", "bingo", "mom", "dad", "bandit", "chili", "superkitties", "ginny", "sparks", "buddy", "bitsy", "paw patrol", "chase", "marshall", "skye", "zuma", "everest", "rubble", "rider", "liberty"],
    youtubers: ["camodo gaming", "kindly keyin", "unspeakable", "mr beast", "spycakes", "ob"],
    videogames: ["wobbly life", "minecraft", "i am fish", "beamng", "teardown", "dronko wanko", "big brain run", "animal suika"],
    songs: ["lava chicken", "im a gummy bear"]
}

let word;

for (let button of buttons) {
    button.addEventListener("click", selectRandomWord)
}

function selectRandomWord() {
    const category = dictionary[this.id]
    const randomNum = Math.floor(Math.random()* category.length) 
    // console.log(randomNum)
    word = category[randomNum]
    // console.log(word)
          document.removeEventListener("keypress", handleSubmitStartingWord);

          for (let button of buttons) {
              button.removeEventListener("click", selectRandomWord)
          }

      document.addEventListener("keypress", checkWord);
    placeEmptySpaces(word);

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
  ];

  let usedPile = [];

  const server = `http://127.0.0.1:5500/client`;

  document.addEventListener("keypress", handleSubmitStartingWord);

  function placeEmptySpaces(word) {
    // console.log("placing empty spaces")
    document.getElementById("wordEntry").remove();
    document.getElementById("categories").remove();
    for (let i = 0; i < word.length; i++) {
      const emptyLetter = document.createElement("span");
      emptyLetter.className = "emptyLetters";
      document.getElementById("gameplayLetters").appendChild(emptyLetter);
    }
    // console.log("done placing empty letters")
  }

  function checkInputAgainstWord(word, key) {
    if (word.includes(key)) {
    //   console.log("key is here");
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
    //   console.log(playedWord, word);
      if (playedWord === word) {
        setTimeout(() => {
                    alert("Congratulations! You Win!");
        restartGame();

        }, 500);
      }
    } else {
    //   console.log("key is not here");
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
          setTimeout(() => {
                alert("Game Over");
          }, 500)
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
      placeEmptySpaces(word);
    }
  }

  function checkWord(event) {
    // console.log('checking word....')
    const key = event.key.toLowerCase() || event.keyCode;

    if (allowedCharacters.includes(key)) {
      checkInputAgainstWord(word, key);
    }
  }

  function restartGame() {
    word = ""
    location.reload()
  }
