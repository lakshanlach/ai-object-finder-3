status = "";
objects = [];

function preload(){

}

function setup() {
    canvas = createCanvas(400, 300)
    canvas.center()

    video = createCapture(VIDEO)
    video.size(500, 300)
    video.position(485 , 285)
    video.hide()
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status : Detecting Objects"
    objectname = document.getElementById("name").value
}

function modelLoaded() {
    console.log("modelloaded")
    status = true
}

function gotResult(error , results) {
  if(error){
    console.log(error)
  }
    console.log(results)
    objects = results
  }

function draw() {
    image(video, 0, 0, 380, 380)

    if (status != "") {
        objectDetector.detect(video, gotResult)

        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected"

          stroke("red")
          fill("red")
          percent = floor(objects[i].confidence * 100)
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15)
          noFill()
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
         
        if(objects[i].label == objectname){
          video.stop()
          objectDetector.detect(gotResult)
          document.getElementById("object").innerHTML = objectname + " Found"
          synth = window.speechSynthesis
          utterThis = new SpeechSynthesisUtterance(objectname + "found")
          synth.speak(utterThis)
        }
        else{
          document.getElementById("object").innerHTML = objectname + " Not Found";
        }   
    }
}
}