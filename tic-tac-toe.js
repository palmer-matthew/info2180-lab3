"use strict";

//EXERCISE ONE

function assign_square_class(){
    let array = document.getElementById("board").getElementsByTagName("div");
    for (var n = 0; n < array.length; n++) {
        array[n].className = "square";
    }
}

//EXERCISE TWO plus SIX

let game_state = ['-1','-1','-1','-1','-1','-1','-1','-1','-1'];
let last_played = "-1";

function click(object,pos){
    try{
        if(game_state[pos] == "-1"){ 
            if(last_played == "X"){
                object.innerHTML = "<p>O</p>";
                object.className = "square O";
                game_state[pos] = "O";
                last_played = "O";
            }else{
                object.innerHTML = "<p>X</p>";
                object.className = "square X";
                game_state[pos] = "X";
                last_played = "X";
            }
        }
    }catch(e){
        console.log(e);
    }
    check_winner(object);
}

function assign_player_values(){
    let array = document.querySelectorAll(".square");
    array.forEach((element, index) => {
        element.onclick = function(){click(element,index);};
        element.addEventListener('win', function(){
            let status_div = document.getElementById("status");
            status_div.textContent = "Congratulations! " + winner + " is the winner.";
            status_div.className = "you-won";
        })
    });
}

//EXERCISE THREE
function hover(object,is){

    try{
        if(is){
            object.classList.add("hover");
        }else{
            object.classList.remove("hover"); 
        }
        
    }catch(e){
        console.log(e);
    }

}

function assign_hover(){
    let array = document.querySelectorAll(".square");
    array.forEach((element, index) => { 
        element.onmouseover = function(){hover(element,true);};
        element.onmouseout = function(){hover(element,false);};
    });
}

//EXERCISE FOUR
const win_event = new Event('win');
let winner;

function check_winner(object){
    for(var n = 0; n < 9; n+=3){
        if(game_state[n] == game_state[n+1] && game_state[n+1] == game_state[n+2] && game_state[n] == game_state[n+2]){
            if("-1" != game_state[n]){
                winner = game_state[n];
                object.dispatchEvent(win_event);
            }
        }
    }

    for(var n = 0; n <=2; n++){
        if(game_state[n] == game_state[n+3] && game_state[n+3] == game_state[n+6] && game_state[n] == game_state[n+6]){
            if("-1" != game_state[n]){
                winner = game_state[n];
                object.dispatchEvent(win_event);
            }
        }
    }

    if(game_state[0] == game_state[4] && game_state[4] == game_state[8] && game_state[0] == game_state[8]){
        if("-1" != game_state[0]){
            winner = game_state[0];
            object.dispatchEvent(win_event);
        }
    }else if(game_state[2] == game_state[4] && game_state[4] == game_state[6] && game_state[2] == game_state[6]){
        if("-1" != game_state[2]){
            winner = game_state[2];
            object.dispatchEvent(win_event);
        }
    }
    
}

// EXERCISE FIVE
function revert(){
    let array = document.querySelectorAll(".square");
    array.forEach((element, index) => { 
        element.innerHTML = "";
        element.className = "square";
        game_state[index] = "-1";
    });
    let status_div = document.getElementById("status");
    status_div.textContent = "Move your mouse over a square and click to play an X or an O.";
    status_div.className = "";
    winner = null;
    last_played = "-1";
}

function reset(){
    let button = document.querySelector(".btn");
    button.onclick = function(){revert()};
}

//MAIN [SOMEWHAT]

document.addEventListener(
    'DOMContentLoaded', 
    (event) => {
        assign_square_class();
        assign_player_values();
        assign_hover();
        reset();
    }
);


