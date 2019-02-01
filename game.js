var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var isGameStarted = false;


// only first key press starts the game.
$(document).keypress(function() {
  if (!isGameStarted) {
    isGameStarted = true;
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});


// Player clicks a button
$(".btn").click(function() {
  if (isGameStarted) {
    var userChosenColour = this.getAttribute("id");
    userClickedPattern.push(userChosenColour);
    makeSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }
});

// effect for button when button is clicked.
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() { // time out after 100 ms
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// proceed game.
function nextSequence() {
  $("#level-title").text("Level " + (++level)); // increment level.
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).animate({
    opacity: 0.2
  }, 50).animate({
    opacity: 1
  });

  makeSound(randomChosenColour);

  userClickedPattern = [];
}

// play appropriate sound according to the button
function makeSound(btnColour) {
  var audioLocation = "sounds/" + btnColour + ".mp3";
  switch (btnColour) {
    case "red":
      var red = new Audio(audioLocation);
      red.play();
      break;
    case "blue":
      var blue = new Audio(audioLocation);
      blue.play();
      break;
    case "green":
      var green = new Audio(audioLocation);
      green.play();
      break;
    case "yellow":
      var yellow = new Audio(audioLocation);
      yellow.play();
      break;
    default:
      console.log(btnColour);
  }
}

// Check user's input, compare with the game pattern.
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (currentLevel === (gamePattern.length - 1)) {
      // move on to the next level.
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    isGameStarted = false;
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    startOver();

    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
  }
}

function startOver(){
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}
