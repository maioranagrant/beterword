const emailField = document.getElementById("username-field");
const passwordField = document.getElementById("password-field");
const firstName = document.getElementById("first-field");
const lastName = document.getElementById("last-field");
loginErrorMsg = document.getElementById("error");
var successDisplay = document.getElementById("success");
var goBack = document.getElementById("goBackToLogin");

goBack.style.visibility = "hidden";
loginErrorMsg.style.opacity = 0;
successDisplay.style.visibility = "hidden";

function goBackToLogin()
{
    window.location.replace('index.html');
}

function addToDatabase()
{
    document.getElementById("login-form-submit").disabled = true;
    const app = firebase.initializeApp(firebaseConfig);

    eml = emailField.value;
    pw = passwordField.value;
    first = firstName.value;
    last = lastName.value;

    let result = eml.replace(/\./g, "__dot__");
    // var rootRef = firebase.database().ref('users');
    //     rootRef.on('value', snapshot => {
    //         snapshot.forEach(child => {    
    //             console.log(child.key);
    //             console.log(result);
    //           if (child.key === result)
    //           {
    //                 successDisplay.innerText = "Email is already in use! Laf";
    //                 successDisplay.style.visibility = "visible";
    //               return;
    //           }
    //         });
    //       });

    var found = false;
    firebase.database().ref('users').on('value', function(snap){
    snap.forEach(function(childNodes){
        let first = (childNodes.val().username).replace(/\s+/g, "");
        let second = result;
        if (first.toString() === second.toString())
              {
                  //console.log("here");
                    successDisplay.innerText = "Email is already in use! Laf";
                    successDisplay.style.visibility = "visible";
                    found = true;
                  return;
              }
    });

    if (!found)
    {
        firebase.database().ref('users/' + result).on('value', function(snapshot) {

            
            var newUserRef = firebase.database().ref("users/"+result);
    
            newUserRef.update ({
            "password": pw,
            "firstName":first,
            "lastname":last,
            "username":result
            });
            
            successDisplay.innerText = "Account created successfully! Please log in.";
            successDisplay.style.visibility = "visible";
            goBack.style.visibility = "visible";
            
    
        
        });
    }
    });
    

    
    
    
}