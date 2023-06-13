var gamePattern = [];
var count1 = 0;
var count2 = 0;
var levelCount = 0;
var randomChosenColour;
var userChosenColour;
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = 0;

function playSound(name1) {
    var audio = new Audio('./sounds/' + name1 + '.mp3');
    audio.play();
}
function animatePress(currentColour) {
    var $currentColour = $('#' + currentColour); // we plan to reuse it so let's cache it!
    $currentColour.addClass('pressed'); // add
    setTimeout(function () {
        $currentColour.removeClass('pressed');  // remove
    }, 100);
}


$(document).on("keypress", function (event) { // FIRST KEYBOARD PRESS DETECTION
    if (started == 0) {
        nextSequence(); //CALLING THE FUNCTION
    };
    started++; 
});

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber] 
    gamePattern[count1] = randomChosenColour; 
    $('#' + randomChosenColour).fadeOut(150).fadeIn(150);
    playSound(randomChosenColour)
    $("h1").text('Level ' + levelCount)
    count1++;
    levelCount++;
    count2 = 0;
    userClickedPattern = [];
}

$(".btn").on("click", function (event) {
    userChosenColour = (event.target.id)
    userClickedPattern[count2] = userChosenColour;
    checkAnswer(userClickedPattern[count2])
    playSound(userChosenColour);
    animatePress(userChosenColour);
    count2++;
});

function checkAnswer(currentLevel) {
    if (count2 == (count1 - 1)) {
        if (currentLevel !== (gamePattern[count2])) {
            gameover();
        }
        else {
            setTimeout(doSomething, 1000);

            function doSomething() {
                nextSequence();
            }

        }
    }
    else {
        if (currentLevel !== (gamePattern[count2])) {
            gameover();
        }
    }
}
function gameover() {
    var wrong = new Audio('./sounds/wrong.mp3');
    wrong.play();
    $("body").addClass('game-over'); // add
    setTimeout(function () {
        $("body").removeClass('game-over');  // remove
    }, 200);
    $("h1").text('Game Over, Press Any Key to Restart')
    startOver();
}
function startOver() {
    started = 0;
    gamePattern = [];
    levelCount = 0;
    count1 = 0;
    count2 = 0;
}