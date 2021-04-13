var hmnScore = 0;
var hmnElement = document.getElementById("humanCount");
var cpuScore = 0;
var cpuElement = document.getElementById("cpuCount");
var hmnWins = 0;
var cpuWins = 0;
var hmnEleWins = document.getElementById("hmnWins");
var cpuEleWins = document.getElementById("cpuWins");

hmnDrawBtn = document.getElementById("hmnDrawBtn");
hmnStandBtn = document.getElementById("hmnStandBtn");

let hmnStanding = false;
let cpuStanding = false;

class MainDeck {
    constructor() {
        this.deck = [];
        this.createDeck();
        this.shuffleDeck();
    }
    createDeck() {
        for (var i = 1; i < 11; i++) {
            for(var x = 1; x < 5; x++) {
                let card = i;
                this.deck.push(card);
            }
        }
    }
    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }
    drawFromDeck(player) {
	// play a sound when a card is being delt
        var drawSound = new Audio('./assets/audio/deal_card_slide.mp3');
        drawSound.play();

        let card = this.deck.pop();
        showCard(player, card);
        return card;
    }
}

class SideDeck {
    constructor() {
        this.cardsInDeck = [];
        this.createDeck();
    }
    createDeck() {
        for (let i = 1; i <= 4; i++)
        {
            while(true) {
                let randint = Math.floor(Math.random() * (Math.floor(7) - Math.ceil(-6)) + Math.ceil(-6));
                if(randint != 0) {
                    this.cardsInDeck.push(randint);
                    break;
                }
            }
        }       
        console.log(this.cardsInDeck);
    }
    drawFromDeck(index){
        this.cardsInDeck = this.cardsInDeck.filter(item => item !== index);
        return this.cardsInDeck[index];
    }
}


// At beginning of each round create a new deck when we code the round/game logic. for now we just create it here
d = new MainDeck();

cpuSideDeck = new SideDeck();
humanSideDeck = new SideDeck();
showSideDeck(0);
showSideDeck(1);


function dealCard(player) {
    switch(player) {
    case 0: // when human
        if (hmnScore > 20) {
            alert('you busted!');
            stand();
        } else {
            hmnScore += d.drawFromDeck(0);
            hmnElement.innerHTML = hmnScore;
        }
        break;
    case 1: // when cpu
        cpuScore += d.drawFromDeck(1);
        cpuElement.innerHTML = cpuScore;
        break;
    }
}

/*
    Assign an image to the numerical value of the card in the side 
    deck, then and add it to the HTML.
*/
function showSideDeck(player) {
    switch(player) {
        case 0:
            for (i = 0; i < 4; i++) {
                card = (humanSideDeck.cardsInDeck[i]); 
                let cardImage = document.createElement('img');
                cardImage.src = `./assets/cards/B${card}.png`;
        
                document.querySelector(`#hmnSideDeck${i}`).innerHTML = card;
                document.querySelector(`#hmnSideDeck${i}`).appendChild(cardImage);
            }
        break;
        case 1:
            for (i = 0; i < 4; i++) {
                card = (cpuSideDeck.cardsInDeck[i]);  
                let cardImage = document.createElement('img');
                cardImage.src = `./assets/cards/back.png`;
        
                document.querySelector(`#cpuSideDeck${i}`).innerHTML = card;
                document.querySelector(`#cpuSideDeck${i}`).appendChild(cardImage); 
            }
        break;
    }
}

function dealSideDeck() {
    switch(player) {
        case 0:

            break;
        case 1:
            
            break;
    }
}

function playHumanSideCard(yourChoice) {

    // calculate value of player score based on sideDeck card used
    valueSideCard = parseInt(yourChoice.innerHTML);
    hmnScore += valueSideCard;
    hmnElement.innerHTML = hmnScore;

    // place card in play area
    let cardImage = document.createElement('img');
    cardImage.src = `./assets/cards/B${valueSideCard}.png`;
    document.querySelector('#human-game').appendChild(cardImage);

    // disable card from being played again TODO
    var foobar = document.getElementById(yourChoice.id);
    foobar.disabled = true;
    console.log(foobar);

    // núllstilla
    var back = document.getElementById(yourChoice.id);
    back.innerHTML = "";
//    back.innerHTML= "<img src=./assets/cards/back.png>";
}

function playCpuSideCard(yourChoice) {
    valueSideCard = parseInt(yourChoice.innerHTML);
    cpuScore += valueSideCard;
    cpuElement.innerHTML = cpuScore;
    let cardImage = document.createElement('img');
    cardImage.src = `./assets/cards/B${valueSideCard}.png`;
    document.querySelector('#cpu-game').appendChild(cardImage);
    // núllstilla
    var back = document.getElementById(yourChoice.id);
    back.innerHTML= "<img src=./assets/cards/back.png>";
}


function showCard(player, card) {
    let cardImage = document.createElement('img');
    cardImage.src = `./assets/cards/G${card}.png`;

    switch(player) {
        case 0:
            document.querySelector('#human-game').appendChild(cardImage);	
            break;
        case 1:
            document.querySelector('#cpu-game').appendChild(cardImage);	
            break;
    }
}


function endTurn() {
    if (cpuStanding == false) {
        dealCard(0);
        dealCard(1);
    } else {
        dealCard(0);
    }
    //if ((hmnScore <= 20 && hmnScore > cpuScore) || (hmnScore <=20 && hmnScore > cpuScore)) {
    if (cpuScore >= 15 && cpuScore > hmnScore) {
        cpuStanding = true;
        console.log('cpuStanding' + cpuStanding);
    }
}

function stand() {    
    hmnStanding = true;     // human stands
    var breakLoop = false;  // this is needed because i cba figuring out why this doesn't work

    /*
        God-like AI. Stand on 15 and always try to draw or go over player score.
    */
    if (cpuStanding == false) {
        hmnDrawBtn.disabled = true;
        hmnStandBtn.disabled = true;
        do {
            dealCard(1);
            if (hmnStanding == true && hmnScore <= cpuScore) {
                breakLoop = true;
            }
        } while ((cpuScore <= 15 && hmnScore <=20 && breakLoop == false) || (hmnScore <=20 && hmnScore > cpuScore && breakLoop == false));
    }

    cpuStanding = true;
    console.log('cpuStanding' + cpuStanding);
    delayResults();
    roundWinner();

    d = new MainDeck();
}


function delayResults() {
    setTimeout(function() {
        /*
            document.querySelector('#human-game').innerHTML = '<h2 id="humanCount">0</h2>';
            document.querySelector('#cpu-game').innerHTML = '<h2 id="cpuCount">0</h2>';
        */ 

        let yourImages = document.querySelector('#human-game').querySelectorAll('img');
        let dealerImages = document.querySelector('#cpu-game').querySelectorAll('img');

        for (i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for (i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        cpuStanding = false;
        hmnStanding = false;
        hmnDrawBtn.disabled = false;
        hmnStandBtn.disabled = false;

        document.querySelector('#humanCount').innerHTML = 0;
        hmnScore = 0;
        document.querySelector('#cpuCount').innerHTML = 0;
        cpuScore = 0;
        document.querySelector('#message').innerHTML = 'Lets Play';
    }, 2500);
}


function roundWinner() {
    if (hmnScore === cpuScore || (hmnScore > 20 && cpuScore > 20)) {
        return document.querySelector('#message').innerHTML = 'Draw';
    }
    if ((hmnScore <= 20 && cpuScore <= 20) && (hmnScore > cpuScore)) {
        hmnWins += 1;
        hmnEleWins.innerHTML = hmnWins;
        document.querySelector('#message').innerHTML = 'Player Wins';
    } else if (cpuScore > 20 && hmnScore <= 20) {
        hmnWins += 1;
        hmnEleWins.innerHTML = hmnWins;
        document.querySelector('#message').innerHTML = 'Player Wins';
    } else {
        cpuWins += 1;
        cpuEleWins.innerHTML = cpuWins;
        document.querySelector('#message').innerHTML = 'Cpu Wins';
    }
    checkWinner();
}

function resetGame() {
    hmnWins = 0;
    hmnEleWins.innerHTML = hmnWins;
    cpuWins = 0;
    cpuEleWins.innerHTML = cpuWins;

    d = new MainDeck();

    cpuSideDeck = new SideDeck();
    humanSideDeck = new SideDeck();
    showSideDeck(0);
    showSideDeck(1);
}

function checkWinner() {
    if (hmnWins >= 3) {
        alert('human wins!');
        resetGame();
    } else if (cpuWins >= 3) {
        alert('cpu wins!');
        resetGame();
    } else {
    }
}