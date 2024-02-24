const btnLogout = document.querySelector("#btn-logout");
btnLogout.addEventListener("click", function () {
    firebase.auth().signOut();
    console.log("logout completed");
    window.location.href = "index.html";
})

const btnLogoutSmall = document.querySelector("#btn-logoutSmall");
btnLogoutSmall.addEventListener("click", function () {
    firebase.auth().signOut();
    console.log("logout completed");
    window.location.href = "index.html";
})

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("User :", user);
        document.querySelector("#welcomeMessage").innerText = 'Welcome back, ' + user.email
        document.querySelector("#dashboardName").innerText = user.email
        
    } else {
        console.log("Unavailable user");
        window.location.href = "index.html"
    }
});