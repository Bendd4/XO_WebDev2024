const registerForm = document.querySelector("#register-form");
registerForm.addEventListener("submit", createUser);

const playerRef = firebase.database().ref("PlayerList");

function createUser(event) {
    event.preventDefault();
    const username = registerForm["usernameInput"].value;
    const password = registerForm["passwordInput"].value;

    if (registerForm["passwordInput"].value == registerForm["cpasswordInput"].value) {
        firebase.auth().createUserWithEmailAndPassword(username, password)
            .then(() => {
                const currentUser = firebase.auth().currentUser;
                if (currentUser) {
                    playerRef.child(currentUser.uid).update({
                        ["player-email"]: currentUser.email,
                        ["Totalmatchplay"]: 0,
                        ["game-win"]: 0,
                        ["game-lose"]: 0,
                        ["win-rate"]: 0,
                        ["win-streak-highest"]: 0,
                        ["win-streak-current"]: 0,
                    })
                    console.log("User created");
                    window.location.href = "dashboard.html";
                }
            })
            .catch((error) => {
                alert(error.message);
                console.log(error);
            })
    }
    else {
        console.log("Password must be the same");
    }
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("User :", user);
        window.location.href = "dashboard.html";
    } else {
        console.log("Unavailable user");
    }
});