// import * as data from './test.json';
// const {name} = data;
// console.log(name);

const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
const passwordErrorMsg = document.getElementById("wrong-password-error");

loginErrorMsg.style.opacity = 0;
passwordErrorMsg.style.opacity = 0;


  // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);

    //const dbRef = firebase.database().ref(); 

function goToCreate()
{
    window.location.replace('sign-up.html');
}
    

loginButton.addEventListener("click", (e) => {
    loginErrorMsg.style.opacity = 0;
    passwordErrorMsg.style.opacity = 0;
    
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    let result = username.replace(/\./g, "__dot__");
    console.log(result);

    var uid = username;

    try
    {
        firebase.database().ref('users/' + result).on('value', function(snapshot) {
            if (snapshot.val() === null)
            {
                loginErrorMsg.innerText = "Invalid username, please create an account.";
                loginErrorMsg.style.opacity = 1;
            }
            var foundpw = snapshot.val().password;
            if (password == snapshot.val().password) {
                //alert("You have successfully logged in.");
                window.location.replace('second.html');
            }
            else
            {
                loginErrorMsg.innerText = "Invalid Password";
                loginErrorMsg.style.opacity = 1;
            }
        });
        
    }
    catch (error)
    {
        loginErrorMsg.innerText = "Invalid username, please create an account.";
        loginErrorMsg.style.opacity = 1;
    }
    

    // if (username == "grant" && foundpw == snapshot.val().password) {
    //     //alert("You have successfully logged in.");
    //     window.location.replace('second.html');
    // } else {
    //     loginErrorMsg.style.opacity = 1;
    // }
});

