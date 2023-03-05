const buttonColours = ["red", "blue", "green", "yellow"]; 
var gamePattern = []; 
var userClickedPattern = []; 
// generate random number for next sequence
function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4); 
    var randomChosenColour = buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour);
    
    // jQuery to select the chosen color
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); 
    playSound(randomChosenColour); 
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

// detect click
$(".btn").click(function (event){
    var userChosenColour = $(this).attr("id"); 
    userClickedPattern.push(userChosenColour); 
    // make sound for the color it push
    playSound(userChosenColour); 
    animatePress(userChosenColour); 
}); 


function animatePress(currentColour){
    var colorClass = "." + currentColour; 
    $(colorClass).addClass("pressed"); 
    setTimeout(function(){
        $(colorClass).removeClass("pressed"); 
    }, 100); 
}