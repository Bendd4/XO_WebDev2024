const registerForm = document.querySelector("#register-form");
registerForm.addEventListener("submit", createUser);

function createUser(event) {
    event.preventDefault();
    const username = registerForm["usernameInput"].value;
    const password = registerForm["passwordInput"].value;

    if (registerForm["passwordInput"].value == registerForm["cpasswordInput"].value) {
        firebase.auth().createUserWithEmailAndPassword(username, password)
            .then(() => {
                console.log("User created");
                window.location.href = "index.html";

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
    } else {
        console.log("Unavailable user");
    }
});