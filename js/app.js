// Enemies our player must avoid
//TO-DO: HOW CAN I TAKE THeSe COUNTs OUT OF THE GLOBAL SCOPE
enemyCount = 2
score = 0

var Character = function(x,y){
    this.width = 100;
    this.height = 100;
    this.x = x;
    this.y = y;

}

Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // How to call "custom code" within here for enemy/player
};


var Enemy = function(speed) {
    Character.call(this, speed)
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;

    console.log('madeOneEnemy');

};

Enemy.prototype= Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;


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

};

// Draw the enemy on the screen.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // Have enemies re-render at x = 0 when the reach the right edge
        if(this.x > 500){
            this.x = -100;
            this.y = enemyPlaceVal(50, 250);
            this.speed = this.speed * 1.1;
        }

};

// check for collision of player/enemy
Enemy.prototype.checkCollisions = function(other){
    var thisEnemy = this;
    var thisPlayer = other;

    for (let i = 0; i < allEnemies.length; i++){

        if ( thisEnemy.x < thisPlayer.x + 60 &&
           thisEnemy.x + 60 > thisPlayer.x &&
           thisEnemy.y < thisPlayer.y+ 60 &&
           60 + thisEnemy.y > thisPlayer.y) {
            console.log('collision detected!');
            thisPlayer.x = playerStartX
            thisPlayer.y = playerStartY
            //empty and recall allEnemies to reset speed incrementation
            allEnemies.length = 0;
            makeEnemies(enemyCount);
            score = score -2
            console.log(score)
            $('#score').html("Score:" + (score) )
        }
    }
};


// The Player class defines player's img and location
var Player = function(x,y){
    this.sprite = 'images/char-horn-girl.png';
    this.height = 100;
    this.width = 100;
    this.x = x;
    this.y = y;


};

//Update player's location on screen according to keydown events. End game when player reaches water and restart game.
Player.prototype.update = function(dt) {

    this.x = this.x;
    this.y = this.y;
    window.addEventListener('keydown', Player.prototype.handleInput);
    checkScore();
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
     if (player.y < 50){
            this.x = playerStartX
            this.y = playerStartY
            winRound();
        }
};

Player.prototype.handleInput = function(key){

 switch ( key ) {
  case 'up':
    if (this.y > 10) {
        this.y= this.y - 10;
    }
    break;
  case 'down':
    if (this.y <= 425) {
        this.y= this.y + 10;
    }
    break;
  case 'left':
    if (this.x > 0){
        this.x = this.x - 10;
    }
    break;
  case 'right':
    if (this.x < 400){
       this.x = movePlayerRight(this.x);
    }
    break;
  default:
    console.log('key other than up, down, left, right arrow pressed');

};
    // Move player's location on screen, location depending on keydown event
    // if (key === 'up' && this.y > 10){this.y= this.y - 10; }
    // if (key === 'down' && this.y < 400){this.y = this.y + 10;}
    // if (key === 'left' && this.x > 0){this.x = this.x - 10;}
    // if (key === 'right' && this.x < 400){
    //     this.x = movePlayerRight(this.x);}

};





// Instantiate objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

playerStartX = 207;
playerStartY = 325;
var allEnemies = [];
var player = new Player(playerStartX,playerStartY);

function makeEnemies(num){
        for(let i=0; i<num; i++){
            var newEnemy = new Enemy(-100, enemyPlaceVal(50, 250), enemySpeedVal(85) );
            allEnemies.push(newEnemy);
        }

    }

 makeEnemies(enemyCount);





// Listen for key presses and send the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e){

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

     // Prevent default behaviour of arrow keys
    if(e.which === 37 || e.which === 38 || e.which === 39 || e.which === 40){
        e.preventDefault(); e.stopPropagation(); console.log('stopped default'); // doesn't work
    }


    player.handleInput(allowedKeys[e.keyCode]);
});


//Pseudo-randomize enemies' speed
function enemySpeedVal(speed){
    return Math.floor(Math.random() *  (speed));
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


}

//Alert user when she has won.
function winRound(){
        enemyCount += 1
        allEnemies.length = 0;
        makeEnemies(enemyCount);
        console.log ('won', "new enemy count:" + enemyCount)
        score = score +2;
        $('#score').html("Score:" + score )
        //call a function that replaces player and creates new enemies.
        //call makeEnemeies within here and add an enemy or two
        //create a score div  replace innterHTML

}

function checkScore(){
    if (enemyCount > 6 && score > 0){
        window.alert('You Win! Ready to beat your own score?')
        document.location.reload(true);
    }if (score < - 8){
        window.alert('Sorry, Try Again.')
        document.location.reload(true);
    }

}

// function start(){

// }


