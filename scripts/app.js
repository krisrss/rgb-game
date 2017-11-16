"use strict";

const gameContent = document.querySelector("#color-tiles");
const colorToGuess = document.querySelector("#correct-color");
const header = document.querySelector("#header");
const triesCounter = document.querySelector("#tries");
const replayButton = document.querySelector("#replay-tab");


const timerCountdown = document.querySelector("#countdown");

let GameBoard = {
    numberOfTiles : 9,
    correctColor : "",
    gameActive: false,
    triesLeft: 3,
    countDownTime: 50,
    
    //Add color tiles to board
    addTiles : function(){
        for(let i = 0; i < this.numberOfTiles; i++){
            gameContent.appendChild(ColorTile.createTile());
        };
    },
    
    //Applies random colors to tiles
    applyColors : function(){
        const selectTiles = document.querySelectorAll(".color-tile");        
        for(let i = 0; i < this.numberOfTiles; i++){
            selectTiles[i].style.backgroundColor = ColorTile.randomColor();
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
        return colorTile;
    },

    //Generate a random RGB color, with values between 1 - 255
    randomColor : function(){
        return "rgb(" + randomNr(255) +
                 ", " + randomNr(255) + 
                 ", " + randomNr(255) + ")";
    }
};


let CountDownTimer = {
    timerStore : null,

    //Start the timer
    start : function(time){
        this.timerStore = setInterval(this.ticker, 1000);
    },

    //Reset timer to default values
    reset : function(){
        clearInterval(this.timerStore);
        this.timerStore = null;
        return this.start();
    },

    //Initialize the timer ticker
    ticker : function(){
        if(GameBoard.gameActive === true){
            GameBoard.countDownTime--;
            timerCountdown.textContent = GameBoard.countDownTime; 
        }
        if(GameBoard.countDownTime === 0){
            header.textContent = "TIME OVER";
            GameBoard.gameActive = false;  
        }
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
function validateUserGuess(element){
    if(element.style.backgroundColor === GameBoard.correctColor){
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
function winCondition(){
    gameContent.addEventListener("click", (el)=>{
        el.stopImmediatePropagation();        
        const selectedEl = el.target;
        if(selectedEl.className === "color-tile" && GameBoard.gameActive === true){
            validateUserGuess(selectedEl)
        }            
    });            
};

//Set default game values for game board
function setGameState(tileNr,gameState,triesNr,timeNr){
    GameBoard.numberOfTiles = tileNr;
    GameBoard.gameActive = gameState;
    GameBoard.triesLeft = triesNr;
    GameBoard.countDownTime = timeNr;
};

//Update the game board with game elements
function setUpGame(){
    GameBoard.applyColors();
    GameBoard.setColorToGuess();
    header.textContent = "Guess the color - " + GameBoard.correctColor;    
    triesCounter.textContent = GameBoard.triesLeft;
    timerCountdown.textContent = GameBoard.countDownTime;
    winCondition();
};

//Reset hidden color tiles
function resetColorTiles(){
    const selectTiles = document.querySelectorAll(".color-tile");    
    for(let i = 0; i < GameBoard.numberOfTiles; i++){
        selectTiles[i].style.visibility = "visible";
    };
}

//Resets the game, allowing player to play again
replayButton.addEventListener("click",function(){
    resetColorTiles();
    setGameState(3,true,2,30);
    setUpGame();
    CountDownTimer.reset();
    
});

//Initialize the game board with game elements
function init(){
    setGameState(3,true,2,30);
    GameBoard.addTiles();
    CountDownTimer.start();
    setUpGame();
};


init();