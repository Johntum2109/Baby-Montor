var alarm = "";
var status = "";
var object = [];

function preload() 
{
    alarm = loadSound("alarm.mp3");
}

function setup() 
{
    // Canvas
    canvas = createCanvas(600, 520);
    canvas.center();   

    // Object Detector
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status - Object Detecting";

    // Camera
    webcam = createCapture(VIDEO);
    webcam.hide();
}

function modelLoaded() 
{
    console.log("model loaded...");    
    status = true;
}

function gotResult(error, result) 
{
    if (error) 
    {
        console.log(error); 
    }
    else
    {
        console.log(result);
        object = result;
    }
}

function draw() 
{
    image(webcam, 0, 0, 600, 520);

    if (status != "") 
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(webcam, gotResult);
        for (var index = 0; index < object.length; index++) 
        {
            document.getElementById("status").innerHTML = "Status - Object Detected";
            
            fill(r, g, b);
            text(object[index].label, object[index].x, object[index].y);
            noFill();
            stroke(r, g, b);
            rect(object[index].x, object[index].y, object[index].width, object[index].height);
            if (object[index].label != "person") 
            {
                alarm.play();    
                document.getElementById("objectsDetected").innerHTML = "Baby Not Found";
            }
            else
            {
                alarm.stop();
                document.getElementById("objectsDetected").innerHTML = "Baby Found";
            }
        }    
    }
}

