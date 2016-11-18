// Enemies our player must avoid
//TO-DO: HOW CAN I TAKE THeSe COUNTs OUT OF THE GLOBAL SCOPE
var enemyCount = 2;
var score = 0;

//Define character characteristics with superclass
var Character = function(sprite, width, height){
    'use strict';
    this.sprite = sprite;
    this.width = width;
    this.height = height;
};

//draw Character on screen
Character.prototype.render = function() {
    'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Character.prototype.makeEnemies = function (enemyCount) {
    'use strict';
        for(let i=0; i<enemyCount; i++){
            var newEnemy = new Enemy(-100, enemyPlaceVal(50, 250), enemySpeedVal(85) );
            allEnemies.push(newEnemy);
            console.log("enemiesFunc");
        }

    };


Character.prototype.winRound = function(){
        'use strict';
        //increase enemies count by 1 and revert speed to randomized starting val by emptying and recreating the enemies array
        enemyCount += 1;
        allEnemies.length = 0;
        this.makeEnemies(enemyCount);
        console.log ('won:', "new enemy count:" + enemyCount);
        //increment score
        score = score +1;
         //create a score div  replace innterHTML
        $('#score').html("Score:" + score );



}

//create enemies subclass
var Enemy = function(x,y,speed) {
    'use strict';
    Character.call(this, 'images/enemy-bug.png', 100, 100);
    this.x = x;
    this.y = y;
    this.speed=speed;
    console.log('madeOneEnemy');

};

//link Enemy class to character prototype chain
Enemy.prototype= Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
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

    'use strict';
    this.x = this.x + this.speed * dt;
    // Have enemies re-render at x = 0 when the reach the right edge
    if(this.x > 500){
        this.x = -100;
        this.y = enemyPlaceVal(50, 250);
        this.speed = this.speed * 1.1;
    }

};


// check for collision of player/enemy
Enemy.prototype.checkCollisions = function(other){
    'use strict'
    var thisEnemy = this;
    var thisPlayer = other;

    for (var i=0, l=allEnemies.length; i<l; i++){

        if ( thisEnemy.x < thisPlayer.x + 60 &&
           thisEnemy.x + 60 > thisPlayer.x &&
           thisEnemy.y < thisPlayer.y+ 60 &&
           60 + thisEnemy.y > thisPlayer.y) {
            console.log('collision detected!');
            thisPlayer.x = playerStartX;
            thisPlayer.y = playerStartY;
            //empty and recall allEnemies to reset speed incrementation
            allEnemies.length = 0;
            this.makeEnemies(enemyCount);
            score = score -1;
            //Write score to #score div
            $('#score').html("Score:" + (score) );
        }
    }
};

// The Player subclass defines player's img by Character class and location as parameters
var Player = function(x,y){
    'use strict';
    Character.call(this, 'images/char-horn-girl.png' , 100, 100);
    this.x = x;
    this.y = y;


};

Player.prototype= Object.create(Character.prototype);
Player.prototype.constructor = Enemy;

//Update player's location on screen according to keydown events. End game when player reaches water and restart game.
Player.prototype.update = function(dt) {
    'use strict';
    this.x = this.x;
    this.y = this.y;
    window.addEventListener('keydown', Player.prototype.handleInput);
    checkScore();
    if (this.y < 50){
            this.x = playerStartX;
            this.y = playerStartY;
            this.winRound();
        }
};

// Draw the player on the screen
// Player.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

// };

Player.prototype.handleInput = function(key){
'use strict';
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

}
//TO-DO: why does switch always call default case?

};

// Instantiate objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var playerStartX = 207;
var playerStartY = 325;
var allEnemies = [];
var player = new Player(playerStartX,playerStartY);
var game = new Character();
game.makeEnemies(enemyCount);
// Listen for key presses and send the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e){
    'use strict';
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
    'use strict';
    return Math.floor(Math.random() *  (speed));
}

//Pseudo-randomize enemies' beginning x location coordinate
function enemyPlaceVal(min, max){
    'use strict';
    return Math.random() * (max - min) + min;
}

// Play with using a function to deterimine player movement. Not concise.
function movePlayerRight(currentX){
    'use strict';
    return currentX  += 10;
}



//Alert user when s/he has won/lost
function checkScore(){
    'use strict';
    if (score > 8){
        window.alert('You Win!');
        document.location.reload(true);
    }if (score < - 8){
        window.alert('Sorry, Try Again.');
        document.location.reload(true);
    }

}




