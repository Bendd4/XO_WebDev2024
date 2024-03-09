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
        recordRef.child(currentUser.uid).child("Totalmatchplay").once("value").then((userData) => {
            if (userData.val()) {
                totalMatch = userData.val()    
            } else{
                totalMatch = 0
            }
            document.querySelector("#TotalMatchPlay").innerText = totalMatch
            document.querySelector("#TotalMatchPlays").innerText = totalMatch
        })
        recordRef.child(currentUser.uid).child("game-win").once("value").then((userData) => {
            if (userData.val()) {
                gameWin = userData.val()    
            } else{
                gameWin = 0
            }
            document.querySelector("#MatchWon").innerText = gameWin
            document.querySelector("#MatchWons").innerText = gameWin
        })
        recordRef.child(currentUser.uid).child("game-lose").once("value").then((userData) => {
            if (userData.val()) {
                gameLost = userData.val()    
            } else{
                gameLost = 0
            }
            document.querySelector("#MatchLost").innerText = gameLost
            document.querySelector("#MatchLosts").innerText = gameLost
            document.querySelector("#WinRate").innerText = (parseFloat(document.querySelector("#MatchWon").innerText) / parseFloat(document.querySelector("#TotalMatchPlay").innerText)).toFixed(2) 
            document.querySelector("#WinRates").innerText = (parseFloat(document.querySelector("#MatchWons").innerText) / parseFloat(document.querySelector("#TotalMatchPlays").innerText)).toFixed(2) 
        })
        document.querySelector("#WinRate").innerText = document.querySelector("#MatchWon").innerText + document.querySelector("#MatchLost").innerText
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