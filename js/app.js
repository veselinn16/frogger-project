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
    this.ranNumForLocation = Math.floor(Math.random() * 3);
    this.initialLocationArray = [60, 145, 228]
    this.y = this.initialLocationArray[this.ranNumForLocation];
    this.ranNumForSpeed = Math.floor(Math.random() * 8);
    this.speedArray = [100, 150, 200, 250, 300, 350, 400, 450, 500];
    this.speed = this.speedArray[this.ranNumForSpeed];
  }
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + this.speed * dt;
    // if(this.x - Player.x) {
    //   Player.reset()
    //   allEnemies = [];
    // }
    // console.log(Player.x);
  }
  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = "images/char-boy.png";
        this.x = 200;
        this.y = 380;
    }
    update(dt) {
      if(this.y === -20) {
        this.reset();
        allEnemies = [];
      }
    }
    render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(allowedKeys) {
      switch (allowedKeys) {
        case "up":
          if (this.y > -20) {
            this.y = this.y - 80;
          }
        break;
        case "down":
        if (this.y < 380) {
          this.y = this.y + 80;
        }
        break;
        case "left":
          if (this.x > -4) {
            this.x = this.x - 102;
          }
        break;
        case 'right':
          if (this.x < 404) {
            this.x = this.x + 102;
          }
      }
    }
    reset() {
      this.x = 200;
      this.y = 380; 
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();

let allEnemies = [];

setInterval(function() { 
  let enemy = new Enemy();
  allEnemies.push(enemy);
}, 1000);

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
