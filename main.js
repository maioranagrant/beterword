//console.log("code is being run as it were so to speak if you will easton sucks");
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

var givenAnswerArr;
var celerArr;
var scoreArr;

function initCode()
{
    const app = firebase.initializeApp(firebaseConfig);

    
    user = JSON.parse(localStorage.getItem("user"));
    if (user === null)
    {
        window.location.replace(index.html);
    }

    const pageAccessedByReload = (
        (window.performance.navigation && window.performance.navigation.type === 1) ||
          window.performance
            .getEntriesByType('navigation')
            .map((nav) => nav.type)
            .includes('reload')
      );
      
    if(pageAccessedByReload)
    {
        alert("You have already played this week's Beterword! Laf!\n If this is a mistake, please email maioranagrant@gmail.com");
        window.location.replace('home.html');
    }

    var newUserRef1 = firebase.database().ref("openedweek7/" + user["eml"]);
    newUserRef1.update ({
        "name": user["eml"],
        });
    

    totalScore = 0;
    totalCel = 0;
    totalCorrect = 0;
    
    tossupNum = 0;
    lastAnswer; 
    files = new Array();
    answers = new Array();
    givenAnswerArr = new Array();
    celerArr = new Array();
    scoreArr = new Array();
    
    correctsound = new Audio('correct.mp3');
    incorrectsound = new Audio('incorrect.mp3');
    buzzsound = new Audio('buzz.mp3');
    
    document.getElementById("tossupNumP").innerText = "Tossup 1 of 20";

    firebase.database().ref('week7answers').on('value', function(snap){
        
        snap.forEach(function(childNodes){
            answers.push(childNodes.val());
        });
    });

    
    NextButton = document.getElementById("nextButton");
    EnterAnswer = document.getElementById("enterAnswer");
    CorrectDisplay = document.getElementById("correctDisplay");
    CelerityDisplay = document.getElementById("celerityDisplay");
    ScoreDisplay = document.getElementById("scoreDisplay");
    BuzzButton = document.getElementById("buzzButton");
    StartTossupButton = document.getElementById("startButton");

    //document.getElementById("finaldiv").style.visibility = "hidden";

    
    // console.log(user["eml"]);
    // console.log(user);

    for(let i = 0; i < 20; i++)
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
    document.getElementById("enterButton").disabled = false;
    tossupNum++;
    document.getElementById("tossupNumP").innerText = "Tossup " + (tossupNum+1) + " of 20";
    NextButton.disabled = true;
    document.getElementById("answer").value = "";
    hide(EnterAnswer);
    hide(CorrectDisplay);
    hide(CelerityDisplay);
    hide(ScoreDisplay);
    StartTossupButton.disabled = false;
    BuzzButton.disabled = true;
    
    var i = 0;

    var elem = document.getElementById("prog");
    var newValue = ((tossupNum+1)/20) * 100;
    elem.setAttribute("style", "width: " + newValue.toString() + "%");
    

}
function evaluateAnswer()
{
    document.getElementById("enterButton").disabled = true;
    var deltaTime = nowTime - startTime;
    var celer = 1.0 - ((deltaTime/1000.0) / audio.duration);
    if (celer < 0)
    {
        celer = 0;
    }
    var score = Math.round(10 + (10 * celer));
    celerArr.push(celer);
    scoreArr.push(score);

    var correct;
    var valids = JSON.parse(JSON.stringify(answers[tossupNum.toString()]));
    for (var pp  = 0; pp < valids.length; pp++)
    {
        valids[pp] = valids[pp].toLowerCase();
        valids[pp] = valids[pp].replace(/\s+/g, "");
    }
    if (valids.indexOf(document.getElementById("answer").value.toLowerCase().replace(/\s+/g, "")) != -1)
    {
        correct = true;
    }
    else
    {
        correct = false;
    }

    givenAnswerArr.push(document.getElementById("answer").value + "|" + correct.toString());

    if (correct)
    {
        lastAnswer = true;
        correctsound.muted = false;
        correctsound.play();
        CorrectDisplay.innerHTML = "Correct!";
        show(CorrectDisplay);
        show(CelerityDisplay);
        show(ScoreDisplay);

        totalScore += score;
        totalCorrect++;
        totalCel = totalCel + celer;

        
        celer = celer.toFixed(3)
        ScoreDisplay.innerHTML = "Tossup Score: " + score  + "<br>" + "Total score: " + totalScore;
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
        var correctstring = "";
        var validAnswersArray = answers[tossupNum];
        for (var ct = 0; ct < validAnswersArray.length; ct++)
        {
            correctstring += validAnswersArray[ct];
            if (ct != (validAnswersArray.length - 1))
            {
                correctstring += ", ";
            }
            
        }
        CelerityDisplay.innerHTML = "Correct answers: " + correctstring + "<br>" + "<br>" + "Please note: all responses will be reviewed before scores are finalized.";
    }
    show(NextButton);
    NextButton.disabled = false;


    if (tossupNum == 19)
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
    var newUserRef = firebase.database().ref("week7scores/" + user["eml"]);

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
        "numcorrect":totalCorrect,
        "answerArr":givenAnswerArr,
        "scoreArr":scoreArr,
        "celerArr":celerArr,
        "pending":"true"
        });

        //document.getElementById("maindiv").style.visibility = "hidden";
        document.getElementById("finaldiv").style.visibility = "visible";
        NextButton.disabled = true;
    StartTossupButton.disabled = true;
    BuzzButton.disabled = true;
    document.getElementById("enterButton").disabled = true;
        //hide(NextButton);
        document.getElementById("finalDisplay").innerHTML = "Total Score: " + totalScore + "<br>" + "Avg. Correct Celerity: " + c.toFixed(3) + "<br>" +"# of Questions Correct: " + totalCorrect + "<br>" + "<br>" + "<strong>Be sure to check out the new Best Buzzes page!</strong><br>Please note: all responses will be reviewed before scores are finalized.";

}
function exitGame()
{
    
    window.location.replace('leaderboard.html');
}
