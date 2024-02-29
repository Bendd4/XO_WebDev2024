const gameRoomRef = firebase.database().ref("Room");
const playerRef = firebase.database().ref("PlayerList");

const createGame = document.querySelector("#create-lobby");
createGame.addEventListener("click", createLobby);

let currentKey = "";

function createLobby() {
    const currentUser = firebase.auth().currentUser;
    console.log("==============================");
    console.log("Create Room by", currentUser);
    let roomKey = "";
    for (let i = 0; i < 4; i++) {
        let randomNumber = Math.floor(Math.random() * 9)
        roomKey += randomNumber;
    }
    currentKey = roomKey;
    console.log("Room Number is", roomKey);

    gameRoomRef.child(`room_${roomKey}`).once("value").then((snapshot) => {
        if (snapshot.hasChild("room-key") == false) {
            gameRoomRef.child(`room_${roomKey}`).update({
                ["room-key"]: roomKey,
                ["room-status"]: "Waiting Player",
            })
            gameRoomRef.child(`room_${roomKey}`).child("game-table").update({
                ["row-1-col-1"]: "-",
                ["row-1-col-2"]: "-",
                ["row-1-col-3"]: "-",
                ["row-1-col-4"]: "-",
                ["row-2-col-1"]: "-",
                ["row-2-col-2"]: "-",
                ["row-2-col-3"]: "-",
                ["row-2-col-4"]: "-",
                ["row-3-col-1"]: "-",
                ["row-3-col-2"]: "-",
                ["row-3-col-3"]: "-",
                ["row-3-col-4"]: "-",
                ["row-4-col-1"]: "-",
                ["row-4-col-2"]: "-",
                ["row-4-col-3"]: "-",
                ["row-4-col-4"]: "-",
            })
            gameRoomRef.child(`room_${roomKey}`).child("player").update({
                ["player-x-email"]: currentUser.email,
                ["player-x-uid"]: currentUser.uid,
            })
            console.log("==============================");
            console.log("Room", roomKey, "is Created.");
            alert(`Room Created, Room Key is ${roomKey}`);

            playerRef.child(currentUser.uid).update({
                ["status"]: roomKey,
            })

            createGame.removeEventListener("click", createLobby);
            createGame.innerHTML = `          
                <p>Room: ${roomKey}</p> 
                <p style="font-size: 20px;">Click Again to leave</p>
            `;
            createGame.addEventListener("click", cancelLobby)
        }
        else {
            alert("Sorry, Please try again")
        }
    })
}

function cancelLobby() {
    // console.log("click")
    const currentUser = firebase.auth().currentUser;
    gameRoomRef.child(`room_${currentKey}`).once("value").then((snapshot) => {
        if (snapshot.child("room-key").val() == currentKey) {
            // console.log(snapshot.child("room-key").val())
            playerRef.child(currentUser.uid).update({
                ["status"]: "non",
            })

            gameRoomRef.child(`room_${currentKey}`).remove();
            createGame.removeEventListener("click", cancelLobby);
            createGame.innerHTML = `CREATE`;
            createGame.addEventListener("click", createLobby);
            alert(`You canceled Room: ${currentKey}`);

            console.log("==============================");
            console.log("Room", currentKey, "is Deleted")
            currentKey = "";
        }
    })
}

//const joinGame = document.querySelector("#join-lobby");
//joinGame.addEventListener("click", joinLobby);

function joinLobby() {
    const currentUser = firebase.auth().currentUser;
    inputKey = document.getElementById("roomCodeInput").value
    //inputKey = prompt('Enter room code.');
    gameRoomRef.child(`room_${inputKey}`).once("value").then((snapshot) => {
        if (snapshot.child("room-key").val() == inputKey) {
            gameRoomRef.child(`room_${inputKey}`).child("player").update({
                ["player-o-email"]: currentUser.email,
                ["player-o-uid"]: currentUser.uid,
            })
            playerRef.child(currentUser.uid).update({
                ["status"]: inputKey,
            });

            gameRoomRef.child(`room_${inputKey}`).update({
                ["room-status"]: "Full",
            })

            console.log("==============================");
            console.log("Room Found");
            // alert(`You joined Room ${inputKey}`);
        }
        else {
            console.log("==============================");
            console.log("There's no Room with", inputKey);
            alert(`There's no Room with ${inputKey}`);
        }
    })
}

gameRoomRef.on("value", (snapshot) => {
    snapshot.forEach((data) => {
        const gameInfo = data.val();
        // console.log(gameInfo)
        Object.keys(gameInfo).forEach((key) => {
            // console.log(key)
            switch (key) {
                // case "player":
                case "room-status":
                    if (gameInfo[key] == "Full") {
                        console.log("==============================");
                        console.log(gameInfo[key]);
                        alert("Opponent's Found, game is about to start")
                        window.location.href = "gameboard.html";
                    }
                    // if (gameInfo[key] == "non") {
                    //     console.log("==============================");
                    //     console.log(gameInfo[key]);
                    //     alert("Opponent's Left, game is about to end");
                    //     gameRoomRef.child(`room_${currentKey}`).remove();
                    //     window.location.href = "dashboard.html";
                    // }
            }
        })
    })
})


// const leaveGame = document.querySelector("#leave-lobby");
// leaveGame.addEventListener("click", leaveLobby);
// function leaveLobby() {
    
// }


// gameRoomRef.child(`room_${inputKey}`).once("value").then((snapshot) => {
//     snapshot.forEach((data) => {
//         if (data.child("player-x-email").val() != "" &&
//             data.child("player-o-email").val() != "") {
//             console.log("==============================");
//             console.log("Room Full");
//             console.log(data.child("player-x-email").val());
//             console.log(data.child("player-o-email").val());
//         }
//     })
// })