$("#Image-Video").change(function () {
  showSelected($("#Image-Video").val());
});


  async function showSelected(name) {
    if (name === "Webcam") {
        $("#Image-Select").hide();
        $("#Predict-Button").hide();
        $("#Chosen-Image").hide();
        $("#video").show();
        const video = document.getElementById('video');

        //Initializing video if Webcam is selected
        navigator.mediaDevices.getUserMedia({ video: true })
              .then((stream) => {
              video.srcObject = stream;
              video.play();
    })



      //Begins making predicitons from webcam feed
        ml5.imageClassifier('MobileNet', video)
              .then(classifier => loop(classifier))
              const loop = (classifier) => {
              classifier.predict()
              .then(results => {
              $("#Predictions").empty();
        
              let i = 0;
                    for (i; i < 3; i++) {
              $("#Predictions").append((i + 1) + ". " + results[i].className + " : " + results[i].probability.toFixed(4) + "<br>");
              }
      

        if($("#Image-Video").val() === "Webcam") {
              loop(classifier) // Call again to create a loop
        }
        
        })
      }
    } //End of Video management

      //Beginning of Image management
        else if (name === "Image") {
              $("#Image-Select").show();
              $("#Predict-Button").show();
              $("#Chosen-Image").show();
              $("#video").hide();
              //this removes any prediction lists from previous webcam/image use then relists a new  prediction
              $("#Predictions").empty();
              $("#Predictions").show();

    }
        else {
              throw new Error("Unknown Classifier type");
        }
  }



  $("#Image-Select").change(function () {
      let reader = new FileReader();
      reader.onload = function () {
      let dataURL = reader.result;
      $('#Chosen-Image').attr("src", dataURL);
  }
      let file = $("#Image-Select").prop("files")[0];
      reader.readAsDataURL(file);
  })

  const classifier = ml5.imageClassifier('MobileNet', function() {
      });



//Prediciton Button JS
  $("#Predict-Button").click(async function () {
      let image = $("#Chosen-Image").get(0);
      classifier.predict(image, 5, function(err, results) {
      let i = 0;
      $("#Predictions").empty().show();
        for (i; i < 5; i++)
        {
            console.log(results[i].className + ":" + results[i].probability.toFixed(6));
            $("#Predictions").append((i + 1) + ". " + results[i].className + " : " + results[i].probability.toFixed(6) + "<br>");
        }
  });
})
