let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
// Start game
$(document).on("keypress", function (event) { 
    if(!started){
     if(event.which == 13){
     
         $("#level-title").text("Level " + level);
         nextSequence();
         started = true;
      }
    }
 });

  
//--------------------------------------


$(".btn").click(function(){
   let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

//--------------------------------------


// check if you r right
let audioGameover = new Audio("sounds/wrong.mp3");
function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function (){
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        // game over
        audioGameover.play();

        $(".mainContainer").addClass("game-over");
        setTimeout(function(){
        $(".mainContainer").removeClass("game-over");
        }, 200)
        $("#level-title").text("Game Over, Press Enter to Restart the Game"); 

        startOver();
    }
} 

// color generator
function nextSequence(){
    userClickedPattern = [];
    level++;
    
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
 
    playSound(randomChosenColour);
    
}
// sound generator to the color
function playSound(name) {
    // animate a flash to the button and sound
    $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100).click(function (){
        let audio1 = new Audio("sounds/" + name + ".mp3");
        audio1.play();
       })
    let audio2 = new Audio("sounds/" + name + ".mp3");
    audio2.play();
}

//--------------------------------------
// shadow animation on click
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function (){
        $("#" + currentColour).removeClass("pressed")
    }, 100);

}
//--------------------------------------
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    $(document).on("keypress", function (event) { 
        if(!started){
         if(event.which == 13){
         
             $("#level-title").text("Level " + level);
             nextSequence();
             started = true;
          }
        }
     });
  }
  