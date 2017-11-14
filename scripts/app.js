"use strict";

const gameContent = document.querySelector("#color-tiles");
const colorToGuess = document.querySelector("#correct-color");


//Create a custom HTML element
function createElement(elementName, attribute, attributeName){
    const newElement = document.createElement(elementName);
    newElement[attribute] = attributeName;
    return newElement;
};

//Generate a random number
const randomNr = (maxNumber) => 
    Math.floor(Math.random()*maxNumber) + 1;


//Generate a random RGB color, with values between 1 - 255
function randomColor(){
    return "rgb(" + randomNr(255) +
             ", " + randomNr(255) + 
             ", " + randomNr(255) + ")";
};

//Create a color tile
function createTile(){
    const colorTile = createElement("div","className","color-tile");
    colorTile.style.backgroundColor = randomColor();
    return colorTile;

};

//Select a color, that user has to guess
function setColorToGuess(){
    const selectTiles = document.querySelectorAll(".color-tile")[randomNr(9) - 1];
    return selectTiles.style.backgroundColor;
};

//Initialize the game board with game elements
function init(){
    for(let i = 0; i < 9; i++){
        gameContent.appendChild(createTile());
    };
    colorToGuess.textContent = setColorToGuess();
};


init();



