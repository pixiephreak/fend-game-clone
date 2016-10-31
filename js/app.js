// Enemies our player must avoid



var Enemy = function(x,y,speed) {
    this.sprite = 'images/enemy-bug.png';
    this.width = 100;
    this.height = 100;
    this.x = x;
    this.y = y;
    this.speed = speed;

    console.log('madeOneEnemy')

};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // console.log('prototypedEnemy')
    // TO-DO: CHANGE ENEMY PATH USING "BOUNCONG BALL" PATTERN? *DOESN'T WORK*
    // var x=100;
    // var y=200;
    // var dx=1;
    // var dy=1;
    // if( this.x<5 || this.x>204) {dx=+dx;}
    // if( this.y<5 || this.y>200) {dy=+dy;}
    // this.x-=dx + this.speed * dt;;
    // this.y-=dy;

         // multiply any movement by the dt parameter
        // to ensure the game runs at the same speed for
        // all computers.

        this.x = this.x + this.speed * dt;
        // Have enemies re-render at x = 0 when the reach the right edge
        if(this.x > 500){
            this.x = 0
        }
};

// Draw the enemy on the screen.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// check for collision of player/enemy
Enemy.prototype.checkCollisions = function(other){
    var thisEnemy = this
    var thisPlayer = other;

    for (let i = 0; i < allEnemies.length; i++){

        if ( thisEnemy.x < thisPlayer.x + 60 &&
           thisEnemy.x + 60 > thisPlayer.x &&
           thisEnemy.y < thisPlayer.y+ 60 &&
           60 + thisEnemy.y > thisPlayer.y) {
            console.log('collision detected!')
            endGame()
            document.location.reload(true)
            // reset() = false;
        }
    }
};


// The Player class defines player's img and location
var Player = function(x,y){
    this.sprite = 'images/char-horn-girl.png';
    this.height = 100;
    this.width = 100;
    this.x = x
    this.y = y


};

//Update player's location on screen according to keydown events. End game when player reaches water and restart game.
Player.prototype.update = function(dt) {

    this.x = this.x
    this.y = this.y
    window.addEventListener('keydown', Player.prototype.handleInput);
    if (player.y < 50){
              winGame()
              document.location.reload(true)
        }

};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key){
//  TO-DO: WHY DOESN'T SWITCH WORK?
//     switch (key) {
//   case 'up' && this.y > 10:
//     this.y= this.y - 10; console.log(key);
//     break;
//   case 'down' && this.y < 400:
//     console.log("Apples are $0.32 a pound.");
//     break;
//   case 'left' && this.x > 0:
//     this.x = this.x - 10;
//     break;
//   case 'right' && this.x < 400:
//     this.x = movePlayerRight(this.x);
//     break;

// };
    // Move player's location on screen, location depending on keydown event
    if (key === 'up' && this.y > 10){this.y= this.y - 10; }
    if (key === 'down' && this.y < 400){this.y = this.y + 10;}
    if (key === 'left' && this.x > 0){this.x = this.x - 10;}
    if (key === 'right' && this.x < 400){
        this.x = movePlayerRight(this.x);}

}





// Instantiate objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

playerStartX = 207;
playerStartY = 435;
var allEnemies = []
var player = new Player(playerStartX,playerStartY);

// TO-DO: how to make # of enemies increase incrementally
function makeEnemeis(){
        for(let i=0; i<4; i++){
            var newEnemy = new Enemy(0, enemyPlaceVal(50, 330), enemySpeedVal(100) );
            allEnemies.push(newEnemy);
        }

    }

 makeEnemeis();





// Listen for key presses and send the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    // Prevent default behaviour of arrow keys
    if(e.which === 37 || e.which === 38 || e.which === 39 || e.which === 40){
        e.preventDefault(); e.stopPropagation(); console.log('stopped default')
    }

    player.handleInput(allowedKeys[e.keyCode]);
});


//Pseudo-randomize enemies' speed
function enemySpeedVal(speed){
    return Math.floor(Math.random() *  (speed))
}

//Pseudo-randomize enemies' beginning x location coordinate
function enemyPlaceVal(min, max){
    return Math.random() * (max - min) + min;
}

// function movePlayerLeft(){
//     this.x = this.x -= 10;

// }

// Play with using a funtion to deterimine player movement. Not concise.
function movePlayerRight(currentX){
    return currentX  += 10;
}

//Remove enemies from screen and alert user that game is over.
function endGame(){
    allEnemies.length = 0;
    window.alert("Oh, No. YOU COLLIDED. CLICK 'OK' TO TRY AGAIN")

}

//Alert user when she has won.
function winGame(){

        window.alert("YOU WON!")

}


// function start(){

// }


