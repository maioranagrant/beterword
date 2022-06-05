

if( document.readyState !== 'loading' ) {
    
    main();
} else {
    document.addEventListener('DOMContentLoaded', function () {
       
        main();
    });
}


function main()
{
    const app = firebase.initializeApp(firebaseConfig);

    const pageAccessedByReload = (
        (window.performance.navigation && window.performance.navigation.type === 1) ||
          window.performance
            .getEntriesByType('navigation')
            .map((nav) => nav.type)
            .includes('reload')
      );
      
    if(pageAccessedByReload)
    {
        alert("Error.");
        window.location.replace('leaderboard.html');
    }

    user =  JSON.parse(localStorage.getItem("user"));
    
    if (user === null)
    {
        window.location.replace("leaderboard.html");
    }
    //console.log(user["eml"]);
    
}
function reset()
{
    document.getElementById("enterPlayers").disabled = false;
    document.getElementById("clear").disabled = true;
    first = document.getElementById("name1");
    first.value = "";
    document.getElementById("joe").innerHTML = "";
}
function returnToLeaderboard()
{
    window.location.replace('leaderboard.html');
}

function startComp()
{
    
    document.getElementById("clear").disabled = false;
    document.getElementById("enterPlayers").disabled = true;
   
    //var n1 = first.value;
    var week = document.getElementById("name1").value;
    week = week.replace(" ","");
    if (week == 7)
    {
        var result = user["eml"];
        var found = false;
    
    firebase.database().ref('openedweek7').on('value', function(snap){
        snap.forEach(function(childNodes){
            if (childNodes.val().name === "placeholder")
            {
                'pass';
            }
            else
            {
            let first = (childNodes.val().name).replace(/\s+/g, "");
            let second = result;
            if (first.toString() === second.toString())
            {
                found = true;
            }
        }
        });
        if (found)
        {
            
        }
        else
        {
            alert("In order to view this week's best buzzes, please complete the game.");
            return;
        }
    });
    if (!found)
    {
        return;
    }
    }
    
    // for (var n1 = 0; n1 < 19; n1++)
    // {
        ansArr1 = new Array();
        firebase.database().ref("week" + week + "answers").on('value',function(snap){
            //ansArr1 = new Array();
            snap.forEach(function(childNodes){
                ansArr1.push(childNodes.val());
            });
        });
        console.log(ansArr1);
        firebase.database().ref("week" + week + "scores").on('value', function(snap){
            topCelsArr = new Array();
            topUsersArr = new Array();
            avgCelsArr = new Array();
            amtCorrectArr = new Array();
            totalplayers = 0;
            for (var n1 = 0; n1 < 20; n1++)
            {
                var topCel = -1.0;
                var topCelUsername = "";
                var usercount = 0;
                var totCel = 0;
                tempcorrect = 0;
                snap.forEach(function(childNodes){
                    
                    if (childNodes.val().username == "placeholder" || childNodes.val().firstName == "placeholder")
                    {
                        topCel = topCel;
                    }
                    else{
                        totalplayers++;
                        if (childNodes.val().answerArr[n1].indexOf('true') != -1)
                        {
                            tempcorrect++;
                            usercount++;
                            totCel += parseFloat(childNodes.val().celerArr[n1]);
                            
                            if (parseFloat(childNodes.val().celerArr[n1]) > topCel)
                            {
                                //console.log(childNodes.val().username);
                                topCel = childNodes.val().celerArr[n1];
                                topCelUsername = childNodes.val().firstName + " " + childNodes.val().lastname;
                            }
                        }
                    }
                
                });
                topCelsArr.push(topCel);
                topUsersArr.push(topCelUsername);
                avgCelsArr.push((totCel/usercount).toFixed(3));
                amtCorrectArr.push(tempcorrect);
            }
            totalplayers = totalplayers/20;
            for (var n2 = 0; n2 < 20; n2++)
            {
                const p = document.createElement("p");
                var string = "<strong>Tossup ";
                string += n2+1 + "</strong>";
                string += "<br>Answers: ";
                for (var n3 = 0; n3 < ansArr1[n2].length; n3++)
                {
                    string += ansArr1[n2][n3];
                    if (n3 != ansArr1[n2].length-1)
                    {
                        string += ", ";
                    }
                    
                }
                string += "<br>Best Buzz: ";
                string += topUsersArr[n2];
                string += " (";
                var f = parseFloat(topCelsArr[n2]);
                f = f.toFixed(3);
                string += f;
                string += " celerity)";
                string += "<br>Field Correct Celerity: "
                string += avgCelsArr[n2];
                string += "<br>";
                var amtCorrect = amtCorrectArr[n2];
                
                string += amtCorrect + "/" + totalplayers + " correct";
                p.innerHTML = string;
                document.getElementById("joe").appendChild(p);
            }

        });
        
    }
    


