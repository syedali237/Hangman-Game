const wordDisplay = document.querySelector(".word-display");
const guesses = document.querySelector(".guess-text b");
const keyboardDiv = document.querySelector(".keyboard")
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again"); 

let currentWord , correctLetters , wrongGuessCount;
const maxGuesses = 6;

const resetGame = () =>{
    // resetting all variables and UI
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    guesses.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    // creating dashes li of word length 
    wordDisplay.innerHTML = currentWord.split("").map(()=> `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
} 

const getRandomWord = () => {
    //getting random word and hint 
    const { word , hint } = wordList[Math.floor(Math.random()*wordList.length)];
    console.log(word,hint);
    currentWord = word;
    console.log(currentWord);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    setTimeout(()=> {
        const modalText = isVictory ?  `You found the word: ` : `The correct word was:`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>` ;
        gameModal.classList.add("show");
    }, 300);
}

// currentWord.split('')  or [...currentWord]

const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter , index) => {
            if(letter === clickedLetter){
            correctLetters.push(letter);
            wordDisplay.querySelectorAll("li")[index].innerText = letter;
            wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            console.log(clickedLetter, "exists");
        }
        });
    } else {
        //if clicked letter does not exist
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
        console.log(clickedLetter, "does not");
    }

    button.disabled = true;
    guesses.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    //calling gameover function if any conditions occurs
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

// creating keyboard buttons
for (let i = 97; i <= 122 ; i++ ){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", clicked => initGame(clicked.target, String.fromCharCode(i)));
}

getRandomWord();

playAgainBtn.addEventListener("click", () => {
    getRandomWord();
});
