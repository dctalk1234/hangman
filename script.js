let submitWordButton = document.querySelector('.submitWordButton');
let board = document.querySelector('.board');

let word;
function createBoard(e) {
    word = document.querySelector('.input').value;
    word = word.split('');

    for(let i = 0; i < word.length; i++)
    {
        let newLetter = document.createElement('p');
        newLetter.classList.add('letter');

        board.appendChild(newLetter);
    }

    let guessForm = document.createElement('input');
   guessForm.type = 'text';
   guessForm.placeholder = 'enter letter to guess';
   guessForm.classList.add('userGuess');
   board.appendChild(guessForm);

    let submitLetterGuessButton = document.createElement('input');
    submitLetterGuessButton.type = 'submit';
    submitLetterGuessButton.value = 'submit';
    submitLetterGuessButton.addEventListener('click', checkGuess);
    board.appendChild(submitLetterGuessButton);
    checkGuess();
    checkWin();
}

function checkGuess() {
   
    guess = document.querySelector('.userGuess').value || " ";
    
    
    let letters = document.querySelectorAll('.letter');
    let correctGuess = false;
    for(let i = 0; i < word.length; i++)
    {
        if(guess.toLowerCase() === word[i].toLowerCase())
        {
            correctGuess = true;
            letters[i].innerText = guess;
            letters[i].style.borderBottom = 'none';
          
        }
    }

    if(!correctGuess)
    {
        wrongGuess(guess);
    }
}

function wrongGuess(letter) {
    let strikes = document.querySelector('.strikes');
    let newStrike = document.createElement('div');
    newStrike.innerText = guess;
    strikes.appendChild(newStrike);
}

function checkWin() {
    
}





submitWordButton.addEventListener('click', createBoard);