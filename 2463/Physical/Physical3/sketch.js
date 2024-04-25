var serial;   
var portName = '/dev/cu.usbserial-DN01DW79';    
var inData;  

var minWidth = 600;   
var minHeight = 400;
var width, height;   

function setup() {
  
  if (window.innerWidth > minWidth){
    width = window.innerWidth;
  } else {
    width = minWidth;
  }
  if (window.innerHeight > minHeight) {
    height = window.innerHeight;
  } else {
    height = minHeight;
  }

  
  createCanvas(width, height);
  noStroke();

  
  serial = new p5.SerialPort();       
  serial.on('list', printList);  
  serial.on('connected', serverConnected); 
  serial.on('open', portOpen);        
  serial.on('data', serialEvent);     
  serial.on('error', serialError);   
  serial.on('close', portClose);      

  serial.list();                     
  serial.open(portName);             
}

function draw() {
  
  background(0);

 
  var leftBrightness = map(inData, 0, 255, 0, 255);   
  fill(leftBrightness);   
  rect(0,0,width/2,height);   

 
  var textLColor = map(leftBrightness, 0, 255, 255,0);  
  fill(textLColor);
  textSize(16);
  text("THE OTHER SIDE", 30, 30);
  textSize(12);
  text("BRIGHTNESS LEVEL: " + inData, 30, 50);    


  var rightBrightness = 0;
  fill(rightBrightness);
  rect(width/2,0,width/2,height);

 
  var textRColor = map(rightBrightness, 0, 255, 255,0);
  fill(textRColor);
  textSize(16);
  text("ME", width - 70, 30);
  textSize(12);
  text("BRIGHTNESS LEVEL: " + rightBrightness, width - 170, 50);

  
  fill(255);
  rect(width/2 - 0.5, 0, 1, height);
}


function printList(portList) {

 for (var i = 0; i < portList.length; i++) {
 
 print(i + " " + portList[i]);
 }
}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

function serialEvent() {
  inData = Number(serial.read());
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}