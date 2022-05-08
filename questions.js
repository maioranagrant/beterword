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

    var found = false;
    user =  JSON.parse(localStorage.getItem("user"));
    if (user === null)
    {
        alert("nice try :)");
        window.location.replace("home.html");
    }
    //console.log(user["eml"]);
    var result = user["eml"];
    //console.log()
    firebase.database().ref('week2scores').on('value', function(snap){
        
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
            alert("nice try :)");
        }
        else
        {
            window.location.replace('home.html');
        }
        });

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
    
    var tus = new Array();
    var answers = new Array();
    firebase.database().ref('week2tossups').on('value', function(snap){
        
        snap.forEach(function(childNodes){
            tus.push(childNodes.val());
        });
    });
    firebase.database().ref('week2answers').on('value', function(snap){
        
        snap.forEach(function(childNodes){
            answers.push(childNodes.val());
        });
        createHtml(tus,answers);
    });
    
    
    
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