function setup() {

  canvas = createCanvas(300, 300);

  canvas.center();

  video = createCapture(VIDEO);

  video.hide();

  Classifier = ml5.imageClassifier('MobileNet',modelLoaded);

}

function modelLoaded() {

  console.log("Model Loaded!");
  
}

function draw() {

  image(video, 0, 0, 300, 300);

  Classifier.classify(video,gotResult);
  
}

PreviousResult = "";

function gotResult(error,results) {

  if (error) {

    console.error(error);
    
  } else {

    if ((results[0].confidence > 0.5) && (PreviousResult != results[0].label) ) {

      console.log(results);

      PreviousResult = results[0].label;

      var synth = window.speechSynthesis;

      SpeakData = "Object Detected Is - " + results[0].label;

      var UtterThis = new SpeechSynthesisUtterance(SpeakData);

      synth.speak(UtterThis);

      document.getElementById("Object").innerHTML = results[0].label;

      document.getElementById("Accuracy").innerHTML = results[0].confidence.toFixed(3);

    }

  }
  
}