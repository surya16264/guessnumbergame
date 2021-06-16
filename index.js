/*******************************Display player name in the title***************************/
const submitBtn = document.querySelector(".submit");
const linkName = document.querySelector(".link-name");

let randomValue = parseInt(Math.floor((Math.random() * 100)) + 1);
console.log(randomValue)
const checkBtn = document.querySelector(".check");
const userInput = document.querySelector(".number-input");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const startOver = document.querySelector(".result");
const lowHi = document.querySelector(".lowHi");
const p = document.createElement("p");

let previousGuesses = [];
let numGuess = 1;
let playGame = true;


/**
 * Submit addevent listener function
 */
submitBtn.addEventListener('click', () => {
    const FirstName = document.querySelector(".text1").value;
    if(FirstName == '') {
        alert("Type your name");
    }
    else {    
       sessionStorage.setItem('NameDetails', JSON.stringify(FirstName));
       const Names = JSON.parse(sessionStorage.getItem('NameDetails'))
       setName(Names)
       document.querySelector(".text1").value = '';
    }
})

 /**
 *  Setname funtion is to display the Names after welcome in the title
 */
function setName(TwoNames) {
    let nameInner = document.createElement("span");
    nameInner.innerText = TwoNames;
    nameInner.setAttribute("class", "name");
    linkName.appendChild(nameInner);
    return nameInner;
}

/**
 * Check addevent listener function
 */
if(playGame) {
    checkBtn.addEventListener('click', (e)=> {
     e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
});
}

/**
 * Validate funtion
 * @param {*} guess 
 */
 function validateGuess(guess) {
     if(isNaN(guess)) {
         alert('Please enter a valid number')
     }
     else if(guess < 1) {
         alert('Please enter a number greater than 1!')
     }
     else if(guess > 100) {
         alert('Please enter a number less than 100!')
     }
     else {
         previousGuesses.push(guess);
         if(numGuess === 11) {
             displayGuesses(guess);
             displayMessage('Game Over! Random Number was' + ' '+ randomValue);
             endGame();
         }
         else {
             displayGuesses(guess);
             checkGuess(guess);
         }
     }
 }
 
/**
 *  CheckGuess funtion to check and display the result
 * @param {*} guess 
 */
 function checkGuess(guess) {
     if(guess === randomValue) {
         displayMessage('Congratulations You win the game!!!');
         userInput.value = '';
         endGame();
     }
     else if(guess < randomValue) {
         displayMessage('OOPS! Your number is too low. Try Again!');
         userInput.value = '';
     }
     else if(guess > randomValue) {
         displayMessage('OMG!! Your number is too high. Tyr Again!');
         userInput.value = '';
     }
 }
 
/**
 * DisplayGuesses funtion display the previous tried numbers
 *  and also so the ramaining chances
 * @param {*} guess 
 */
 function displayGuesses(guess) {
     guessSlot.innerHTML += guess + " ";
     console.log('GuessSlot array' + " "+guessSlot.innerHTML)
     numGuess++;
     console.log('numGuess' + " "+numGuess)
     remaining.innerHTML = 11 - numGuess;
     console.log('Remaining chances' + " "+remaining.innerHTML)
 }
 
/**
 * DisplayMessages funtion to display the result
 * @param {*} messages 
 */
 function displayMessage(messages) {
     lowHi.innerHTML = messages;
     console.log('LowHi message' + " "+lowHi.innerHTML)
 }

 /**
  * Endgame funtion is to end the game and it disabled 
  * the input text box
  */
 function endGame() {
     userInput.value = '' ;
    userInput.setAttribute('disabled', '');
     p.classList.add('button');
     p.innerHTML = '<h1 id="newGame">Start new Game<h1>';
     startOver.appendChild(p);
     playGame = false;
     newGame();
 }
 
 /**
  * Newgame funtion is to start the new game by 
  * clicking on the start new game
  */
 function newGame() {
     const newGameButton = document.querySelector('#newGame');
     newGameButton.addEventListener('click', ()=>{
         randomValue = parseInt(Math.floor(Math.random()*100)+1);
         previousGuesses = [];
         numGuess = 1;
         guessSlot.innerHTML = '';
         lowHi.innerHTML = '';
         remaining.innerHTML = 11 - numGuess;
         userInput.removeAttribute('disabled');
         startOver.removeChild(p);
         playGame = true;
        sessionStorage.removeItem('NameDetails');
         const name = document.querySelector('.name');
         name.style.display = 'none';
     })
}
