let submitWordButton = document.querySelector('.submitWordButton');
let board = document.querySelector('.board');


function createBoard(e) {
    let word = document.querySelector('.input').value;
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
   board.appendChild(guessForm);

    let submitLetterGuessButton = document.createElement('input');
    submitLetterGuessButton.type = 'submit';
    submitLetterGuessButton.value = 'submit';
    board.appendChild(submitLetterGuessButton);

    
}

submitWordButton.addEventListener('click', createBoard);