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
    const app = firebase.initializeApp(firebaseConfig);

    eml = emailField.value;
    pw = passwordField.value;
    first = firstName.value;
    last = lastName.value;

    let result = eml.replace(/\./g, "__dot__");

    firebase.database().ref('users/' + result).on('value', function(snapshot) {

        // var foundpw = snapshot.val().password;
        // if (password == snapshot.val().password) {
        //     //alert("You have successfully logged in.");
        //     window.location.replace('second.html');
        // }
        // else
        // {
        //     loginErrorMsg.innerText = "Invalid Password";
        //     loginErrorMsg.style.opacity = 1;
        // }
        var newUserRef = firebase.database().ref("users/"+result);

        newUserRef.update ({
        "password": pw,
        "firstName":first,
        "lastname":last
        });
        
        successDisplay.innerText = "Account created successfully! Please log in.";
        successDisplay.style.visibility = "visible";
        goBack.style.visibility = "visible";

    
    });
}