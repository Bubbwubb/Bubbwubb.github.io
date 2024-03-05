let synth = new Tone.PolySynth(Tone.Synth);
let bend = new Tone.PitchShift();
let dist = new Tone.Distortion();
let cheby = new Tone.Chebyshev();

bend.pitch = 0;
dist.distortion = 0;
synth.connect(bend);
bend.connect(cheby);
cheby.connect(dist);
dist.toDestination();

let sliderY = 200;
function setup() {
  let canv = createCanvas(900, 500);
  let cp = canv.position();

  let pSlider = createSlider(0, 12, 0, 0.1);
  pSlider.style("transform", "rotate(270deg)");
  pSlider.position(cp.x + 260, cp.y + sliderY);
  pSlider.mouseMoved(() => {
    bend.pitch = pSlider.value();
  });

  let dSlider = createSlider(0, 1, 0, 0.05);
  dSlider.style("transform", "rotate(270deg)");
  dSlider.position(cp.x + 360, cp.y + sliderY);
  dSlider.mouseMoved(() => {
    dist.distortion = dSlider.value();
  });

  let cSlider = createSlider(1, 100, 0, 2);
  cSlider.style("transform", "rotate(270deg)");
  cSlider.position(cp.x + 460, cp.y + sliderY);
  cSlider.mouseMoved(() => {
    cheby.order = cSlider.value();
  });
}
let notes = {
  a: "C4",
  s: "D4",
  d: "E4",
  f: "F4",
  g: "G4",
  h: "A4",
  j: "B4",
  k: "C5",
  l: "D5",
};

let kbKeys = ["Keys", "Q", "W", "E", "R", "T", "Y", "U", "I", "O"];
let nList = ["Notes", "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5"];
function keyPressed() {
  mostRecentKeyPressed = key;
  console.log(mostRecentKeyPressed);
  let playNotes = notes[key];
  synth.triggerAttack(playNotes);
}

function keyReleased() {
  let playNotes = notes[key];
  synth.triggerRelease(playNotes, "+0.03");
}

let mostRecentKeyPressed = "";
function draw() {
  background(4, 20, 69);
  createHeading("Assignment 2");

  let i = 0;
  let j = 0;
  let fillColor = "";
  kbKeys.forEach((e) => {
    if (mostRecentKeyPressed.toUpperCase() === e) {
      fillColor = 222;
    }
    r(j, fillColor, 400);
    fillColor = "white";
    t(e, j, 425);
    j++;
  });

  nList.forEach((e) => {
    r(i, fillColor, 350);
    t(e, i, 375);
    i++;
  });
  textAlign(CENTER, CENTER);
  fill(255);
  text("Pitch", 325, 300);
  text("Distortion", 430, 300);
  text("Cheby", 530, 300);
}

function createHeading(input) {
  fill("white");
  text(input, 450, 50);
  text(
    "Press one of the keys below to hear the note, adjust the sliders to add an effect.",
    450,
    80
  );
  textSize(20);
  textAlign(CENTER);
}

function r(i, fc, y) {
  fill(fc);
  rect(200 + 50 * i, y, 50, 50);
}

function t(e, j, y) {
  fill(0);
  textAlign(CENTER, CENTER);
  text(e, 225 + 50 * j, y);
}
