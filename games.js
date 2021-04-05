var randomColor=["red", "green", "yellow","blue"];

var gamePattern=[];

var userPattern=[];

var level=0;
//starting a game
var started=false;
$(document).keypress(function(){
  if(!started){
    nextSequence();
    started=true;
  }
});
$(".start_button").click(function(){
  if(!started){
    nextSequence();
    started=true;
  }
});
//checking the answer
function checkAns(current_index){
  if(gamePattern[current_index]===userPattern[current_index]){
    console.log("success");
    if(userPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
    }

    else{
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      level=0;
      started=false;
      gamePattern=[];
      $("#level-title").html("Game Over, Press Any Key to Restart");

    }

}

$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userPattern.push(userChosenColour);
  playSound(userChosenColour);
  pressed(userChosenColour);

  checkAns(userPattern.length-1);
});

function nextSequence(){
  userPattern=[];
  level++;
  $("#level-title").text("level   "+level);
  var no=Math.floor(Math.random()*4);
  var id=randomColor[no];
  // console.log(id);
  gamePattern.push(id);
  playSound(randomColor[no]);
  pressed(randomColor[no]);
}


//animation and sound
function playSound(x){
  var audio=new Audio("sounds/"+x+".mp3");
  audio.play();
}
function pressed(name){
  $("#"+name).addClass("pressed");
  setTimeout(function(){
    $("#"+name).removeClass("pressed");
  },100);
}
