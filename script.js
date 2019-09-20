
/******dom selected elements*******/
let submitWordButton = document.querySelector(".submitWordButton");
let board = document.querySelector(".board");
let strikes = document.querySelector(".strikes");

/********variable declarations******/
let word;
let guess;
let maxWrongGuesses = 0;
let userWrongGuesses = 0;
let userGuessesArr = [];
let errorMessage;

/*
 *  This function handles the creating and populating of the game board by taking input from the user.
 *  inputs: the word to be guessed.
 *  outputs: changes the dom by adding game elements that will be manipulated later.
 */
function createBoard(e) {
	e.preventDefault();

	word = document.querySelector(".input").value;
	word = word.split("");

	clearBoard();                      //make sure board is empty before adding all the new elements

	maxWrongGuesses = generateMaxGuess();  // use function to determine what the maximum number of wrong guesses before losing
    
    for (let i = 0; i < word.length; i++) {          // this for loop creates the blanks for each letter in the word to be guessed
		let newLetter = document.createElement("p");   //create new p element
		newLetter.classList.add("letter");          //add letter class to add correct css to a blank space

		board.appendChild(newLetter);              //apend that element to the board div in html
	}

	let guessForm = document.createElement("input");      //create input form element
	guessForm.type = "text";                            //assign a type to be what is imputed
	guessForm.placeholder = "enter letter to guess";     //assign a placeholder so user knows what to add
	guessForm.classList.add("userGuess");               // add class to help select specific element in the dom
	board.appendChild(guessForm);                       // append this form to board

	let submitLetterGuessButton = document.createElement("input"); // create input submit element
	submitLetterGuessButton.type = "submit";                        // assign a type of submit 
	submitLetterGuessButton.value = "submit";                        // add text inside button describing what it does
	submitLetterGuessButton.addEventListener("click", checkGuess);   // add event listener to this submit button
	board.appendChild(submitLetterGuessButton);                      // append this button to the board

    errorMessage = document.createElement("p");                   // create p element
    errorMessage.innerText = 'error: already guessed';          // add inner text
    errorMessage.classList.add("hide", "error");                // add classes to add css and to hide the error message
    board.appendChild(errorMessage);                           // append hidden p element to end of board
    
	checkGuess();                                         // call checkGuess function to handle any spaces within the user's input.
	userWrongGuesses = 0;                                 // make sure userWrongGuesses is 0 at the start regardless of whether or not checkGuess call above returned a missed guess or not
}


/*
 * Functionality: This function handles a users guess of a letter or of the complete word. 
 * If the user's guess is correct this function adds that letter in the correct positon on the board if not calls another function to handle the missed guess 
 * 
 * Inputs: triggered by event listener or by function call grabbing users input in element or if no user input then treating it as a space
 * 
 * Outputs: depending on whether the guess was correct or not the dom is manipulated to handle those situations
 */
function checkGuess(e) {
	if(e){                  // if function triggered by event listener
        e.preventDefault();     //prevent default behavior
    }

	guess = document.querySelector(".userGuess").value || " ";     // assign guess variable to whatever the user inputed or " " if no user input 
    
    if (!userGuessesArr.includes(guess)) {                  // check array of all previous guesses to make sure the guess has not been made before
        userGuessesArr.push(guess);                        // add guess to array of previous guesses
        errorMessage.classList.add('hide');                 // make sure the error message is hidden if it wasn't before
		let letters = document.querySelectorAll(".letter");         // grab all the letter objects from the game board
		let correctGuess = false;                               //set correctGuess flag to false

		if (guess.length > 1) {                         // if the user has attempted to guess the entire word
			correctGuess = checkWord(correctGuess);         // use checkWord function to find out whether their guess was correct
		} else {
			for (let i = 0; i < word.length; i++) {            // iterate through the word 
				if (guess.toLowerCase() === word[i].toLowerCase()) {        //if the letter is at a index in the word
					correctGuess = true;                                    // their guess was correct
					letters[i].innerText = guess;                           // grab the associated letter element and add that letter to the p tag
					letters[i].style.borderBottom = "none";                 // remove the bottom border styling
				}
			}
		}

		if (!correctGuess) {         // if the user made and inccorect guess
			wrongGuess();           //call wrongGuess function to handle that
		}

		let win = checkWin();      // check if user has won 
		if (win) {            //if they won
			openModal('YOU WIN');    // open a modal box that says you win
		}

		if (userWrongGuesses > maxWrongGuesses) {      // if user has too many wrong guesses
			openModal("you lose");                 // open modal box that says you lose
		}
	} else {
		errorMessage.classList.remove('hide');     //if user has already made a particular guess display error message saying they have already guessed this before
	}
}


/********
 * Functionality: This function handles a users wrong guess by keeping track of how many times they have guessed wrong and added elements displaying previous missed guesses
 * inputs: none
 *  outputs: manipulate dom to display wrong guesses (so user can keep track)
 */
function wrongGuess() {
	userWrongGuesses++;                                  // increment variable to keep track
	let strikes = document.querySelector(".strikes");    // grab container element
	let newStrike = document.createElement("div");       // create new element
	newStrike.innerText = guess;                          // add innerText
	strikes.appendChild(newStrike);                     //add that element to container
}

/********
 * Functionality: This function handles if user has attempted to guess the entire word or phrase and gotten it correct
 * inputs: none
 * outputs: manipulate dom to display all the letters of the word instantly winning the game
 */
function correctWordGuess() {
	let letters = document.querySelectorAll(".letter");

	for (let i = 0; i < guess.length; i++) {
		letters[i].innerText = guess[i];
		letters[i].style.borderBottom = "none";
	}
}

/********
 * Functionality: This function checks whether the user has won or not
 * inputs: none
 * outputs: returns true if user has won. returns false if user has not yet.
 */
function checkWin() {
	let letters = document.querySelectorAll(".letter");

	for (let i = 0; i < letters.length; i++) {
		if (letters[i].style.borderBottom != "none") {     // check each letter and see if the border style is still present if one is then return false
			return false;
		}
	}

	return true;
}

/********
 * Functionality: This function clears the board 
 * inputs: none
 * outputs: manipulate dom to remove all elements besides base elements from original load
 */
function clearBoard() {
	userWrongGuesses = 0;
	maxWrongGuesses = 0;

	while (board.firstChild) {
		board.removeChild(board.firstChild);
	}

	while (strikes.firstChild) {
		strikes.removeChild(strikes.firstChild);
	}

	while (userGuessesArr.length) {
		userGuessesArr.pop();
	}
}

/********
 * Functionality: This function handles if user has attempted to guess the entire word or phrase and gotten it correct
 * inputs: none
 * outputs: manipulate dom to display all the letters of the word instantly winning the game
 */
function checkWord(correctGuess) {
	if (guess.length === word.length) {             //save on computations if guess is not even same number of letters as word
		
		let correct = 0;                         //variable to keep track of how many letters in guess are correct
		guess = guess.split("");                  // split guess string into array of letters for checking
		for (let i = 0; i < guess.length; i++) {
			if (guess[i] === word[i]) {                //if letter is the same as word in same position
				correct++;
			}
		}

		if (correct === word.length) {         //if guess was correct
			correctGuess = true;
			correctWordGuess();
		}
	}

	return correctGuess;
}

/********
 * Functionality: This function calculates the max number of guesses for each game
 * inputs: none
 * outputs: returns max guess calulated value
 */
function generateMaxGuess() {
    if(Math.floor(word.length * 1.5) > 10)
    {
        return 13;
    }
    else
    {
        return Math.floor(word.length * 1.5);
    }
}
/**********code for modal box if win*************** */
const modal = document.querySelector("#modal");

const close = document.querySelector("#close");

function openModal(message) {
    modal.firstChild().innerText = message;
	modal.style.display = "block";
}

function closeModal() {
	modal.style.display = "none";
}

close.addEventListener("click", closeModal);

submitWordButton.addEventListener("click", createBoard);
