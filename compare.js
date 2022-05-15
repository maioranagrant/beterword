

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
    var result = user["eml"];
    var found = false;
    console.log(result);
    firebase.database().ref('openedweek4').on('value', function(snap){
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
            window.location.replace('leaderboard.html');
        }
    });
}
function reset()
{
    document.getElementById("enterPlayers").disabled = false;
    document.getElementById("clear").disabled = true;
    const col1 = document.getElementById("col1");
    const col2 = document.getElementById("col2");
    col1.innerHTML =  "";
    col2.innerHTML = "";
    first = document.getElementById("name1");
    first.value = "";
    second = document.getElementById("name2");
    second.value = "";
}
function returnToLeaderboard()
{
    window.location.replace('leaderboard.html');
}

function startComp()
{
    document.getElementById("enterPlayers").disabled = true;
    document.getElementById("clear").disabled = false;
    const col1 = document.getElementById("col1");
    const col2 = document.getElementById("col2");
    first = document.getElementById("name1");
    var n1 = first.value;
    n1 = n1.replace(/\s+/g, "").toLowerCase();
    second = document.getElementById("name2");
    var n2 = second.value;
    n2 = n2.replace(/\s+/g, "").toLowerCase();
    var username1 = "";
    var username2 = "";


    firebase.database().ref("week" + localStorage.getItem("week") + "scores").on('value', function(snap){

        snap.forEach(function(childNodes){
     
            if (childNodes.val().firstName === "placeholder")
            {
                'pass';
            }
            else
            {
            var saveName = childNodes.val().firstName + " "  + childNodes.val().lastname;
            var foundName = childNodes.val().firstName + childNodes.val().lastname;
            foundName = foundName.replace(/\s+/g, "").toLowerCase();

            if (foundName === n1)
            {
                username1 = childNodes.val().username;
                const header = document.createElement("h3");
                header.innerHTML = saveName;
                header.style = "padding-left:50px";

                col1.appendChild(header);
                var arr = new Array();
                var pts = new Array();
                var cels = new Array();
                counter = 0;
                firebase.database().ref("week" + localStorage.getItem("week") + "scores/" + username1 + "/answerArr").on('value', function(snap){
        
                    snap.forEach(function(childNodes){
                        arr.push(childNodes.val().split("|",1));
                    });
                });

                firebase.database().ref("week" + localStorage.getItem("week") + "scores/" + username1 + "/scoreArr").on('value', function(snap){
        
                    snap.forEach(function(childNodes){
                        pts.push(childNodes.val());
                    });
                });
                firebase.database().ref("week" + localStorage.getItem("week") + "scores/" + username1 + "/celerArr").on('value', function(snap){
        
                    snap.forEach(function(childNodes){
                        cels.push(childNodes.val());
                    });
                });

                for (var i = 0; i < 20; i++)
                {
                    const row = document.createElement("tr");
                    const item = document.createElement("td");
                    item.innerHTML = arr[i];
                    const item1 = document.createElement("td");
                    item1.innerHTML = pts[i];
                    const item2 = document.createElement("td");
                    item2.innerHTML = cels[i].toFixed(3);
                    item.style = "padding-left:20px;"
                    item1.style = "padding-left:20px;"
                    item2.style = "padding-left:50px";
                    
                    item.align = "right";

                    row.appendChild(item2);
                    row.appendChild(item1);
                    row.appendChild(item);
                    col1.appendChild(row);
                } 
                
            }
            else if (foundName === n2)
            {
                username2 = childNodes.val().username;
                const header = document.createElement("h3");
                header.innerHTML = saveName;
                header.style = "padding-left:50px;"
                col2.appendChild(header);
                var arr = new Array();
                var pts = new Array();
                var cels = new Array();
                counter = 0;
                firebase.database().ref("week" + localStorage.getItem("week") + "scores/" + username2 + "/answerArr").on('value', function(snap){
        
                    snap.forEach(function(childNodes){
                        arr.push(childNodes.val().split("|",1));
                    });
                });

                firebase.database().ref("week" + localStorage.getItem("week") + "scores/" + username2 + "/scoreArr").on('value', function(snap){
        
                    snap.forEach(function(childNodes){
                        pts.push(childNodes.val());
                    });
                });
                firebase.database().ref("week" + localStorage.getItem("week") + "scores/" + username2 + "/celerArr").on('value', function(snap){
        
                    snap.forEach(function(childNodes){
                        cels.push(childNodes.val());
                    });
                });

                for (var i = 0; i < 20; i++)
                {
                    // const row = document.createElement("p");
                    // row.innerHTML =  + " " + pts[i] + " " +  cels[i];
                    // row.style = "padding-left:50px";
                    // col2.appendChild(row);
                    const row = document.createElement("tr");
                    const item = document.createElement("td");
                    item.innerHTML = arr[i];
                    const item1 = document.createElement("td");
                    item1.innerHTML = pts[i];
                    const item2 = document.createElement("td");
                    item2.innerHTML = cels[i].toFixed(3);
                    item.style = "padding-left:50px;"
                    item1.style = "padding-left:20px;"
                    item2.style = "padding-left:20px;"
                    row.appendChild(item);
                    row.appendChild(item1);
                    row.appendChild(item2);
                    col2.appendChild(row);


                } 
            }
            }
       });


     });

}

