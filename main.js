
if( document.readyState !== 'loading' ) {
    
    initCode();
} else {
    document.addEventListener('DOMContentLoaded', function () {
       
        initCode();
    });
}

var audio;
var lastAnswer;
var tossupNum;
var files;
var answers;
var startTime;
var nowTime;


function initCode()
{
    tossupNum = 0;
    audio;
    lastAnswer; 
    files = new Array();
    answers = new Array();

    
    
    
    answers[0] = 'American Gothic';
    answers[1] = 'Tchaikovsky';
    answers[2] = 'Oxidation';
    answers[3] = 'Melville';
    answers[4] = 'Bolivar';
    
    
    
    for(let i = 0; i < 5; i++)
    {
        files[i] = new Audio('Tossups\\' + (i+1).toString() + '.mp3');
        
        
    }
    document.getElementById("startButton").addEventListener("click",playTossup());
    
    document.getElementById("nextButton").style.visibility = "hidden";
    
    document.getElementById("enterAnswer").style.visibility = "hidden";
    document.getElementById("correctDisplay").style.visibility = "hidden";
    document.getElementById("celerityDisplay").style.visibility = "hidden";
    document.getElementById("scoreDisplay").style.visibility = "hidden";
    document.getElementById("nextButton").disabled = true;
    document.getElementById("buzzButton").disabled = true;
}

function playTossup()
{
    audio = files[tossupNum];
    audio.muted = false;
    audio.play();
    startTime = Date.now();
    document.getElementById("startButton").disabled = true;
    document.getElementById("nextButton").disabled = true;
    document.getElementById("buzzButton").disabled = false;
}
function buzz()
{
    nowTime = Date.now();
    audio.pause();
    
    document.getElementById("enterAnswer").style.visibility = "visible";
    document.getElementById("buzzButton").disabled = true;

}
function nextTossup()
{
    tossupNum++;
    document.getElementById("enterAnswer").style.visibility = "hidden";
    document.getElementById("correctDisplay").style.visibility = "hidden";
    document.getElementById("celerityDisplay").style.visibility = "hidden";
    document.getElementById("scoreDisplay").style.visibility = "hidden";
    document.getElementById("startButton").disabled = false;
    

}
function evaluateAnswer()
{
    if (document.getElementById("answer").value == (answers[tossupNum]))
    {
        lastAnswer = true;
        document.getElementById("correctDisplay").innerHTML = "Correct!";
        document.getElementById("correctDisplay").style.visibility = "visible";
        document.getElementById("celerityDisplay").style.visibility = "visible";
        document.getElementById("scoreDisplay").style.visibility = "visible";

        var deltaTime = nowTime - startTime;
        var celer = 1.0 - ((deltaTime/1000.0) / audio.duration);
        celer = celer.toFixed(3)
        var score = Math.round(10 + (10 * celer));
        if (celer < 0)
        {
            celer = 0;
        }
        document.getElementById("scoreDisplay").innerHTML = "Score: " + score + " points";
        document.getElementById("celerityDisplay").innerHTML = "Celerity: " + celer;
    }
    else
    {
        lastAnswer = false;
        document.getElementById("correctDisplay").innerHTML = "Incorrect!";
        document.getElementById("correctDisplay").style.visibility = "visible";
    }
    document.getElementById("nextButton").style.visibility = "visible";
    document.getElementById("nextButton").disabled = false;



    
}


