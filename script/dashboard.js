const btnLogout = document.querySelector("#btn-logout");
const recordRef = firebase.database().ref("PlayerList");

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
const currentUser = firebase.auth().currentUser;
    if (user) {
        recordRef.child(currentUser.uid).child("Totalmatchplay").once("value").then((roomNum) => {
            let playerRoom = roomNum.val()
            document.querySelector("#TotalMatchPlay").innerText = 'TotalMatchPlay: ' + playerRoom
        })

        console.log("User :", user);
        document.querySelector("#welcomeMessage").innerText = 'Welcome back, ' + user.email
        document.querySelector("#dashboardName").innerText = user.email
        document.querySelector("#dashboardNameSmall").innerText = user.email
        dashboardNameSmall
        
    } else {
        console.log("Unavailable user from dash");
        window.location.href = "index.html"
    }
});