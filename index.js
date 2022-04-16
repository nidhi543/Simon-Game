var gamePattern=[];
var userClickedPattern=[];

var buttonColours= ["red", "blue", "green", "yellow"];

var started = false;

var level = 0;
$(document).keypress( function(){
   if(!started){
     $("#level-title").text("Level" + level);
     nextSequence();
     started = true;
   }

});

//Check which button is pressed
$(".btn").click(function (){
    var userChosenColour= $(this).attr("id");   //to store the id of the button that got clicked.
    playSound(userChosenColour); 
    animatePress(userChosenColour); 
    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    });

    // Check the User's Answer Against the Game Sequence
function checkAnswer(lastIndex){
    if(gamePattern[lastIndex] === userClickedPattern[lastIndex]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }
    else{
        console.log("wrong")
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
   
}

function nextSequence(){
// Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber= Math.floor(Math.random()*4);   //0-3  
    var randomChosenColour= buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);

    //to show the user that which color he had to choose
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);  
    playSound(randomChosenColour);


}


// Add Sounds to Button Clicks
function playSound(name){
    var audio= new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Add Animations to User Clicks
function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed");
    },100)
}

function startOver(){
level= 0;
started = false;
gamePattern=[];
}