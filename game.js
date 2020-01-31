$(document).ready(function() {

  var gamePattern = [];
  var userClickedPattern = [];
  var level = 0;
  var started = false;

  $(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer();
  });

  $(document).keydown(function() {
    if (level == 0) {
      started = true;
      $("#level-title").text("Level " + level);
      nextSequence();
    }
  });

  function nextSequence() {
    var buttonColors = ["red", "blue", "green", "yellow"];
    var randomChosenColor = buttonColors[Math.floor((Math.random() * 4))];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn("100").fadeOut("100").fadeIn("100");
    playSound(randomChosenColor);
    level++;
    $("#level-title").text("Level " + level);
  }

  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

  function checkAnswer() {
    if (userClickedPattern.length == gamePattern.length) {
      for (var x = 0; x < gamePattern.length; x++) {
        if (gamePattern[x] !== userClickedPattern[x]) {
          playSound("wrong");
          $("body").addClass("game-over");
          setTimeout(function() {
            $("body").removeClass("game-over");
          }, 200);
          resetGame();
          break;
        }
      }

      if (started == true) {
        setTimeout(nextSequence(), 1000);
        userClickedPattern = [];
      }
    }
  }

  function resetGame() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = false;
    $("#level-title").text("Game Over, Press Any Key to Restart");
  }
});
