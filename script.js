let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function generateContent(difficulty) {
    const memoryGame = document.querySelector('.memory-game');
    let cardHTML = ``;
    const cardDataEasy = ["2146", "2146", "2831", "2831", "3392", "3392", "5992", "5992", "9470", "9470", "jrny", "jrny"];
    const cardDataMedium = ["2146", "2146", "2831", "2831", "3392", "3392", "5992", "5992", "9470", "9470", "jrny", "jrny", "card", "card"];

    if (difficulty === 16) {
        
    } else if (difficulty === 24) {

    } else {
        for (const item of cardDataEasy) {
            cardHTML += `
                <div class="memory-card" data-framework="${item}">
                    <img class="front-face" src="images/${item}.png" alt="${item}">
                    <img class="back-face" src="card.png" alt="Memory Card">
                </div>
            `;
        }
    }
    memoryGame.innerHTML = cardHTML;
}

function flipCard(item) {
    if (lockBoard) return;
    if (item === firstCard) return;
    if (item.classList.contains('front-face')) return;
    item.classList.add('flip');
  
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = item;
        return hasFlippedCard, firstCard;
    }
    secondCard = item;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {    
    firstCard.replaceWith(firstCard.cloneNode(true));
    secondCard.replaceWith(secondCard.cloneNode(true));
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
        lockBoard = false;
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function loadEvent() {
    let difficulty = 12;
    
    generateContent(difficulty);
    let cards = document.querySelectorAll('.memory-card');
    
    (function shuffle() {
        const cards = document.querySelectorAll('.memory-card');
        cards.forEach(card => {
            let ramdomPos = Math.floor(Math.random() * 12);
            card.style.order = ramdomPos;
        });
    })();
    
    cards.forEach(card => card.addEventListener('click', e => flipCard(e.target)));
}

window.addEventListener("load", loadEvent);