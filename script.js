let submitWordButton = document.querySelector(".submitWordButton");
let board = document.querySelector(".board");
let strikes = document.querySelector(".strikes");

let word;
let guess;
let maxWrongGuesses = 0;
let userWrongGuesses = 0;
let userGuessesArr = [];
function createBoard(e) {
	word = document.querySelector(".input").value;
	word = word.split("");
	clearBoard();
	maxWrongGuesses = Math.floor(word.length * 1.5);
	for (let i = 0; i < word.length; i++) {
		let newLetter = document.createElement("p");
		newLetter.classList.add("letter");

		board.appendChild(newLetter);
	}

	let guessForm = document.createElement("input");
	guessForm.type = "text";
	guessForm.placeholder = "enter letter to guess";
	guessForm.classList.add("userGuess");
	board.appendChild(guessForm);

	let submitLetterGuessButton = document.createElement("input");
	submitLetterGuessButton.type = "submit";
	submitLetterGuessButton.value = "submit";
	submitLetterGuessButton.addEventListener("click", checkGuess);
	board.appendChild(submitLetterGuessButton);
	checkGuess();
	userWrongGuesses = 0;
}

function checkGuess() {
	guess = document.querySelector(".userGuess").value || " ";
	if (!userGuessesArr.includes(guess)) {
        userGuessesArr.push(guess);
		let letters = document.querySelectorAll(".letter");
		let correctGuess = false;

		if (guess.length > 1) {
			correctGuess = checkWord(correctGuess);
		} else {
			for (let i = 0; i < word.length; i++) {
				if (guess.toLowerCase() === word[i].toLowerCase()) {
					correctGuess = true;
					letters[i].innerText = guess;
					letters[i].style.borderBottom = "none";
				}
			}
		}

		if (!correctGuess) {
			wrongGuess();
		}

		let win = checkWin();
		if (win) {
			openModal();
		}

		console.log(userWrongGuesses);
		console.log(maxWrongGuesses);

		if (userWrongGuesses > maxWrongGuesses) {
			alert("you lose");
		}
	}
}

function wrongGuess() {
	userWrongGuesses++;
	let strikes = document.querySelector(".strikes");
	let newStrike = document.createElement("div");
	newStrike.innerText = guess;
	strikes.appendChild(newStrike);
}

function correctWordGuess() {
	let letters = document.querySelectorAll(".letter");

	for (let i = 0; i < guess.length; i++) {
		letters[i].innerText = guess[i];
		letters[i].style.borderBottom = "none";
	}
}

function checkWin() {
	let letters = document.querySelectorAll(".letter");

	for (let i = 0; i < letters.length; i++) {
		if (letters[i].style.borderBottom != "none") {
			return false;
		}
	}

	return true;
}

function clearBoard() {
	userWrongGuesses = 0;
	maxWrongGuesses = 0;

	while (board.firstChild) {
		board.removeChild(board.firstChild);
	}

	while (strikes.firstChild) {
		strikes.removeChild(strikes.firstChild);
	}
}

function checkWord(correctGuess) {
	if (guess.length === word.length) {
		//save on computations if guess is not even same number of letters as word
		let correct = 0;
		guess = guess.split("");
		for (let i = 0; i < guess.length; i++) {
			if (guess[i] === word[i]) {
				correct++;
			}
		}

		if (correct === word.length) {
			correctGuess = true;
			correctWordGuess();
		}
	}

	return correctGuess;
}

/**********code for modal box if win*************** */
const modal = document.querySelector("#modal");

const close = document.querySelector("#close");

function openModal() {
	modal.style.display = "block";
}

function closeModal() {
	modal.style.display = "none";
}

close.addEventListener("click", closeModal);

submitWordButton.addEventListener("click", createBoard);
