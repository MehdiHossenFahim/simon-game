var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];


var started = false;
var level = 0;



$(document).on("click keydown",function () {
    if (!started) {

        $("#level-title").text("Level " + level);
        $("h2").addClass("visibility");
        nextSequence();
        started = true;

    }
});

$(".btn").click(function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //   console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    //   console.log(userClickedPattern.length);
});

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
        // console.log(currentColour);
    }, 100);
}

function playSound(name) {
    var audio = new Audio("assets/sounds/" + name + ".mp3");
    // console.log("play sound :"+name);
    audio.play();

}

function nextSequence() {
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    playPattern();
}


function playPattern() {
    for (let i = 0; i < gamePattern.length; i++) {
        // console.log("Game pattern: " + gamePattern[i]);
        setTimeout(function () {
            animatePress(gamePattern[i]);
            playSound(gamePattern[i]);
        }, i * 600);
    }
}


function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1500);
        }
    } else {
        gameOver();
        startOver();
    }

}

function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over!");
    $("h2").removeClass("visibility").text("Press Any Key to Restart");

}

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    level = 0;

}
