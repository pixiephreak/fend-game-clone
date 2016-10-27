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

  		this.x = this.x + this.speed * dt;
  		// Have enemies re-render at x = 0 when the reach the right edge
		if(this.x > 500){
			this.x = 0
		}


    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

var playerPosition = [];

Enemy.prototype.collision = function(){

	console.log('checking')

	for (let i = 0; i < playerPosition.length; i++){
	var thisEnemyX = this.x;
	var thisPlayerY = playerPosition[i][i];
	var thisEnemyY = this.y;
	var thisPlayerY = playerPosition[i][i+1];


	if ( thisEnemyX < thisPlayerX + 100 &&
	   thisEnemyX + 100 > thisPlayerX &&
	   thisEnemyY < thisPlayerY+ 100 &&
	   100 + thisEnemyY > thisPlayerY) {
	    console.log('collision detected!')
		}
	}
}

Enemy.prototype.collision();

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y){
    this.sprite = 'images/char-horn-girl.png';
    this.height = 100;
    this.width = 100;
    this.x = x
    this.y = y
    playerPosition.push([this.x,this.y])

    // console.log("madeOnePlayer")
};

Player.prototype.update = function(dt) {
    // console.log('prototypedPlayer!')
    this.x = this.x
    this.y = this.y
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

playerStartX = 207;
playerStartY = 435;
var allEnemies = []
var player = new Player(playerStartX,playerStartY);


function makeEnemeis(){
for(let i=0; i<5; i++){
	var newEnemy = new Enemy(0, enemyPlaceVal(50, 330), enemySpeedVal(100) );
	allEnemies.push(newEnemy);
}}
makeEnemeis()




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function enemySpeedVal(speed){
	return Math.floor(Math.random() *  (speed))
}

function enemyPlaceVal(min, max){
	return Math.random() * (max - min) + min;
}



