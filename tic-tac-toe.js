"use strict";

//Global Variables
let game_state = ['-1','-1','-1','-1','-1','-1','-1','-1','-1'];
let last_played = "-1";
let game_over = false;
const win_event = new Event('win');
let winner;

//Helper Functions
function click(object,pos){
    try{
        if(game_state[pos] == "-1" && !game_over){ 
            if(last_played == "X"){
                object.innerHTML = "<p>O</p>";
                object.classList.remove("X");
                object.classList.add("O");
                game_state[pos] = "O";
                last_played = "O";
            }else{
                object.innerHTML = "<p>X</p>";
                if(last_played == "-1"){
                    object.classList.add("X");
                }else{
                    object.classList.remove("O");
                    object.classList.add("X");
                }
                game_state[pos] = "X";
                last_played = "X";
            }
        }
    }catch(e){
        console.log(e);
    }
    check_winner(object);
}

function changestatus(){
    let status_div = document.getElementById("status");
    status_div.textContent = "Congratulations! " + winner + " is the winner.";
    status_div.className = "you-won";
    game_over = true;
}

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
    game_over = false;
}

function main(){
    let array = document.getElementById("board").querySelectorAll("div");
    array.forEach((element,index) => {
        element.className = "square";
        element.onclick = function(){click(element,index);};
        element.addEventListener('win', changestatus);
        element.onmouseover = function(){hover(element,true);};
        element.onmouseout = function(){hover(element,false);};
    });
    let button = document.querySelector(".btn");
    button.onclick = function(){revert()};
}

document.addEventListener('DOMContentLoaded', main);