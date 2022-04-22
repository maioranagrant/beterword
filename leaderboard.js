const table = document.getElementById("board");
const app = firebase.initializeApp(firebaseConfig);
var arr = new Array();

fillTable();

function fillTable()
{

    firebase.database().ref("week1scores").orderByChild("score").on('value', function(snap){

        snap.forEach(function(childNodes){
     
           //This loop iterates over children of user_id
           //childNodes.key is key of the children of userid such as (20170710)
           //console.log(childNodes.val().score);
            const dict = 
            {
                first : childNodes.val().firstName,
                last : childNodes.val().lastname,
                score : childNodes.val().score,
                number : childNodes.val().numcorrect,
                celer : childNodes.val().celerity,
                
            };
            //console.log(childNodes.val().username);
            //console.log(childNodes.val().numcorrect);
            arr.push(dict);
            //console.log(arr.length);
            //childNodes.val().name;
            //childNodes.val().time;
            //childNodes.val().rest_time;
            //childNodes.val().interval_time;
     
     
       });
       //console.log(arr[0]["number"]);
       arr.reverse();
       fillTableHtml(arr);

     });

    
     
     //console.log(arr[0]);
     //fillTableHtml();
    }

function fillTableHtml(ar)
{
    
    for (var i = 0; i < ar.length; i++)
    {
       var row = table.insertRow(i+1);
       var rank = row.insertCell(0);
       var name = row.insertCell(1);
       var score = row.insertCell(2);
       var numCorrect = row.insertCell(3);
       var celer = row.insertCell(4);

       rank.innerHTML = i+1;
       name.innerHTML = ar[i]["first"] + " " + ar[i]["last"];
       score.innerHTML = ar[i]["score"];
       numCorrect.innerHTML = ar[i]["number"]; 
       celer.innerHTML = ar[i]["celer"];
    }
}

function returnToHome()
{
    window.location.replace('home.html');
}