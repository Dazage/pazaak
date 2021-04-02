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
    drawFromDeck() {
        var drawSound = new Audio('./assets/audio/deal_card_slide.mp3');
        drawSound.play();
        return this.deck.pop();
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
            while (true) {
                let randint = Math.floor(Math.random() * (Math.floor(7) - Math.ceil(-6)) + Math.ceil(-6));
                if(randint != 0){
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
            hmnScore += d.drawFromDeck();
            hmnElement.innerHTML = hmnScore;

            console.log(hmnScore);
            if (hmnScore > 20) {
                stand(0);
            }
            break;
        case 1: // when cpu
            cpuScore += d.drawFromDeck();
            cpuElement.innerHTML = cpuScore;

            console.log(cpuScore);
            if (cpuScore > 20) {
                stand(1);
            }
            break;
    }
}


function stand(player) {
    switch(player) {
        case 0:  // When human
            hmnStanding = true;
            hmnDrawBtn.disabled = true;
            hmnStandBtn.disabled = true;
            break;
        case 1:  // When cpu
            cpuStanding = true;
            cpuDrawBtn.disabled = true;
            cpuStandBtn.disabled = true;
            break;
    }
    winConditionCheck();
}

function winConditionCheck() {
    if ((hmnStanding && cpuStanding) && (hmnScore <= 20 && cpuScore <= 20)) {
        if (hmnScore > cpuScore) {
            alert("Human wins !");
        } else {
            alert("CPU wins !");
        }
    } else if ((hmnStanding && cpuStanding) && (hmnScore > 20 || cpuScore > 20)) {
        if (hmnScore > 20) {
            alert("CPU wins !");
        } else {
            alert("Human wins !");
        }
    }
}
