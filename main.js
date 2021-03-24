var pScore = 0;
var playerElement = document.getElementById("player");

function dealCard() 
{
    pScore += 1;
    playerElement.innerHTML = pScore;

    if(pScore > 20){
        console.log("The oppression of the sith will never return; you have lost!");
    } else {
        console.log(pScore);
    }
}




    


