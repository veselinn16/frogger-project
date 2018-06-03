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
    this.initialLocationArray = [48, 131, 214]
    this.y = this.initialLocationArray[this.ranNumForLocation];
    this.ranNumForSpeed = Math.floor(Math.random() * 8);
    this.speedArray = [100, 150, 200, 250, 300, 350, 400, 450, 500];
    this.speed = this.speedArray[this.ranNumForSpeed];
    this.row = null;
    this.col = 1;
  }
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + this.speed * dt;

    if(this.x < 102) {
      this.col = 1;
    } else if(this.x < 203) {
      this.col = 2;
    } else if(this.x < 304) {
      this.col = 3;
    } else if(this.x < 405) {
      this.col = 4;
    } else if(this.x < 505) {
      this.col = 5;
    } else if(this.x < 550) {
      this.col = 7;
    }


    switch(this.y) {
      case 48:
        this.row = 2;
      break;
      case 131:
        this.row = 3;
      break;
      case 214:
        this.row = 4;
    }

    for(const enemy of allEnemies) {
      // console.log(`   row is ${enemy.row}`);
      // console.log(`col is ${enemy.col}`);
      if (enemy.col === player.col && enemy.row === player.row) {
        player.reset();
        allEnemies = [];
      }
    }
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
        this.row = 6;
        this.col = 3;
    }
    update(dt) {
      if(this.row === 1) {
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
            this.y = this.y - 83;
            this.row -= 1;
          }
        break;
        case "down":
        if (this.y < 380) {
          this.y = this.y + 83;
          this.row += 1;
        }
        break;
        case "left":
          if (this.x > 4) {
            this.x = this.x - 101;
            this.col -= 1;
          }
        break;
        case 'right':
          if (this.x < 396) {
            this.x = this.x + 101;
            this.col += 1;
          }
      }
    }
    reset() {
      this.x = 200;
      this.y = 380;
      this.row = 6;
      this.col = 3; 
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();

let allEnemies = [];
// let enemy = new Enemy();
// allEnemies.push(enemy);

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
