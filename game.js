const buttonColours = ["red", "blue", "green", "yellow"]; 
var gamePattern = []; 
// generate random number for next sequence
function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4); 
    var randomChosenColour = buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour);
    
    // jQuery to select the chosen color
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); 
    playSound(randomChosenColour); 
}

function playSound(color){
    var path = "sounds/"; 
    var file = ".mp3"; 
    if (color == "red" || color == "blue" 
        || color == "green" || color == "yellow"){
        var audio = new Audio(path + color + file); 
    }else{
        var audio = new Audio(path + "wrong" + file);
    }
    audio.play(); 
}
