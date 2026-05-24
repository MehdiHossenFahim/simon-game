var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


$(".btn").css("pointer-events", "none");


$("#play-btn").click(function () {
    if (!started) {
        startGame();
    }
});


$("#restart-btn").click(function () {
    restartGame();
});


function startGame() {
    started = true;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];

    $("#level-title").text("Level " + level);
    $("h2").addClass("visibility");

    $(".btn").css("pointer-events", "auto");

    nextSequence();
}


function restartGame() {
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];

    $("#level-title").text("Welcome to Simon Game.");
    $("h2").removeClass("visibility").text("Click Play to Start!");

    $("body").removeClass("game-over");

    $(".btn").css("pointer-events", "none");
}


$(".btn").click(function () {
    if (!started) return;

    let userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});


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
    $(".btn").css("pointer-events", "none");

    gamePattern.forEach((color, i) => {
        setTimeout(() => {
            animatePress(color);
            playSound(color);

            if (i === gamePattern.length - 1) {
                setTimeout(() => {
                    if (started) {
                        $(".btn").css("pointer-events", "auto");
                    }
                }, 300);
            }
        }, i * 600);
    });
}


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }

    } else {
        gameOver();
    }
}


function gameOver() {
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over!");
    $("h2").removeClass("visibility").text("Press Restart");

    started = false;

    $(".btn").css("pointer-events", "none");
}


function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("assets/sounds/" + name + ".mp3");
    audio.play();
}
