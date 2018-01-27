"use strict";

const gameContent = document.querySelector("#color-tiles");
const colorToGuess = document.querySelector("#correct-color");
const header = document.querySelector("#header");
const triesCounter = document.querySelector("#tries");
const replayButton = document.querySelector("#replay-tab");
const menuButton = document.querySelector("#menu-tab");

const timerCountdown = document.querySelector("#countdown");

const gameMenu = document.querySelector("#difficulty-panel");
const easyButton = document.querySelector("#easy-button");
const mediumButton = document.querySelector("#medium-button");
const hardButton = document.querySelector("#hard-button");




let GameBoard = {
    numberOfTiles : 0,
    correctColor : "",
    gameActive: false,
    triesLeft: 0,
    countDownTime: 0,
    difficultyMode: "",
    
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
    time : 0,

    //Start the timer
    start : function(time){
        GameBoard.countDownTime = this.time;
        this.timerStore = setInterval(this.ticker, 1000);
    },

    //Reset timer to default values
    reset : function(){
        GameBoard.countDownTime = this.time;
        
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
            header.textContent = "Time's Up - " + GameBoard.correctColor.toUpperCase();
            GameBoard.gameActive = false;
            replayButton.style.visibility = "visible";
            revealWinColors(GameBoard.numberOfTiles,GameBoard.correctColor);
            header.style.color = "#ff3232";



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
const randomNr = function(maxNumber){
    return Math.floor(Math.random()*maxNumber) + 1;
};


function revealWinColors(tileNr,color){
    const selectTiles = document.querySelectorAll(".color-tile");        
    for(let i = 0; i < tileNr; i++){
        selectTiles[i].style.visibility = "visible";
        selectTiles[i].style.backgroundColor = color;
    };
};



//Validate the guess made by user, and hide wrong guesses
function validateUserGuess(element){
    if(element.style.backgroundColor === GameBoard.correctColor){
        header.textContent = "You Won! - " + GameBoard.correctColor.toUpperCase();
        GameBoard.gameActive = false;
        replayButton.style.visibility = "visible";
        revealWinColors(GameBoard.numberOfTiles,GameBoard.correctColor);
        header.style.color = "#007f00";



    }
    else{
        element.style.visibility = "hidden";
        GameBoard.triesLeft--;
        triesCounter.textContent = GameBoard.triesLeft;
    }

    if(GameBoard.triesLeft === 0){
        header.textContent = "You Lost - " + GameBoard.correctColor.toUpperCase();
        GameBoard.gameActive = false;
        replayButton.style.visibility = "visible";
        revealWinColors(GameBoard.numberOfTiles,GameBoard.correctColor);
        header.style.color = "#ff3232";


    }
};

//Set click event on each tile, that checks if game conditions are met
function winCondition(){
    gameContent.addEventListener("click", function(el){
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
    CountDownTimer.time = timeNr;
};

//Update the game board with game elements
function setUpGame(){
    GameBoard.applyColors();
    GameBoard.setColorToGuess();
    header.textContent = "Guess the color - " + GameBoard.correctColor.toUpperCase();    
    triesCounter.textContent = GameBoard.triesLeft;
    timerCountdown.textContent = GameBoard.countDownTime;
    winCondition();
};

//Reset hidden color tiles
function resetColorTiles(){
    var selectTiles = document.querySelectorAll(".color-tile");

    for(let i = 0; i < selectTiles.length; i++){
        gameContent.removeChild(selectTiles[i]);
    };
};

menuButton.addEventListener("click",function(){
    GameBoard.gameActive = false;
    resetColorTiles();
    gameMenu.style.visibility = "visible";
    
});

//Resets the game, allowing player to play again, with same settings
replayButton.addEventListener("click",function(){

    if(GameBoard.difficultyMode === "Easy"){
        setGameState(3,true,2,40);
    }
    else if(GameBoard.difficultyMode === "Medium"){
        setGameState(6,true,3,25);    
    }
    else if(GameBoard.difficultyMode === "Hard"){
        setGameState(9,true,3,20);    
    }
    replayButton.style.visibility = "hidden";

    init();

});



//Initialize the game board with game elements
function init(){
    header.style.color = "";
    resetColorTiles();
    GameBoard.addTiles();
    CountDownTimer.reset();   
    setUpGame();
};


easyButton.addEventListener("click", function(){
    gameMenu.style.visibility = "hidden";
    GameBoard.difficultyMode = "Easy";
    setGameState(3,true,2,40);    
    init();
});

mediumButton.addEventListener("click", function(){
    gameMenu.style.visibility = "hidden";
    GameBoard.difficultyMode = "Medium";
    setGameState(6,true,3,25);    
    init();
});

hardButton.addEventListener("click", function(){
    gameMenu.style.visibility = "hidden";
    GameBoard.difficultyMode = "Hard";
    setGameState(9,true,3,20);    
    init();
});

