document.addEventListener('DOMContentLoaded', () => {
    let cardCount = 0;
    let moves = 0; 
    let matchedPairs = 0; 

    while (cardCount % 2 !== 0 || cardCount <= 0 || cardCount > 14) {
        cardCount = parseInt(prompt("Com quantas cartas você quer jogar?"), 10);
    }

    const gameBoard = document.getElementById('game-board');
    const cards = generateCards(cardCount);

    shuffle(cards);
    cards.forEach(card => gameBoard.appendChild(card));

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');
        moves++; 

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;

        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.dataset.value === secondCard.dataset.value;
        if (isMatch) {
            matchedPairs++;
            disableCards();
            if (matchedPairs === cardCount / 2) { 
                setTimeout(() => {
                    alert(`Você ganhou em ${moves} jogadas.`);
                }, 500);
            }
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');

            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    function generateCards(count) {
        const values = Array.from({ length: count / 2 }, (_, i) => i + 1);
        const cardValues = [...values, ...values];
        return cardValues.map(value => createCard(value));
    }

    function createCard(value) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        const frontImage = document.createElement('img');
        frontImage.src = 'Imagens_parrot_game/back.png';
        cardFront.appendChild(frontImage);

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        const backImage = document.createElement('img');
        backImage.src = getGifForValue(value);
        cardBack.appendChild(backImage);

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        card.addEventListener('click', flipCard);
        return card;
    }

    function getGifForValue(value) {
        const gifs = [
            'Imagens_parrot_game/bobrossparrot.gif',
            'Imagens_parrot_game/explodyparrot.gif',
            'Imagens_parrot_game/fiestaparrot.gif',
            'Imagens_parrot_game/metalparrot.gif',
            'Imagens_parrot_game/revertitparrot.gif',
            'Imagens_parrot_game/tripletsparrot.gif',
            'Imagens_parrot_game/unicornparrot.gif',
        ];

        const valueToGif = {
            1: gifs[0],
            2: gifs[1],
            3: gifs[2],
            4: gifs[3],
            5: gifs[4],
            6: gifs[5],
            7: gifs[6],
        };

        return valueToGif[value];
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
});