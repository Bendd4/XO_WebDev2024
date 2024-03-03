const gameRoomRef = firebase.database().ref("Room");
const playerRef = firebase.database().ref("PlayerList");

const createGame = document.querySelector("#create-lobby");
const createGameSmall = document.querySelector("#create-lobby-small");
createGame.addEventListener("click", createLobby);
createGameSmall.addEventListener("click", createLobby);

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
                currentRoom: roomKey,
                status: "Playing",
            })

            createGame.removeEventListener("click", createLobby);
            createGameSmall.removeEventListener("click", createLobby);
            createGame.innerHTML = `          
                <p>Room: ${roomKey}</p> 
                <p style="font-size: 20px;">Click Again to leave</p>
            `;
            createGameSmall.innerHTML = `          
                <p>Room: ${roomKey} Click Again to leave</p> 
            `;
            createGame.addEventListener("click", cancelLobby)
            createGameSmall.addEventListener("click", cancelLobby)
        }
        else {
            alert("Sorry, Please try again")
        }
    })
}

function cancelLobby() {
    const currentUser = firebase.auth().currentUser;
    gameRoomRef.child(`room_${currentKey}`).once("value").then((snapshot) => {
        if (snapshot.child("room-key").val() == currentKey) {
            playerRef.child(currentUser.uid).update({
                currentRoom: "",
                status: "non",
            })

            gameRoomRef.child(`room_${currentKey}`).remove();
            createGame.removeEventListener("click", cancelLobby);
            createGame.innerHTML = `CREATE`;
            createGame.addEventListener("click", createLobby);
            createGameSmall.removeEventListener("click", cancelLobby);
            createGameSmall.innerHTML = `CREATE`;
            createGameSmall.addEventListener("click", createLobby);
            alert(`You canceled Room: ${currentKey}`);

            console.log("==============================");
            console.log("Room", currentKey, "is Deleted")
            currentKey = "";
        }
    })
}

function joinLobby() {
    const currentUser = firebase.auth().currentUser;
    inputKey = document.getElementById("roomCodeInput").value
    gameRoomRef.child(`room_${inputKey}`).once("value").then((snapshot) => {
        if (snapshot.child("room-key").val() == inputKey) {
            gameRoomRef.child(`room_${inputKey}`).child("player").update({
                ["player-o-email"]: currentUser.email,
                ["player-o-uid"]: currentUser.uid,
            })
            playerRef.child(currentUser.uid).update({
                currentRoom: inputKey,
                status: "Playing",
            });

            gameRoomRef.child(`room_${inputKey}`).update({
                ["room-status"]: "Full",
            })

            console.log("==============================");
            console.log("Room Found");
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
        Object.keys(gameInfo).forEach((key) => {
            switch (key) {
                case "room-status":
                    if (gameInfo[key] == "Full") {
                        const currentUser = firebase.auth().currentUser;
                        playerRef.child(currentUser.uid).child("currentRoom").once("value").then((roomNum) => {
                            let playerRoom = roomNum.val()
                            gameRoomRef.child(`room_${playerRoom}`).once("value").then((snapshot) => {
                                if (playerRoom == snapshot.child("room-key").val() && 
                                snapshot.child("room-status").val() == "Full") {
                                    console.log("==============================");
                                    console.log(gameInfo[key]);
                                    alert("Opponent's Found, game is about to start")

                                    window.location.href = "gameboard.html";
                                }
                            })  
                        })
                    }
            }
        })
    })
})