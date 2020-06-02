var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern=[],level=0,started=false;
;

function nextSequence() {
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){$("#"+currentColour).removeClass("pressed");},100);
}
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel-1]===gamePattern[currentLevel-1]){
    console.log("success");
    if(currentLevel===gamePattern.length){
      setTimeout(nextSequence(),1000);
    }
  }
  else{
    console.log("fail");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function startOver(){
  level=0; started=false;
  gamePattern = [];
}
$(".btn").click(function() {
    userClickedPattern.push(this.id);
    console.log(userClickedPattern);
    animatePress(this.id);
    playSound(this.id);
    checkAnswer(userClickedPattern.length);
});
$(document).keydown(function(){
  if(!started){
    nextSequence();
    started=true;
  }
});
