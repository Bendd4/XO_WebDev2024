const playerRef = firebase.database().ref("PlayerList");

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", loginUser);

function loginUser(event) {
    event.preventDefault();
    const username = loginForm["usernameInput"].value;
    const password = loginForm["passwordInput"].value;

    firebase.auth().signInWithEmailAndPassword(username, password)
        .then(() => {
            playerRef.child(user.uid).update({
                status: "non",
                currentRoom: '',
            })

            console.log("User Logged-in");
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            alert(error.message);
            console.log(error);
        })
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("User :", user);
    } else {
        console.log("Unavailable user");
    }
});

const registerPage = document.querySelector("#register-page");
registerPage.addEventListener("click", toRegister);

function toRegister() {
    window.location.href = "register.html";
}