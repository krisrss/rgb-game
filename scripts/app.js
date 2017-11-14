"use strict";

const gameContent = document.querySelector("#color-tiles");


//Create a custom HTML element
function createElement(elementName, attribute, attributeName){
    const newElement = document.createElement(elementName);
    newElement[attribute] = attributeName;
    return newElement;
};

//Create a color tile
function createTile(){
    return createElement("div","className","color-tile");
};

//Add color tiles to the game board
for(let i = 0; i < 9; i++){
    gameContent.appendChild(createTile());
};