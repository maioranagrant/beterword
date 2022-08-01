const table = document.getElementById("board");
const app = firebase.initializeApp(firebaseConfig);
var arr = new Array();


if( document.readyState !== 'loading' ) {
    var w = localStorage.getItem("week");
        if (w === null)
        {
            w = 15;
        }
        fillTable(w);
    
} else {
    document.addEventListener('DOMContentLoaded', function () {
        var w = localStorage.getItem("week");
        if (w === null)
        {
            w = 15;
        }
        fillTable(w);
    });
}

async function fillTable(week)
{
    if (week == 9)
    {
        document.getElementById("header").innerText = "Beterword Science Special Leaderboard";
    }
    else
    {
        document.getElementById("header").innerText = "Beterword Week " + week + " Leaderboard";
    }
    
    const dbb = firebase.database().ref("week" + localStorage.getItem("week") + "scores").orderByChild("score");
    await dbb.once('value', function(snap){

        snap.forEach(function(childNodes){
     
            if (childNodes.val().firstName === "placeholder")
            {
                'pass';
            }
            else
            {
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
                pending: childNodes.val().pending
                
            };
            //console.log(childNodes.val().username);
            //console.log(childNodes.val().numcorrect);
            arr.push(dict);
            //console.log(arr.length);
            //childNodes.val().name;
            //childNodes.val().time;
            //childNodes.val().rest_time;
            //childNodes.val().interval_time;
     
        }
       });
       //console.log(arr[0]["number"]);
       arr.reverse();
       fillTableHtml(arr);

     });

    
     
     //console.log(arr[0]);
     //fillTableHtml();
    }


function setPlayerData(joe)
{
    console.log(joe);
    localStorage.setItem("playerToSearch",joe);
    window.location.replace('stats.html');
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
       var pend = row.insertCell(5);

       rank.innerHTML = i+1;
       poop = document.createElement("a");
       poop.innerHTML = "<a style=\"color: #000000; text-decoration: none\";>" + ar[i]['first'] + ' ' + ar[i]['last'] + "</a>";
       poop.href = "#";
       //poop.setAttribute('onclick','setPlayerData(' + poop.textContent + ');');
       
       poop.onclick = function(){localStorage.setItem("playerToSearch",this.textContent);window.location.replace('stats.html');};
       name.appendChild(poop);
       
       score.innerHTML = ar[i]["score"];
       numCorrect.innerHTML = ar[i]["number"]; 
       celer.innerHTML = ar[i]["celer"].toFixed(3);
       pend.innerHTML = ar[i]["pending"];
       row.style = "padding-left: 50px;";
    }
}

// function sortTable(str)
// {
//     var head = table.rows[0];
//     for (var i = 1, row; row = table.rows[i]; i++)
//     {
//         console.log(row.cells[0].innerHTML);
//     }
// }
function sortTable(num) {
    var button = document.getElementById("sort" + num.toString());
    button.setAttribute("data-order",1-button.getAttribute("data-order"));

    //console.log(button.getAttribute("data-order"));
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("board");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        if (button.getAttribute("data-order") == 0)
        {
            x = rows[i].cells[num];
            y = rows[i + 1].cells[num];
        }
        else
        {
            y = rows[i].cells[num];
            x = rows[i + 1].cells[num];
        }
        // Check if the two rows should switch place:
        if (num == 2 || num == 3)
        {
            if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
              }
        }
        else if (num == 0)
        {
            if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
              }
        }
        else if (num == 1)
        {
            if ((x.innerHTML).toLowerCase() > (y.innerHTML).toLowerCase()) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
              }
        }
        else
        {
            if (parseFloat(x.innerHTML) < parseFloat(y.innerHTML)) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
              }
        }
        
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }

function launchComp()
{
    user =  JSON.parse(localStorage.getItem("user"));
    var result = user["eml"];
    var found = false;
    firebase.database().ref('openedweek15').on('value', function(snap){
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
            window.location.replace("compare.html");
        }
        else
        {
            return;
        }
    });
    
}

function goToBest()
{
    window.location.replace('bestbuzzes.html');
}

function changeWeek(week)
{
    localStorage.setItem("week",week);
    location.reload();
  
    // if (week == 1)
    // {
    //     document.getElementById("1button").disabled = true;
    //     document.getElementById("2button").disabled = false;
    // }
    // else if (week == 2)
    // {
    //     document.getElementById("1button").disabled = false;
    //     document.getElementById("2button").disabled = true;
    // }

    // firebase.database().ref("week" + week + "scores").orderByChild("score").on('value', function(snap){

    //     snap.forEach(function(childNodes){
     
    //         if (childNodes.val().firstName === "placeholder")
    //         {
    //             'pass';
    //         }
    //         else
    //         {
    //        //This loop iterates over children of user_id
    //        //childNodes.key is key of the children of userid such as (20170710)
    //        //console.log(childNodes.val().score);
    //         const dict = 
    //         {
    //             first : childNodes.val().firstName,
    //             last : childNodes.val().lastname,
    //             score : childNodes.val().score,
    //             number : childNodes.val().numcorrect,
    //             celer : childNodes.val().celerity,
    //             pending: childNodes.val().pending
                
    //         };
    //         //console.log(childNodes.val().username);
    //         //console.log(childNodes.val().numcorrect);
    //         arr.push(dict);
    //         //console.log(arr.length);
    //         //childNodes.val().name;
    //         //childNodes.val().time;
    //         //childNodes.val().rest_time;
    //         //childNodes.val().interval_time;
     
    //     }
    //    });
    //    //console.log(arr[0]["number"]);
    //    arr.reverse();
    //    fillTableHtml(arr);

    //  });
}

function returnToHome()
{
    window.location.replace('home.html');
}

function goToStats()
{
    localStorage.removeItem("playerToSearch");
    window.location.replace('stats.html');

}