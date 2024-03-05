const gameRoomRef = firebase.database().ref("Room");
const playerRef = firebase.database().ref("PlayerList");

const createGame = document.querySelector("#leave-lobby");
createGame.addEventListener("click", leaveTheMatchEarly);

function leaveTheMatchEarly() {
    if (!confirm("The match isn't over! Leaving the game will result in automatic lost!")) {
        return false;
    } else {
        const currentUser = firebase.auth().currentUser;
        playerRef.child(currentUser.uid).child("currentRoom").once("value").then((roomNum) => {
            let playerRoom = roomNum.val()
            gameRoomRef.child(`room_${playerRoom}`).once("value").then((snapshot) => {
                if (snapshot.child("room-key").val() == playerRoom &&
                    snapshot.child("player").child("player-x-email").val() == currentUser.email) {
                    playerRef.child(currentUser.uid).update({
                        currentRoom: "",
                        status: "non",
                    })

                    gameRoomRef.child(`room_${playerRoom}`).child("player").child("player-x-email").remove()
                    gameRoomRef.child(`room_${playerRoom}`).child("player").child("player-x-uid").remove()
                    gameRoomRef.child(`room_${playerRoom}`).update({
                        ["room-status"]: "non",
                    })

                    window.location.href = "dashboard.html";
                }
                if (snapshot.child("room-key").val() == playerRoom &&
                    snapshot.child("player").child("player-o-email").val() == currentUser.email) {
                    gameRoomRef.child(`room_${playerRoom}`).child("player").child("player-o-email").remove()
                    gameRoomRef.child(`room_${playerRoom}`).child("player").child("player-o-uid").remove()
                    gameRoomRef.child(`room_${playerRoom}`).update({
                        ["room-status"]: "non",
                    })

                    playerRef.child(currentUser.uid).update({
                        ["status"]: "non",
                    })

                    window.location.href = "dashboard.html";
                }
            })
        });
    }
}

gameRoomRef.on("value", (snapshot) => {
    snapshot.forEach((data) => {
        const gameInfo = data.val();
        Object.keys(gameInfo).forEach((key) => {
            switch (key) {
                case "room-status":
                    if (gameInfo[key] == "non") {
                        const currentUser = firebase.auth().currentUser;
                        playerRef.child(currentUser.uid).child("currentRoom").once("value").then((roomNum) => {
                            let playerRoom = roomNum.val()
                            console.log("==============================");
                            console.log(gameInfo[key]);
                            gameRoomRef.child(`room_${playerRoom}`).once("value").then((snapshot) => {
                                if (playerRoom == snapshot.child("room-key").val() &&
                                    snapshot.child("room-status").val() == "non") {
                                    gameRoomRef.child(`room_${playerRoom}`).remove();
                                    playerRef.child(currentUser.uid).update({
                                        currentRoom: "",
                                        status: "non",
                                    })
                                    alert("Player Left, game is about to end");
                                    window.location.href = "dashboard.html";
                                }
                            })

                        })
                    }

                    if (gameInfo[key] == "Full") {
                        const currentUser = firebase.auth().currentUser;
                        playerRef.child(currentUser.uid).child("currentRoom").once("value").then((roomNum) => {
                            let playerRoom = roomNum.val()
                            gameRoomRef.child(`room_${playerRoom}`).once("value").then((snapshot) => {
                                document.querySelector("#player-x-email").innerHTML = snapshot.child("player").child("player-x-email").val()
                                document.querySelector("#player-o-email").innerHTML = snapshot.child("player").child("player-o-email").val()
                                document.querySelector("#player-x-emailm").innerHTML = snapshot.child("player").child("player-x-email").val()
                                document.querySelector("#player-o-emailm").innerHTML = snapshot.child("player").child("player-o-email").val()
                                document.querySelector("#player-x-emails").innerHTML = snapshot.child("player").child("player-x-email").val()
                                document.querySelector("#player-o-emails").innerHTML = snapshot.child("player").child("player-o-email").val()

                                document.querySelector("#scoreX").innerHTML = snapshot.child("player").child("player-x-score").val() + " / 14"
                                document.querySelector("#scoreXm").innerHTML = snapshot.child("player").child("player-x-score").val() + " / 14"
                                document.querySelector("#scoreXs").innerHTML = snapshot.child("player").child("player-x-score").val() + " / 14"
                                
                                document.querySelector("#scoreO").innerHTML = snapshot.child("player").child("player-o-score").val() + " / 14"
                                document.querySelector("#scoreOm").innerHTML = snapshot.child("player").child("player-o-score").val() + " / 14"
                                document.querySelector("#scoreOs").innerHTML = snapshot.child("player").child("player-o-score").val() + " / 14"
                            })
                        })
                    }
                case "game-table":
                    Object.keys(gameInfo[key]).forEach((position) => {
                        switch (position) {
                            case "A0":
                                document.getElementById("A0").innerText = gameInfo[key][position];
                                break;
                            case "A1":
                                document.getElementById("A1").innerText = gameInfo[key][position];
                                break;
                            case "A2":
                                document.getElementById("A2").innerText = gameInfo[key][position];
                                break;
                            case "A3":
                                document.getElementById("A3").innerText = gameInfo[key][position];
                                break;
                            case "B0":
                                document.getElementById("B0").innerText = gameInfo[key][position];
                                break;
                            case "B1":
                                document.getElementById("B1").innerText = gameInfo[key][position];
                                break;
                            case "B2":
                                document.getElementById("B2").innerText = gameInfo[key][position];
                                break;
                            case "B3":
                                document.getElementById("B3").innerText = gameInfo[key][position];
                                break;
                            case "C0":
                                document.getElementById("C0").innerText = gameInfo[key][position];
                                break;
                            case "C1":
                                document.getElementById("C1").innerText = gameInfo[key][position];
                                break;
                            case "C2":
                                document.getElementById("C2").innerText = gameInfo[key][position];
                                break;
                            case "C3":
                                document.getElementById("C3").innerText = gameInfo[key][position];
                                break;
                            case "D0":
                                document.getElementById("D0").innerText = gameInfo[key][position];
                                break;
                            case "D1":
                                document.getElementById("D1").innerText = gameInfo[key][position];
                                break;
                            case "D2":
                                document.getElementById("D2").innerText = gameInfo[key][position];
                                break;
                            case "D3":
                                document.getElementById("D3").innerText = gameInfo[key][position];
                                break;
                            case "turn":
                                turn = gameInfo[key][position]
                                if (turn == 'X') {
                                    document.querySelector(".xPlayerCard").style.opacity = 1
                                    document.querySelector(".oPlayerCard").style.opacity = 0.25
                                    document.querySelector(".xPlayerCardm").style.opacity = 1
                                    document.querySelector(".oPlayerCardm").style.opacity = 0.25
                                    document.querySelector(".xPlayerCards").style.opacity = 1
                                    document.querySelector(".oPlayerCards").style.opacity = 0.25
                                } else if (turn == 'O') {
                                    document.querySelector(".xPlayerCard").style.opacity = 0.25
                                    document.querySelector(".oPlayerCard").style.opacity = 1
                                    document.querySelector(".xPlayerCardm").style.opacity = 0.25
                                    document.querySelector(".oPlayerCardm").style.opacity = 1
                                    document.querySelector(".xPlayerCards").style.opacity = 0.25
                                    document.querySelector(".oPlayerCards").style.opacity = 1
                                }
                            default:
                                break;
                        }
                    })
                    checkResult()
                    break;

            }
        })
    })
})

function placeXOInDB(location, event) {
    const currentUser = firebase.auth().currentUser;
    playerRef.child(currentUser.uid).child("currentRoom").once("value").then((roomNum) => {
        let playerRoom = roomNum.val()

        // console.log(gameInfo[key]);
        gameRoomRef.child(`room_${playerRoom}`).once("value").then((snapshot) => {

            if (playerRoom == snapshot.child("room-key").val() &&
                snapshot.child("room-status").val() == "Full") {

                let userX = snapshot.child("player").child("player-x-email").val();
                let userO = snapshot.child("player").child("player-o-email").val();

                // let current_turn = snapshot.child("game-table").child("turn").val()

                console.log(turn == "O" && userO == currentUser.email)

                if (turn == "X" && userX == currentUser.email) {
                    gameRoomRef.child(`room_${playerRoom}`).child("game-table").update({
                        [`${location}`]: "X",
                        ["turn"]: "O"
                    })
                    event.target.innerHTML = "X";
                }

                if (turn == "O" && userO == currentUser.email) {
                    gameRoomRef.child(`room_${playerRoom}`).child("game-table").update({
                        [`${location}`]: "O",
                        ["turn"]: "X"
                    })
                    event.target.innerHTML = "O";
                }
            }
        })

    })
}


function removeXOInDB() {

}

function addScore(){
    
}


