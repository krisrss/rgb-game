"use strict";

const gameContent = document.querySelector("#color-tiles");
const colorToGuess = document.querySelector("#correct-color");
const header = document.querySelector("#header");
const triesCounter = document.querySelector("#tries");

let GameBoard = {
    numberOfTiles : 9,
    correctColor : "",
    gameActive: false,
    triesLeft: 3,
    
    //Add color tiles to board
    addTiles : function(){
        for(let i = 0; i < this.numberOfTiles; i++){
            gameContent.appendChild(ColorTile.createTile());
        };
    },
    
    //Set a color, that user has to guess
    setColorToGuess: function(){
        const selectTiles = 
        document.querySelectorAll(".color-tile")[randomNr(this.numberOfTiles) - 1];
        this.correctColor = selectTiles.style.backgroundColor;
    }
};

//Create a color tile
let ColorTile = {
    createTile : function(){
        const colorTile = createElement("div","className","color-tile");
        colorTile.style.backgroundColor = this.randomColor();
        return colorTile;
    },

    //Generate a random RGB color, with values between 1 - 255
    randomColor : function(){
        return "rgb(" + randomNr(255) +
                 ", " + randomNr(255) + 
                 ", " + randomNr(255) + ")";
    }
};


//Create a custom HTML element
function createElement(elementName, attribute, attributeName){
    const newElement = document.createElement(elementName);
    newElement[attribute] = attributeName;
    return newElement;
};

//Generate a random number
const randomNr = (maxNumber) => 
    Math.floor(Math.random()*maxNumber) + 1;

//Validate the guess made by user, and hide wrong guesses
function validateUserGuess(element, color){
    if(element.style.backgroundColor === color){
        header.textContent = "CORRECT";
        GameBoard.gameActive = false;
    }
    else{
        element.style.visibility = "hidden";
        GameBoard.triesLeft--;
        triesCounter.textContent = GameBoard.triesLeft;
    }

    if(GameBoard.triesLeft === 0){
        header.textContent = "GAME OVER";
        GameBoard.gameActive = false;
    }
};

//Set click event on each tile, that checks if game conditions are met
function winCondition(guessColor){
    gameContent.addEventListener("click", (el)=>{
        const selectedEl = el.target;
        if(selectedEl.className === "color-tile" && GameBoard.gameActive === true){
            validateUserGuess(selectedEl,guessColor)
        }            
    });            
};


//Initialize the game board with game elements
function init(){
    GameBoard.gameActive = true;
    GameBoard.addTiles();
    GameBoard.setColorToGuess();

    colorToGuess.textContent = GameBoard.correctColor; 
    triesCounter.textContent = GameBoard.triesLeft;

    winCondition(GameBoard.correctColor);
};

init();



