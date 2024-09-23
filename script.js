const cardImages = [
    'f1.jpeg','f1.jpeg',
    'f2.jpeg','f2.jpeg',
    'f10.jpeg', 'f10.jpeg',
    'r4.jpeg', 'r4.jpeg',
    'r7.jpeg', 'r7.jpeg',
    'r12.jpeg', 'r12.jpeg',
    'r18.jpeg', 'r18.jpeg',
    'r1.jpeg', 'r1.jpeg',
    'r22.jpeg', 'r22.jpeg',
    '15b.jpg', '15b.jpg',
    '16.jpg', '16.jpg',
    '03.jpg', '03.jpg',

];

let cards = [...cardImages].sort(() => 0.5 - Math.random());
let firstCard, secondCard;
let lockBoard = false;
let attempts = 0;
let matchedPairs = 0;

const board = document.getElementById('game-board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

function createBoard() {
    cards.forEach(src => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<img src="${src}" alt="Card Image">`;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    const img = this.querySelector('img');
    img.style.display = 'block';

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;

        attempts++;
        checkForMatch();
    }

    updateStatus();
}

function checkForMatch() {
    if (firstCard.innerHTML === secondCard.innerHTML) {
        matchedPairs++;
        resetCards();
        if (matchedPairs === cardImages.length / 2) {
            setTimeout(() => {
                alert(`Você ganhou! Tentativas: ${attempts}`);
                resetButton.classList.remove('hidden');
            }, 500);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.querySelector('img').style.display = 'none';
            secondCard.querySelector('img').style.display = 'none';
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function updateStatus() {
    status.textContent = `Tentativas: ${attempts}`;
}

resetButton.addEventListener('click', () => {
    board.innerHTML = '';
    cards = [...cardImages].sort(() => 0.5 - Math.random());
    attempts = 0;
    matchedPairs = 0;
    updateStatus();
    createBoard();
    resetButton.classList.add('hidden');
});

createBoard();