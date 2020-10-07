"use strict";

//EXERCISE ONE

document.addEventListener(
    'DOMContentLoaded', 
    (event) => {
        let array = document.getElementById("board").getElementsByTagName("div");
        for (var n = 0; n < array.length; n++) {
            array[n].className = "square";
        }
    }
);
