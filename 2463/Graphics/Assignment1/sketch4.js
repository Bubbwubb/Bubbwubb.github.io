function setup() {
  createCanvas(400, 400);
}

function draw() {
  //begin background
  background(0, 0, 139);

  //makecenter circle
  stroke(255, 255, 255);
  strokeWeight(3);
  fill(0, 139, 0);
  ellipse(200, 205, 220, 220);

  //start star
  fill(200, 0, 0);
  beginShape();
  vertex(200, 90); //top tip
  vertex(175, 175); //first inner point on top left
  vertex(90, 175); //left tip
  vertex(155, 225); //bottom left inner point
  vertex(130, 295); //bottom left point
  vertex(200, 245); // bottom middle inner
  vertex(270, 295); //bottom right point
  vertex(245, 225); //bottom right inner point
  vertex(310, 175); //right tip
  vertex(225, 175); //top right inner point
  vertex(200, 90); //top again
  endShape();
}
