const classifier = ml5.imageClassifier('MobileNet', modelLoaded);
let status;
let img;


  /*    async function showSelected(name) {
  if($("#model-selector").val() === "Webcam") { */
    $("#video").show();
    const video = document.getElementById('video');

    // Create a webcam capture
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      })







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
        'Image Analysis complete. The analysis results are the following: <br> A: ' +  
        round(results[0].probability * 100)  + '% ' + results[0].className + '<br> B: ' + 
        round(results[1].probability * 100)  + '% ' + results[1].className + '<br> C: ' + 
        round(results[2].probability * 100)  + '% ' + results[2].className);
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
/*function setup() {
  status = select('#status');
  let h = windowHeight * 3 / 5;
  let canvas = createCanvas(h * 16 / 9, h);
  canvas.parent('#canvas');
  clearCanvas();
  canvas.drop(handleFile);
  let button = createFileInput(handleFile);
  button.parent('#button');
} 



   const loop = (classifier) => {
      classifier.predict()
        .then(results => {
        $("#prediction-list").empty();
        //$("#prediction-list").append((1) + ". " + results[0].className + " : " + results[0].probability.toFixed(4) + "<br>");
        let i = 0;
      //$("#prediction-list").empty().show();
      for (i; i < 3; i++)
      {
          //console.log(i);
        $("#prediction-list").append((i + 1) + ". " + results[i].className + " : " + results[i].probability.toFixed(4) + "<br>");
      }
      if($("#model-selector").val() === "Webcam") {
          loop(classifier) // Call again to create a loop
      }
        })
    }
  }

  
  else if (name === "Image Select") {
    $("#video").hide();
  }

}
*/