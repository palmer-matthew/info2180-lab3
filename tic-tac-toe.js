"use strict";



//EXERCISE ONE

function assign_square_class(){
    let array = document.getElementById("board").getElementsByTagName("div");
    for (var n = 0; n < array.length; n++) {
        array[n].className = "square";
    }
}

//EXERCISE TWO

let game_state = ['-1','-1','-1','-1','-1','-1','-1','-1','-1'];

function click(object,pos, array){
    try{
        if(game_state[pos] == "-1" || game_state[pos] == "X"){
            object.innerHTML = "<p>O</p>";
            object.className = "square O";
            game_state[pos] = "O";
        }else{
            object.innerHTML = "<p>X</p>";
            object.className = "square X";
            game_state[pos] = "X";
        }

    }catch(e){
        console.log(e);
    }
}

function assign_player_values(){
    let globalarray = document.querySelectorAll(".square");
    globalarray.forEach((element, index) => element.onclick = function(){click(element,index,globalarray);});
}

document.addEventListener(
    'DOMContentLoaded', 
    (event) => {
        assign_square_class();
        assign_player_values();
    }
);



// window.addEventListener("load", (event) => {
//     l
// })

