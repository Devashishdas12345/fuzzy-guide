song = "";
img = "";
objects = [];
status = "";
s = [];

function preload() {
	song = loadSound("alert_2.mp3");
}

function setup() {
    canvas = createCanvas(380 , 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting baby"; 
}

function modelLoaded() {
    console.log("Model is loaded");
    status = true;
}

function gotResults(error,results) {
    if(error) {
        console.error("Error");
        window.alert("Error");
    }
    else {
        console.log(results);
        objects = results;
        s = results[0].label;
        console.log(s);
    }
}

function draw() {
    document.getElementById("status").innerHTML = "Status : Baby is detected";

    image(video, 0, 0, 380, 380);

    if (status != "") {
        if (s == "person") {
            objectDetector.detect(video, gotResults);
            for (i = 0; i < objects.length; i++) {
                r = random(255);
                g = random(255);
                b = random(255);
            
                document.getElementById("status").innerHTML = "Baby is detected";
                document.getElementById("no_of_objects").innerHTML = "No. of objects detected are :- " + objects.length;
                fill(r,g,b);
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x + 15 , objects[i].y + 15);
                noFill();
                stroke(r,g,b);
                rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
            }
        }
        else if(s != "person") {
            play;
            document.getElementById("status").innerHTML = "Baby is not detected";
            document.getElementById("no_of_objects").innerHTML = "No. of objects detected are :- " + objects.length;
        }
        else if(s == "") {
            play;
            document.getElementById("status").innerHTML = "Baby is not detected";
            document.getElementById("no_of_objects").innerHTML = "No. of objects detected are :- " + objects.length;
        }
    } 
}

function play() {
	song.play();
}