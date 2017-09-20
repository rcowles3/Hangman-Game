// VARIABLES
// ===============================================
// ===============================================

// Array of word choices for Hang Man. 
var words = ["dbacks", "yankees", "athletics", "cardinals", "dodgers", "phillies", "orioles", "giants", "rangers", "angels", "braves", "indians", "mets", "twins", "tigers", "royals", "reds", "cubs", "marlins", "astros", "rockies", "royals", "pirates", "mariners", "expos", "padres", "nationals"];
// var words = ["cubs", "reds"]
var selectedWord = "";
// Array for the letters in the chosen word.
var lettersInWord = [];
var numBlanks = 0;
// Start the game with 0 wins/loss, 10 guesses
var wins = 0;
var loss = 0;
var guessRemain = 12;
// Wrong guesses, and blanks for correct guesses.
var wrongLetters = [];
var correctAndBlanks = [];

// FUNCTIONS
// ================================================
// ================================================

// When the user presses a key, it will run the following function, and and choose a random word from the array. 
function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];

    // .split will allow the selected word to be displayed as an array of individual letters
    lettersInWord = selectedWord.split("");

    // Number of blanks to the length of word
    numBlanks = lettersInWord.length;

    // Reset game variables
    correctAndBlanks = [];
    wrongLetters = [];
    guessRemain = 12;

    for (var i = 0; i < numBlanks; i++) {
        correctAndBlanks.push("_");
        // console.log(correctAndBlanks);
    }

    // Push javascript to modify html
    document.getElementById("guess-remain").innerHTML = guessRemain;
    document.getElementById("current-word").innerHTML = correctAndBlanks.join(" ");
    document.getElementById("user-guess").innerHTML = wrongLetters.join(" ");
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("loss").innerHTML = loss;
}

// Function to check if letter guessed already exists
function checkLetters(lettersGuessed) {
    // Defaults to letter not existing
    var lettersInWord = false;

    for (var i = 0; i < numBlanks; i++) {
        if (selectedWord[i] == lettersGuessed) {
            lettersInWord = true;
        }
    }
    // Checks location of letter and populates array with letter if found
    if (lettersInWord) {
        for (i = 0; i < numBlanks; i++) {
            if (selectedWord[i] == lettersGuessed) {
                correctAndBlanks[i] = lettersGuessed;
            }
        }
    }
    // If letter not found, then push to letterGuessed arrary and subtract from remaining guesses
    else {
        wrongLetters.push(lettersGuessed);
        guessRemain--;
    }
}

function roundDone() {
    // Modify HTML
    document.getElementById("guess-remain").innerHTML = guessRemain;
    document.getElementById("current-word").innerHTML = correctAndBlanks.join(" ");
    document.getElementById("user-guess").innerHTML = wrongLetters.join(" ");

    // Checks to see if user wins
    if (lettersInWord.toString() == correctAndBlanks.toString()) {
        // console.log(lettersInWord.toString() + " " + correctAndBlanks.toString());
        document.getElementById("wins").innerHTML = wins;
        wins++;
        alert("You Win! Play Again");
        startGame();
    }

    // Checks to see if you lost
    else if (guessRemain === 0) {
        loss++;
        alert("You Lose, Try Again");
        startGame();
    }
}

// MAIN PROCESS
// ================================================
// ================================================
// Initiate code
startGame();
// Functions performed on key click
document.onkeyup = function(event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    // Checks if already guessed letter
    if (letterGuessed == wrongLetters) {
        alert("Already guessed that letter, please try again.");
    } else {
        checkLetters(letterGuessed);
        roundDone();
    }
}
