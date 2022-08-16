song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist  = 0;
scoreRightWrist = 0;
status1 = '';
status2 = '';

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600, 600)
    canvas.position(1000, 350)
    video = createCapture(VIDEO)
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotPoses)
}

function modelLoaded()
{
    console.log("Model is loaded");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("The left wrist x is: " + leftWristX + "and the left wrist y is: " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("The right wrist x is: " + rightWristX + "and the right wrist y is: " + rightWristY);
    }
}

function draw()
{
    image(video, 0, 0, 600, 600)

    status1 = song1.isPlaying();
    status2 = song2.isPlaying();

    if(scoreLeftWrist > 0.2)
    {
        noStroke();
        fill("#0000ff")
        circle(leftWristX, leftWristY, 20);
        song2.stop();

        if(status2 == false  && !song1.isPlaying())
        {
            song1.play()
            document.getElementById("song").innerHTML = "Playing Song1";
        }
    }

    if(scoreRightWrist > 0.2)
    {
        noStroke();
        fill("#0000ff")
        circle(rightWristX, rightWristY, 20);
        song1.stop();

        if(status1 == false && !song2.isPlaying())
        {
            song2.play()
            document.getElementById("song").innerHTML = "Playing Song2";
        }
    }

    //fill("#ffff00")
    //circle(rightWristX, leftWristY, 20);
}