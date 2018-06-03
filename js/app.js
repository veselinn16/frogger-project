//Disables scrolling with the arrow keys
window.addEventListener("keydown", function(e) {
    if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  },
  false
);
// Enemies Class
class Enemy {
  // Variables applied to each of the instances
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
  // Update method updating the enemy's position
  update(dt) {
    //Sets the speed of the enemy
    this.x = this.x + this.speed * dt;

    //Sets the column based on the location of the enemy
    if(this.x < 62) {
      this.col = 1;
    } else if(this.x < 163) {
      this.col = 2;
    } else if(this.x < 264) {
      this.col = 3;
    } else if(this.x < 365) {
      this.col = 4;
    } else if(this.x < 465) {
      this.col = 5;
    } else if(this.x < 510) {
      this.col = 7;
    }

    //Changes the column based on the location of the enemy
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

    //Monitors collisions by comparing the player's and the enemy's columns and rows
    for(const enemy of allEnemies) {
      if (enemy.col === player.col && enemy.row === player.row) {
        player.reset();
        allEnemies = [];
      }
    }
  }
  //Render method drawing the enemy on the canvas
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

//The Player class
class Player {
    constructor() {
        this.sprite = "images/char-boy.png";
        this.x = 200;
        this.y = 380;
        this.row = 6;
        this.col = 3;
    }
    //When the player reaches the water, resets the game(win condition) 
    update(dt) {
      if(this.row === 1) {
        this.reset();
        allEnemies = [];
      }
    }
    //Puts the player on the canvas
    render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    //Based on what the user presses, it moves the player and sets the column/row accordingly
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
    //Resets the location of the player
    reset() {
      this.x = 200;
      this.y = 380;
      this.row = 6;
      this.col = 3; 
    }
}

//Instantiates the player
const player = new Player();

//Creates an empty array and pushes an instance of the Enemy class every second 
let allEnemies = [];
setInterval(function() { 
  let enemy = new Enemy();
  allEnemies.push(enemy);
}, 1000);

//This listens for key presses and sends the keys to the Player.handleInput() method
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
