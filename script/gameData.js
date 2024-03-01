const gameRoomRef = firebase.database().ref("Room");
const playerRef = firebase.database().ref("PlayerList");

const createGame = document.querySelector("#leave-lobby");
createGame.addEventListener("click", leaveTheMatchEarly);

function leaveTheMatchEarly() {
    if (!confirm("The match isn't over! Leaving the game will result in automatic lost!")) {
        return false;
    } else {
        const currentUser = firebase.auth().currentUser;
        // playerRef.child(currentUser.uid).update({
        //     ["status"]: "non",
        // })
        playerRef.child(currentUser.uid).child("currentRoom").once("value").then((roomNum) => {
            let playerRoom = roomNum.val()
            gameRoomRef.child(`room_${playerRoom}`).once("value").then((snapshot) => {
                if (snapshot.child("room-key").val() == playerRoom &&
                    snapshot.child("player").child("player-x-email").val() == currentUser.email) {
                    // console.log("clear")
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
                    // console.log("clear")
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
                            gameRoomRef.child(`room_${playerRoom}`).remove();
                            playerRef.child(currentUser.uid).update({
                                currentRoom: "",
                                status: "non",
                            })
                            alert("Player Left, game is about to end");
                            window.location.href = "dashboard.html";
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
                            })
                        })
                    }
            }
        })
    })
})