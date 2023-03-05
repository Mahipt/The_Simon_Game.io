const buttonColours = ["red", "blue", "green", "yellow"]; 
var gamePattern = []; 
var userClickedPattern = []; 
var start = false;
var level = 0; 

var curUserInd = 0; 

// detect click (this is the main function of the whole game)
$(".btn").click(function (event){
    var userChosenColour = $(this).attr("id"); 
    userClickedPattern.push(userChosenColour); 
    // make sound for the color it push
    playSound(userChosenColour); 
    animatePress(userChosenColour); 
    // check the current sequence
    check_answer(userChosenColour); 
}); 

function check_answer(userChosenColour){
    // error guard
    if (curUserInd >= gamePattern.length) {
        // user enter wrong sequence 
        $("body").addClass("game-over"); 
        playSound("wrong"); 
        setTimeout(function (){
            $("body").removeClass("game-over"); 
        }, 200); 
        // prepare to start a new game
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();  
    }
    // start checking
    if (userChosenColour === gamePattern[curUserInd]){
        // check whether it's the last element
        if (curUserInd === gamePattern.length - 1){
            setTimeout(nextSequence, 1000); 
        }else{
            curUserInd++; 
        }
    }else{
        // user enter wrong sequence 
        $("body").addClass("game-over"); 
        playSound("wrong"); 
        setTimeout(function (){
            $("body").removeClass("game-over"); 
        }, 200); 
        // prepare to start a new game
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver(); 
    }
}

function startOver(){
    // prepare to start over
    level = 0; 
    gamePattern = []; 
    curUserInd = 0; 
    start = false; 
}

// detect keyboard (start and end of the game)
$("body").keydown(function(event){
    // start a new game
    if (!start){
        // initialize all variable
        level = 0; 
        curUserInd = 0; 
        nextSequence(); 
        $("h1").text("Level " + level); 
        start = true; 
    }
}); 

// generate random number for next sequence
function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4); 
    var randomChosenColour = buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour);
    
    // jQuery to select the chosen color
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); 
    playSound(randomChosenColour); 

    // zerolize variable for next cycle
    curUserInd = 0; 
    userClickedPattern = []; 

    // update current level
    level++; 
    $("h1").text("Level " + level); 
}

function playSound(name){
    var path = "sounds/"; 
    var file = ".mp3"; 
    if (name == "red" || name == "blue" 
        || name == "green" || name == "yellow"){
        var audio = new Audio(path + name + file); 
    }else{
        var audio = new Audio(path + "wrong" + file);
    }
    audio.play(); 
}

function animatePress(currentColour){
    var colorClass = "." + currentColour; 
    $(colorClass).addClass("pressed"); 
    setTimeout(function(){
    $(colorClass).removeClass("pressed"); 
    }, 100); 
}
