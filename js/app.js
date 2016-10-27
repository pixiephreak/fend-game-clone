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

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // console.log('prototypedEnemy')
    	this.x = this.x + this.speed * dt;
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

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y){
    this.sprite = 'images/char-horn-girl.png';
    this.x = x
    this.y = y
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

playerStartX = 245;
playerStartY = 450;
var allEnemies = []
var player = new Player(playerStartX,playerStartY);

function makeEnemeis(){
for(let i=0; i<7; i++){
	var newEnemy = new Enemy(0, Math.floor(Math.random() *  (400 - 20)), Math.floor(Math.random() *  (100)) );
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
