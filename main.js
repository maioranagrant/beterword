console.log("code is being run as it were so to speak if you will easton sucks");
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
var correctsound;
var incorrectsound;
var buzzsound;

var NextButton;
var EnterAnswer;
var CorrectDisplay;
var CelerityDisplay;
var ScoreDisplay;
var BuzzButton;
var StartTossupButton;

var totalScore;
var totalCel = 0;
var totalCorrect;
var user;

function initCode()
{
    const app = firebase.initializeApp(firebaseConfig);
    totalScore = 0;
    totalCel = 0;
    totalCorrect = 0;
    localStorage.getItem("user");
    tossupNum = 0;
    lastAnswer; 
    files = new Array();
    answers = new Array();
    
    correctsound = new Audio('correct.mp3');
    incorrectsound = new Audio('incorrect.mp3');
    buzzsound = new Audio('buzz.mp3');
    
    answers[0] = 'American Gothic';
    answers[1] = 'Tchaikovsky';
    answers[2] = 'Oxidation';
    answers[3] = 'Melville';
    answers[4] = 'Bolivar';
    
    NextButton = document.getElementById("nextButton");
    EnterAnswer = document.getElementById("enterAnswer");
    CorrectDisplay = document.getElementById("correctDisplay");
    CelerityDisplay = document.getElementById("celerityDisplay");
    ScoreDisplay = document.getElementById("scoreDisplay");
    BuzzButton = document.getElementById("buzzButton");
    StartTossupButton = document.getElementById("startButton");

    //document.getElementById("finaldiv").style.visibility = "hidden";

    user = JSON.parse(localStorage.getItem("user"));
    // console.log(user["eml"]);
    // console.log(user);

    for(let i = 0; i < 5; i++)
    {
        files[i] = new Audio('Tossups\\' + (i+1).toString() + '.mp3');
    }
    
    NextButton.disabled = true;
    BuzzButton.disabled = true;
}


function playTossup()
{
    audio = files[tossupNum];
    audio.muted = false;
    audio.play();
    startTime = Date.now();
    StartTossupButton.disabled = true;
    NextButton.disabled = true;
    BuzzButton.disabled = false;
}
function buzz()
{
    nowTime = Date.now();
    audio.pause();
    buzzsound.muted = false;
    buzzsound.play();
    show(EnterAnswer);
    BuzzButton.disabled = true;

}
function nextTossup()
{
    tossupNum++;
    NextButton.disabled = true;
    document.getElementById("answer").value = "";
    hide(EnterAnswer);
    hide(CorrectDisplay);
    hide(CelerityDisplay);
    hide(ScoreDisplay);
    StartTossupButton.disabled = false;
    BuzzButton.disabled = true;
    

}
function evaluateAnswer()
{
    if (document.getElementById("answer").value.toLowerCase() == (answers[tossupNum].toLowerCase()))
    {
        lastAnswer = true;
        correctsound.muted = false;
        correctsound.play();
        CorrectDisplay.innerHTML = "Correct!";
        show(CorrectDisplay);
        show(CelerityDisplay);
        show(ScoreDisplay);

        var deltaTime = nowTime - startTime;
        var celer = 1.0 - ((deltaTime/1000.0) / audio.duration);
        
        var score = Math.round(10 + (10 * celer));

        totalScore += score;
        totalCorrect++;
        totalCel = totalCel + celer;

        if (celer < 0)
        {
            celer = 0;
        }
        celer = celer.toFixed(3)
        ScoreDisplay.innerHTML = "Tossup Score: " + score + " points" + "<br>" + "Total score: " + totalScore;
        CelerityDisplay.innerHTML = "Celerity: " + celer;
    }
    else
    {
        incorrectsound.muted = false;
        incorrectsound.play();
        lastAnswer = false;
        CorrectDisplay.innerHTML = "Incorrect!";
        show(CorrectDisplay);
        show(CelerityDisplay);
        CelerityDisplay.innerHTML = "Correct answer: " + answers[tossupNum];
    }
    show(NextButton);
    NextButton.disabled = false;


    if (tossupNum == 4)
    {
        endGame();
    }
    
}
/*
    @parem domElement element from dom to be set to hidden or visible
    Ensures that visiblity is switched from hidden to visble or vice verse 
*/
function changeVisibilty(domElement){ //pant is sus
    if(domElement.style.visibility == "hidden"){
        domElement.style.visibility = "visible"
    }
    else{
        domElement.style.visibility = "hidden";
    }
}

/*
    @parem domElement element from dom to be set to hidden 
    Ensures that visiblity is set to hidden
*/
function hide(domElement){
    domElement.style.visibility = "hidden";
}
/*
    @parem domElement element from dom to be set to hidden 
    Ensures that visiblity is set to visible
*/
function show(domElement)
{
    domElement.style.visibility = "visible";
}

function endGame()
{
    var newUserRef = firebase.database().ref("week1scores/" + user["eml"]);

        var c;
        if (totalCorrect == 0)
        {
            c = 0;
        }
        else
        {
            console.log(totalCel);
            console.log(totalCorrect);
            c = totalCel/totalCorrect;
        }
        newUserRef.update ({
        "username": user["eml"],
        "firstName":user["first"],
        "lastname":user["last"],
        "celerity":c,
        "score":totalScore,
        "numcorrect":totalCorrect
        });

        //document.getElementById("maindiv").style.visibility = "hidden";
        document.getElementById("finaldiv").style.visibility = "visible";
        NextButton.disabled = true;
    StartTossupButton.disabled = true;
    BuzzButton.disabled = true;
    document.getElementById("enterButton").disabled = true;
        //hide(NextButton);
        document.getElementById("finalDisplay").innerHTML = "Total Score: " + totalScore + "<br>" + "Avg. Correct Celerity: " + c.toFixed(3) + "<br>" +"# of Questions Correct: " + totalCorrect;

}
function exitGame()
{
    
    window.location.replace('leaderboard.html');
}
