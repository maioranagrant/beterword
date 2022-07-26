const app = firebase.initializeApp(firebaseConfig);
if( document.readyState !== 'loading' ) {
    
    main();
} else {
    document.addEventListener('DOMContentLoaded', function () {
       
        main();
    });
}

function main()
{
    document.getElementById("clear").disabled = true;
    
    if (localStorage.getItem("playerToSearch") === null)
    {
        'pass';
    }
    else
    {
        search();
    }
    
}
async function search()
{
    document.getElementById("clear").disabled = false;
    document.getElementById("enterPlayers").disabled = true;

    var name = document.getElementById("name1").value;

    if (localStorage.getItem("playerToSearch") === null)
    {
        'pass';
    }
    else
    {
        name = localStorage.getItem("playerToSearch");
        document.getElementById("name1").value = name;
    }

    
    
    name = name.replace(" ","");
    name = name.toLowerCase();

    //console.log(name);

    arr = new Array();
    const dbb = firebase.database().ref("users");
    await dbb.once('value', function(snap){

        snap.forEach(function(childNodes){
            foundName = childNodes.val().firstName + childNodes.val().lastname;
            foundName = foundName.replace(" ","");
            foundName = foundName.toLowerCase();
            if (childNodes.val().firstName === "placeholder")
            {
                'pass';
            }
            else
            {
           
                if (foundName == name)
                {
                    arr.push(childNodes.val().username);
                }
        }
       });


     });
     
     
     for (var i = 0; i < arr.length; i++)
     {
        weeksPlayed = 0;
        celsArr = new Array();
        ptsArr = new Array();
        numCArr = new Array();

        numPlayersArr = new Array();
        placementsArr = new Array();

        ogName = "";
        playerCount = 0;
        playerPlacement = -1;
        for (var e = 1; e <= 14; e++)
        {
            const dbb = firebase.database().ref("week" + e + "scores").orderByChild("score");
            await dbb.once("value", function(snap){

                snap.forEach(function(childNodes){
                    playerCount++;
                    foundName = childNodes.val().firstName + childNodes.val().lastname;
                    foundName = foundName.replace(" ","");
                    foundName = foundName.toLowerCase();
                    if (childNodes.val().firstName === "placeholder")
                    {
                        'pass';
                    }
                    else
                    {
                        
                        if (childNodes.val().username == arr[i])
                        {
                            playerPlacement = playerCount;
                            ogName = childNodes.val().firstName + " " + childNodes.val().lastname;
                            weeksPlayed++;
                            celsArr[e-1] = childNodes.val().celerity;
                            ptsArr[e-1] = childNodes.val().score;
                            numCArr[e-1] = childNodes.val().numcorrect;
                        }
                }
               });
               
        
            });
            numPlayersArr[e-1] = playerCount;
            placementsArr[e-1] = playerPlacement;
            playerCount = 0;
            playerPlacement = -1;
        }


        const divJoe = document.createElement("div");
        const peter = document.createElement("p");
        peter.innerHTML = "<strong>" + ogName + "</strong>";
        hitmul = "";
        const wP = document.createElement("p");
        
        totSc = 0;
        totCel = 0;
        totNum = 0;
        for (var ccc = 0; ccc < ptsArr.length; ccc++)
        {
            if (celsArr[ccc] === undefined)
            {
                continue;
            }
            console.log(celsArr[ccc]);
            totSc += parseFloat(ptsArr[ccc]);
            totCel += parseFloat(celsArr[ccc]);
            totNum += parseFloat(numCArr[ccc]);
        }
        console.log(totCel);
        avCe = (totCel / parseFloat(weeksPlayed)).toFixed(3);
        avSc = (totSc / parseFloat(weeksPlayed)).toFixed(1);
        avNum = (totNum / parseFloat(weeksPlayed)).toFixed(1);
        

        weekstr = "<br>";
        totalPcts = 0;
        for (var ccc = 0; ccc < ptsArr.length; ccc++)
        {
            if (celsArr[ccc] === undefined)
            {
                continue;
            }
            else
            {
                mog = ccc+1;
                if (placementsArr[ccc] == -1)
                {
                    moog = "";
                }
                else
                {
                    pctile = ((1 - ((numPlayersArr[ccc] - placementsArr[ccc] + 1) / parseFloat(numPlayersArr[ccc]))) * 100).toFixed(0);
                    totalPcts += parseFloat(pctile);
                    console.log(totalPcts);
                    if (pctile == 11 || pctile == 12 || pctile == 13)
                    {
                        suffix = "th";
                    }
                    else if (pctile % 10 == 1)
                    {
                        suffix = "st";
                    }
                    else if (pctile % 10 == 2)
                    {
                        suffix = "nd";
                    }
                    else if (pctile % 10 == 3)
                    {
                        suffix = "rd";
                    }
                    else
                    {
                        suffix = "th";
                    }
                    moog = ", " + (numPlayersArr[ccc] - placementsArr[ccc] + 1) + "/" + numPlayersArr[ccc] + ", " + pctile + suffix + " percentile";
                }
                
                weekstr += "Week " + mog + ": " + numCArr[ccc] + " correct, " + ptsArr[ccc] + " points, " + celsArr[ccc].toFixed(3) + " celerity" + moog + "<br>";
            }

        }
        avgPctile = (totalPcts / weeksPlayed).toFixed(0);
        if (avgPctile == 11 || avgPctile == 12 || avgPctile == 13)
        {
            suffix = "th";
        }
        else if (avgPctile % 10 == 1)
        {
            suffix = "st";
        }
        else if (avgPctile % 10 == 2)
        {
            suffix = "nd";
        }
        else if (avgPctile % 10 == 3)
        {
            suffix = "rd";
        }
        else
        {
            suffix = "th";
        }


        hitmul += "Weeks Played: " + weeksPlayed;
        hitmul += "<br>Average Score: " + avSc;
        hitmul += "<br>Average Correct Celerity: " + avCe;
        hitmul += "<br>Average Questions Correct: " + avNum;
        hitmul += "<br>Average Placement Percentile: " + avgPctile + suffix + "<br><br>";
        hitmul += weekstr;
        hitmul += "<br><br>Total Score: " + totSc;
        hitmul += "<br>Total Questions Correct: " + totNum + "/" + (weeksPlayed * 20) + " (" + ((totNum / (weeksPlayed * 20)).toFixed(3) * 100) + "%)";
        
        wP.innerHTML = hitmul;
        
        divJoe.appendChild(peter);
        divJoe.appendChild(wP);
        document.getElementById("statsdiv").appendChild(divJoe);


     }



}
function createHtml(tus,answers)
{
    for (var l = 0; l < tus.length; l++)
    {
        const p = document.createElement("p");
        var ansString = "";
        for(var q = 0; q < answers[l].length; q++)
        {
            ansString += answers[l][q];
            if (!(q == answers[l].length-1))
            {
                ansString += ", ";
            }
            
        }
        p.innerHTML = tus[l] + "<br>" + "Answers: " + ansString;
        document.getElementById("questionsdiv").appendChild(p);
        
    }
}
function reset()
{
    document.getElementById("statsdiv").innerHTML = "";
    document.getElementById("clear").disabled = true;
    document.getElementById("enterPlayers").disabled = false;

    document.getElementById("name1").value = "";
    localStorage.removeItem("playerToSearch");
}
function returnHome()
{
    window.location.replace('leaderboard.html');
}