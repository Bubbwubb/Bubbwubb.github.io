function setup() {
  createCanvas(1200, 650);
  background("white");
}

var colorSelected = "white";

//creating the color selection tool
function mousePressed() {
  if (mouseX <= 25 && mouseY <= 25) {
    colorSelected = "red";
  }
  if (mouseX <= 25 && mouseY > 25 && mouseY <= 50) {
    colorSelected = "orange";
  }
  if (mouseX <= 25 && mouseY > 50 && mouseY <= 75) {
    colorSelected = "yellow";
  }
  if (mouseX <= 25 && mouseY > 75 && mouseY <= 100) {
    colorSelected = "lime";
  }
  if (mouseX <= 25 && mouseY > 100 && mouseY <= 125) {
    colorSelected = "cyan";
  }
  if (mouseX <= 25 && mouseY > 125 && mouseY <= 150) {
    colorSelected = "blue";
  }
  if (mouseX <= 25 && mouseY > 150 && mouseY <= 175) {
    colorSelected = "magenta";
  }
  if (mouseX <= 25 && mouseY > 175 && mouseY <= 200) {
    colorSelected = "brown";
  }
  if (mouseX <= 25 && mouseY > 200 && mouseY <= 225) {
    colorSelected = "white";
  }
  if (mouseX <= 25 && mouseY > 225 && mouseY <= 250) {
    colorSelected = "black";
  }
}

function draw() {
  //color box borders
  stroke(255);
  strokeWeight(2);

  //color box creation, each one doesn't need a comment
  fill("red");
  rect(0, 0, 25, 25);
  fill("orange");
  rect(0, 25, 25, 25);
  fill("yellow");
  rect(0, 50, 25, 25);
  fill("lime");
  rect(0, 75, 25, 25);
  fill("cyan");
  rect(0, 100, 25, 25);
  fill("blue");
  rect(0, 125, 25, 25);
  fill("magenta");
  rect(0, 150, 25, 25);
  fill("brown");
  rect(0, 175, 25, 25);
  fill("white");
  rect(0, 200, 25, 25);
  fill("black");
  rect(0, 225, 25, 25);


  //implementing the actual drawing action
  if (mouseIsPressed) {
    if ((mouseX > 30 || mouseY > 230) && (pmouseX > 30 || pmouseY > 230)) {
      stroke(colorSelected);
      strokeWeight(5);
      line(mouseX, mouseY, pmouseX, pmouseY);
    }
  }
}
