Window.onload = function() {
  Resources.get('images/enemy-bug.png');
}
// Enemies our player must avoid
class Enemy {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  constructor() {
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.ranNum = Math.floor(Math.random() * 3);
    this.initialLocationArray = [60, 145, 228]
    this.y = this.initialLocationArray[this.ranNum];
    this.speed = 1;
  }
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // this.y = this.y + this.speed * dt;    
  }
  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

// Enemy.prototype.update = function(dt) {
    
// };

// Enemy.prototype.render = function() {
//   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = "images/char-boy.png";
        this.x = 200;
        this.y = 380;
    }
    update(dt) {}
    render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // handleInput(allowedKeys) {}
    // reset() {}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();

let allEnemies = [];
// setInterval(function() { 
//   let enemy = new Enemy();
//   allEnemies.push(enemy);
// }, 2000);
// setTimeout(function() {
//   console.log(allEnemies);
// }, 10000);
const enemy = new Enemy();
allEnemies.push(enemy);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
