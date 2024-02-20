let score;
let timer;
let state = 0;
let speed = 1;
let sheet;
let bugs = [];

let test;

function preload() {
  sheet = loadImage("Buggy.png");
}

function setup() {
  createCanvas(800, 500);
  imageMode(CENTER);
  angleMode(DEGREES);
  timer = new Timer("Time remaining:", 2, 25);
  score = new Score(650, 25);
  textSize(25);
  for (let i = 0; i <= 10; i++) {
    let r1 = random(0, 100);
    let r2, r3;
    if (r1 <= 50) {
      r2 = random(0, -100);
      r3 = 1;
    } else {
      r2 = random(800, 900);
      r3 = -1;
    }
    bugs[i] = new Bug(sheet, 40, 40, r2, random(26, 490), 6, r3);
  }
}

function draw() {
  background("white");
  if (state === 0) {
    text("Time For Some Bug Squishing!", 325, 250);
    text('Press "Space" to start!', 300, 300);
  }
  if (state === 1) {
    timer.draw();
    timer.start();
    score.draw();
    bugs.forEach((e) => {
      e.draw();
    });
    if (timer.getTimer() <= 0) {
      timer.stop();
      state += 1;
    }
  }
  if (state === 2) {
    text("Game Over!", 350, 250);
    text(`Your score was ${score.getScore()}`, 325, 300);
  }
}

function keyPressed() {
  if (keyCode === 32 && state === 0) {
    state += 1;
  }
}

function mousePressed() {
  bugs.forEach((e) => {
    e.mousePressed(mouseX, mouseY);
  });
}

class Bug {
  constructor(spriteSheet, sw, sh, dx, dy, aLen, move) {
    this.spriteSheet = spriteSheet;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.u = 0;
    this.v = 0;
    this.aLen = aLen;
    this.curFrame = 0;
    this.move = move;
    this.xDir = 1;
    this.dead = false;
    this.counter = 0;
  }

  draw() {
    if (this.move != 0) {
      this.u = this.curFrame % this.aLen;
    } else {
      this.u = 0;
    }

    push();
    translate(this.dx, this.dy);
    scale(this.xDir, 1);
   // if (this.move <= -1) rotate(-90);
    //if (this.move >= 1) rotate(90);
    if (this.dead === true) {
      if (frameCount % 60 === 0) {
        this.counter++;
      }
      if (this.counter >= 3) {
        image(
          this.spriteSheet,
          0,
          0,
          this.sw,
          this.sh,
          224,
          0,
          this.sw,
          this.sh
        );
      } else {
        image(
          this.spriteSheet,
          0,
          0,
          this.sw,
          this.sh,
          192,
          0,
          this.sw,
          this.sh
        );
      }
    } else {
      image(
        this.spriteSheet,
        0,
        0,
        this.sw,
        this.sh,
        this.u * this.sw,
        this.v * this.sh,
        this.sw,
        this.sh
      );
    }

    pop();
    if (frameCount % 6 === 0) {
      this.curFrame++;
    }
    this.dx += this.move * speed;
    if (this.dx > 900) {
      this.dx = 0;
    } else if (this.dx < -100) {
      this.dx = 800;
    }
  }

  stop() {
    this.speed = 0;
  }

  mousePressed(x, y) {
    if (
      this.dx - 30 < x &&
      x < this.dx + 30 &&
      this.dy - 30 < y &&
      y < this.dy + 30 &&
      !this.dead
    ) {
      this.move = 0;
      this.dead = true;
      score.incScore(1);
      speed++;
      let r1 = random(0, 100);
      let r2, r3;
      if (r1 <= 50) {
        r2 = random(0, -100);
        r3 = 1;
      } else {
        r2 = random(800, 900);
        r3 = -1;
      }
      bugs.push(new Bug(sheet, 40, 40, r2, random(26, 490), 6, r3));
    }
  }
}

class Timer {
  constructor(text, posX, posY) {
    this.text = text;
    this.x = posX;
    this.y = posY;
    this.timer = 30;
    this.started = true;
  }

  draw() {
    text(`${this.text} ${this.timer}`, this.x, this.y);
  }

  getTimer() {
    return this.timer;
  }

  start() {
    if (frameCount % 60 === 0 && this.timer > 0 && this.started) {
      this.timer--;
    }
  }

  stop() {
    this.started = false;
  }
}

class Score {
  constructor(posX, posY) {
    this.curScore = 0;
    this.x = posX;
    this.y = posY;
  }

  draw() {
    text(`Score: ${this.curScore}`, this.x, this.y);
  }

  incScore(amt) {
    this.curScore += amt;
  }

  getScore() {
    return this.curScore;
  }
}
