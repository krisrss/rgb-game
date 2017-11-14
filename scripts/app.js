"use strict";

const gameContent = document.querySelector("#color-tiles");


//Create a custom HTML element
function createElement(elementName, attribute, attributeName){
    const newElement = document.createElement(elementName);
    newElement[attribute] = attributeName;
    return newElement;
};

//Generate a random RGB color, with values between 1 - 255
function randomColor(){
    const randomNr = () => Math.floor(Math.random()*255) + 1;
    return "rgb(" + randomNr() + ", " + randomNr() + ", " + randomNr() + ")";
}

//Create a color tile
function createTile(){
    const colorTile = createElement("div","className","color-tile");
    colorTile.style.backgroundColor = randomColor();
    return colorTile;

};

//Add color tiles to the game board
for(let i = 0; i < 9; i++){
    gameContent.appendChild(createTile());
};