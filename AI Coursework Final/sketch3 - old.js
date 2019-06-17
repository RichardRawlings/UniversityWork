const classifier = ml5.imageClassifier('MobileNet', modelLoaded);
let status;
let img;



function modelLoaded() {
  status.html('Ready for Use');
}


//Creating Canvas for Drag & Drop / Disaplying selected image

function clearCanvas() {
  let TopfontSize = height / 8;
  background(255);
  fill(200);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(TopfontSize);
  text('Drag & Drop an image here,', width / 2 , height / 4, width, height);

  text(
      'Or browse your PC for an image', width / 2, height / 2.5 + TopfontSize * 2, width,
      height);
}


//The output data from inputting an image

function findImage(err, results) {

 if (err)
    console.error(err);
  else
    status.html(
        'Image Analysis complete, This analysis is ' + round(results[0].probability * 100) +
        '% sure that this image contains <br> (a): ' + results[0].className);
        
}



//Handles the size of the image, doesn't need changing

function handleImage() {
  let r = img.width / img.height;
  resizeCanvas(height * r, height);
  image(img, 0, 0, width, height);
  classifier.predict(img, findImage);
}



//Checks that the input files are correct format, else throws an error and resets canvas

function handleFile(file) {
  if (file.type === 'image') {
    img = createImg(file.data, handleImage);
    img.hide();
  } else {
    status.html('File not supported');
    clearCanvas();
  }
}



//Setup for canvas/Buttons

function setup() {
  status = select('#status');
  let h = windowHeight * 3 / 5;
  let canvas = createCanvas(h * 16 / 9, h);
  canvas.parent('#canvas');
  clearCanvas();
  canvas.drop(handleFile);
  let button = createFileInput(handleFile);
  button.parent('#button');
}