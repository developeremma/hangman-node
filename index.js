var inquirer = require("inquirer");
var figlet = require("figlet");
var Letter = require("./Letter");
var Word = require("./Word");


// Set Global VARIABLES
var wordArr = ["css", "html", "node", "javascript", "python", "bootstrap"];
var chosenWord = "";
var lettersinWord = [];
var numberofBlanks = 0;
var successesAndBlanks = [];
var wrongLetters = [];
var randWord;
// Counters
var winningCount = 0;
var guessesLeft;

Word.prototype.roundDone = () => {
// Figlet magic
  figlet(successesAndBlanks.join(" "), function (err,data) {
    console.log('\n');
    console.log("Guess left " + guessesLeft);
    console.log("Incorrect Guesses " + wrongLetters.join(" "));
    console.log('\n');
    // did they win? if yes increment winning count by 1
    if (lettersinWord.toString() === successesAndBlanks.toString()) {
        winningCount++;
        console.log('\n');
        figlet("Winner", function (err, data) {
          console.log(data)
      });
      startGame();
      }
      //did they lose?
      else if (guessesLeft === 0) {
        figlet("Loser", function(err,data){
          console.log(data);
        });
        startGame();
      }
    });
};

// does the letter chosen match any letters of the word?
Letter.prototype.letterChecker = function (letter) {
    var isLetterCorrect = false;
    for (var i = 0; i < numberofBlanks; i++){
      if(chosenWord[i] == letter){//check each letter against each letter of chosen word
        isLetterCorrect = true;
      }
    }
//replace the blanks with letter --this is done if they chose correctly
    if (isLetterCorrect = true) {
      for (var i = 0; i < numberofBlanks; i++) {
          if (chosenWord[i] == letter) {
            successesAndBlanks[i] = letter;
        }
      }
    }
//push letter to wrongLetters array, and decrease guesses bank by 1 --this is done when guess wrong
    else{
      wrongLetters.push(letter);
      guessesLeft--;
      console.log(guessesLeft);
    }
    //ask again using inquirer
    setTimeout(startInquirer,1000);
};
//let the game begin and set all values to default
  function startGame() {
      randWord =  new Word(wordArr[Math.floor(Math.random() * wordArr.length)]);
      chosenWord = randWord.word;
      lettersinWord = chosenWord.split("");
      numberofBlanks = lettersinWord.length;
      guessesLeft = 10;
      wrongLetters = [];
      successesAndBlanks = [];

      for (var i = 0; i < numberofBlanks; i++){
        successesAndBlanks.push("-");
      }
    //figlet title magic
    figlet("Dev Hangman", function(err,data){
        console.log(data);
        figlet(successesAndBlanks.join(" "), function (err, data){
            console.log('\n');
            console.log("Win Count " + winningCount);
            console.log(data)
            console.log('\n');
        });
    });
  };
// inquirer FUNCTION
function startInquirer() {
    inquirer.prompt([{
      name: "letter",
      message: "Type your letter guess"
    }]).then(function (ans){
        var guessedLetter = new Letter(ans.letter);
        guessedLetter.letterChecker(guessedLetter.letter);
        randWord.roundDone();
      });
  };
startGame();
setTimeout(startInquirer, 1000);//so it starts shortly after figlet render
