var humanScore = 0;
var humanElement = document.getElementById("humanCount");
var cpuScore = 0;
var cpuElement = document.getElementById("cpuCount");

class Deck
{
    constructor(){
        this.cardsInDeck = [];
        // TODO: generate deck cards
    }
    drawFromDeck(){
        // TODO: make this function actually 'draw' from this.cardsInDeck instead of just returning randint
        return Math.floor(Math.random() * (Math.floor(10) - Math.ceil(1) + 1)) + Math.ceil(1);
    }
}

// At beginning of each round create a new deck when we code the round/game logic. for now we just create it here
d = new Deck();

function dealCard(player) 
{
    switch(player)
    {
        case 0: // when human
            humanScore += d.drawFromDeck();
            humanElement.innerHTML = humanScore;

            console.log(humanScore)
            if(humanScore > 20){
                humanElement.innerHTML += "- The oppression of the sith will never return; you have lost!";
            }
            break
        case 1: // when cpu
            cpuScore += d.drawFromDeck();
            cpuElement.innerHTML = cpuScore;

            console.log(cpuScore);
            if(cpuScore > 20){
                cpuElement.innerHTML += "- So this is how liberty dies…with thunderous applause; you have lost!"; // vissi ekki hvaða texti mundi hennta svo setti þetta bara
            }
            break
    }

}





    


