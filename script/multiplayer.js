const gameRoomRef = firebase.database().ref("Room");

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

    gameRoomRef.child(`room_${currentKey}`).once("value").then((snapshot) => {
        // console.log(snapshot.val())
        if (snapshot.hasChild("room-key") == false) {
            gameRoomRef.child(`room_${currentKey}`).update({
                ["room-key"]: currentKey,
                ["room-status"]: "Waiting Player",
            })
            gameRoomRef.child(`room_${currentKey}`).child("game-table").update({
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
            gameRoomRef.child(`room_${currentKey}`).child("player").update({
                ["player-x-email"]: currentUser.email,
                ["player-x-uid"]: currentUser.uid,
            })
            console.log("==============================");
            console.log("Room", currentKey, "is Created.");
            // console.log(gameRoomRef)
            alert(`Room Created, Room Key is ${currentKey}`);

            createGame.removeEventListener("click", createLobby);
            createGame.innerHTML = `          
                <p>Room: ${currentKey}</p> 
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
    gameRoomRef.child(`room_${currentKey}`).once("value").then((snapshot) => {
        if (snapshot.child("room-key").val() == currentKey) {
            gameRoomRef.child(`room_${currentKey}`).remove();
            createGame.removeEventListener("click", cancelLobby);
            createGame.innerHTML = `CREATE`;
            createGame.addEventListener("click", createLobby);
            alert(`Room ${currentKey} is Deleted`);
            console.log("==============================");
            console.log("Room", currentKey, "is Deleted")
            currentKey = "";
        }
    })
}

const joinGame = document.querySelector("#join-lobby");
joinGame.addEventListener("click", joinLobby);

function joinLobby(){
    inputKey = prompt('Enter room code.');
    gameRoomRef.child(`room_${inputKey}`).once("value").then((snapshot) => {
        if (snapshot.child("room-key").val() == inputKey) {
            console.log("==============================");
            console.log("Room Found")
        }
        else {
            console.log("==============================");
            console.log("There's no Room wtih", inputKey)
        }
    })
    // const inputKey =  document.getElementById("#join-lobby").value
    // console.log(inputKey)
}