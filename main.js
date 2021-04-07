var hmnScore = 0;
var hmnElement = document.getElementById("humanCount");
var cpuScore = 0;
var cpuElement = document.getElementById("cpuCount");

hmnDrawBtn = document.getElementById("hmnDrawBtn");
hmnStandBtn = document.getElementById("hmnStandBtn");
cpuDrawBtn = document.getElementById("cpuDrawBtn");
cpuStandBtn = document.getElementById("cpuStandBtn");
let hmnStanding = false;
let cpuStanding = false;

class MainDeck {
    constructor() {
        this.deck = [];
        this.createDeck();
        this.shuffleDeck();
        // TODO: generate deck cards
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

function dealCard(player) {
    switch(player) {
    case 0: // when human
        hmnScore += d.drawFromDeck(0);
        hmnElement.innerHTML = hmnScore;
        break;
    case 1: // when cpu
        if(cpuStanding) {
            break;
        } else {
            cpuScore += d.drawFromDeck(1);
            cpuElement.innerHTML = cpuScore;
            break;
        }
    }
}

function showHumanSideDeck() {
    counter = 0;
    for (i = 0; i < 4; i++) {
        card = (humanSideDeck.cardsInDeck[i]); 
        let cardImage = document.createElement('img');
        //cardImage.id = `hmn${card}`;
        cardImage.src = `./assets/cards/B${card}.png`;

        document.querySelector(`#hmnSideDeck${i}`).innerHTML = card;
        document.querySelector(`#hmnSideDeck${i}`).appendChild(cardImage);
    }
}
showHumanSideDeck();

function showCpuSideDeck() {
    cardnr = 0;
    for (i = 0; i < 4; i++) {
        card = (cpuSideDeck.cardsInDeck[i]);
        console.log(card);  
        let cardImage = document.createElement('img');
        //cardImage.id = `cpu${card}`;
        cardImage.src = `./assets/cards/B${card}.png`;

        document.querySelector(`#cpuSideDeck${i}`).innerHTML = card;
        document.querySelector(`#cpuSideDeck${i}`).appendChild(cardImage); 
    }
}
showCpuSideDeck();

function dealHumanSide(yourChoice) {
    console.log(yourChoice);
    valueSideCard = parseInt(yourChoice.innerHTML);
    hmnScore += parseInt(yourChoice.innerHTML);
    hmnElement.innerHTML = hmnScore;
    let cardImage = document.createElement('img');
    cardImage.src = `./assets/cards/B${valueSideCard}.png`;
    document.querySelector('#human-game').appendChild(cardImage);
    // núllstilla
    var back = document.getElementById(yourChoice.id);
    back.innerHTML= "<img src=./assets/cards/back.png>";
}

function dealCpuSide(yourChoice) {
    valueSideCard = parseInt(yourChoice.innerHTML);
    cpuScore += parseInt(yourChoice.innerHTML);
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

function stand(player) {
    switch(player) {
    case 0:  // When human
        hmnStanding = true;
        hmnDrawBtn.disabled = true;
        hmnStandBtn.disabled = true;

        while(cpuStanding == false && playing == true) {
            dealCard(1);
            cpuLogic();
        }

        break;
    case 1:  // When cpu
    // todo: add indicator that the CPU is standing
        cpuStanding = true;
        break;
    }
    endTurn();
    winConditionCheck();
}

function cpuLogic() {
    if (hmnStanding && hmnScore <= cpuScore) {
        stand(1);
    } else if ((hmnStanding == false) && (cpuScore >= 16 && cpuScore > hmnScore)) {
        stand(1);
    } else if (cpuScore == 20) {
        stand(1);
    } else {
    }
}

function endTurn() {
    if (hmnScore > 20) {
    	stand(0);
    }
    gameLoop();
}

function winConditionCheck() {
    if ((hmnStanding && cpuStanding) && (hmnScore <= 20 && cpuScore <= 20)) {
        if (hmnScore > cpuScore) {
            alert("Human wins !");
        } else {
            alert("CPU wins !");
        }
        playing = false;
    } else if ((hmnStanding && cpuStanding) && (hmnScore > 20 || cpuScore > 20)) {
        if (hmnScore > 20) {
            alert("CPU wins !");
        } else {
            alert("Human wins !");
        }
        playing = false;
    }
}

function gameLoop() {
    if (playing == true) {
        dealCard(1); // CPU receives a card
        cpuLogic();
        dealCard(0); // player's turn again
    }
}

playing = true;
gameLoop();

while(hmnStanding && playing) {
    dealCard(1);
    cpuLogic();
}