

function startGame(week)
{
    const app = firebase.initializeApp(firebaseConfig);
    var found = false;
    user =  JSON.parse(localStorage.getItem("user"));
    //console.log(user["eml"]);
    var result = user["eml"];
    //console.log()
    firebase.database().ref('week1scores').on('value', function(snap){
        
        snap.forEach(function(childNodes){
            let first = (childNodes.val().username).replace(/\s+/g, "");
            let second = result;
            if (first.toString() === second.toString())
            {
                found = true;
            }
        });
        if (found)
        {
            alert("You have already played this week's Beterword! Laf");
            return;
        }
        else
        {
            //window.location.replace('second.html');
        }
        });
        //console.log(found);
        
    
}
function viewLeaderBoard()
{
    window.location.replace('leaderboard.html');
}