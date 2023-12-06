var buttonColors =["blue","green","yellow","red"];

var gamePattern=[];

var userClickedPattern=[];

var level=0;

var started=false;

function nextSequence(){
    //increase level;
    userClickedPattern=[];
    level++;
    $("h2").text("Level "+level);
    var randomNumber=Math.ceil(Math.random()*3);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    //jquery animation
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    //js sounds
    playSound(randomChosenColor);
    //animatePress(randomChosenColor);
}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColor){
        $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
        nextSequence();
        }, 900);
    }
    }
    else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h2").text("Game Over!!, Press Any Key Or Touch the orange button to Restart.");

    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 500);

    startOver();
    }
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}
$(document).keypress(function(){
    if(!started){
        nextSequence();
    $("h2").text("Level "+level);
    started=true;
    }
});
$("#start").click(function(){
   if(!started){
      nextSequence();
    $("h2").text("Level "+level);
    started=true;
    }
});

$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");

    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});