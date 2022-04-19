const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
loginErrorMsg.style.opacity = 0;

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "grant" && password === "1234") {
        //alert("You have successfully logged in.");
        window.location.replace('game.html');
    } else {
        loginErrorMsg.style.opacity = 1;
    }
});