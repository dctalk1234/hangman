
let submitWordButton = document.querySelector('.submitWordButton');
let board = document.querySelector('.board');

let word;
function createBoard(e) {
    word = document.querySelector('.input').value;
    word = word.split('');
    clearBoard();
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

    let win = checkWin();
    if(win)
    {
        alert('you win');
    }
}

function wrongGuess(letter) {
    let strikes = document.querySelector('.strikes');
    let newStrike = document.createElement('div');
    newStrike.innerText = guess;
    strikes.appendChild(newStrike);
}

function checkWin() {
    let letters = document.querySelectorAll('.letter');
    
    for(let i = 0; i < letters.length; i++)
    {
        if(letters[i].style.borderBottom != 'none')
        {
            return false;
        }
    }

    return true;
}

function clearBoard() {
    while(board.firstChild)
    {
        board.removeChild(board.firstChild);
    }
}





submitWordButton.addEventListener('click', createBoard);