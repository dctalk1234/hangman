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
}

function checkGuess() {
   
    guess = document.querySelector('.userGuess').value || " ";
    
    
    let letters = document.querySelectorAll('.letter');
    for(let i = 0; i < word.length; i++)
    {
        if(guess.toLowerCase() === word[i].toLowerCase())
        {
            letters[i].innerText = guess;
            letters[i].style.borderBottom = 'none';
          
        }
    }
}







submitWordButton.addEventListener('click', createBoard);