let faceapi;
let detections = [];
let video;
let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(width, height);
  // video.hide()
  colorMode(HSB)

  const faceOptions = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptors: true,
    minConfidence: 0.5,
  };

  //Initialize the model:
  faceapi = ml5.faceApi(video, faceOptions, faceReady);
}

function faceReady() {
  faceapi.detect(gotFaces); // Start detecting faces:
}

// Got faces:
function gotFaces(error, result) {
  if (error) {
    // console.log(error);
    return;
  }

  detections = result; //Now all the data in this detections:

 faceapi.detect(gotFaces); // Call the function again at here:
}

function draw() {
  clear()
  if(detections.length > 0) {
    makeText(detections)
  }
}


function makeText(detections) {
  // console.log(detections)
  
  let {
      neutral,
      happy,
      angry,
      sad,
      disgusted,
      surprised,
      fearful,
    } = detections[0].expressions;

  // console.log(happy, surprised)
  let fontSize = map(happy, 0, 1, 12, 100);
  let fontColor = map(surprised, 0, 1, 0, 360)
  fill(fontColor, 255, 255)
  textSize(fontSize);
  textAlign(CENTER, CENTER)
  text("happy", width/2, height/2)
}
