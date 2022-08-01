const app = firebase.initializeApp(firebaseConfig);

async function startGame(week)
{
    
    var found = false;
    user =  JSON.parse(localStorage.getItem("user"));
    if (user === null)
    {
        window.location.replace("index.html");
    }
    //console.log(user["eml"]);
    var result = user["eml"];
    //console.log()
    const dbbb = firebase.database().ref('openedweek15');
    await dbbb.once('value', function(snap){
        
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
            alert("You have already played this week's Beterword! Laf");
            return;
        }
        else
        {
            window.location.replace('second.html');
        }
        });
        //console.log(found);
        
    
}
function logOut()
{
    user = null;
    localStorage.removeItem("user");
    window.location.replace('index.html');
}
function viewLeaderBoard()
{
    window.location.replace('leaderboard.html');
}