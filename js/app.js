
var Enemy = function() {
    this.reset();
    this.sprite = 'images/enemy-bug.png';
};


Enemy.prototype.update = function(dt) {

    this.x = (this.x + this.speed);
    this.y = 83*this.row;

    if(this.x > 6 * 83){
        this.reset();
    }
};


Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
    this.col = -1; 
    this.row = getRandomInt(1,3);
    this.x = 101 * this.col;
    this.y = 83 * this.row;
    this.speed = getRandomInt(2,6);
};


var Player = function() {

    this.reset();
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    if(this.moveable) {
        this.x = 101 * this.col;
        this.y = 83 * this.row;
    }

    if(this.y < 83 && this.moveable) {
        this.moveable = false;
        return true;
    }

    return false;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    this.col = getRandomInt(0,4); 
    this.row = 5;
    this.moveable = true;
};

Player.prototype.handleInput = function(key) {
    switch (key){
        case 'left':
            this.col--;
            break;
        case 'up':
            this.row--;
            break;
        case 'right':
            this.col++;
            break;
        case 'down':
            this.row++;
            break;
    }
    if(this.col < 0) this.col = 0;
    if(this.col > 4) this.col = 4;
    if(this.row < 0) this.row = 0;
    if(this.row > 5) this.row = 5;
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var allEnemies = [];
for(var i = 0; i < 3; i++){
    allEnemies.push(new Enemy());
}

var player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});