var turn = 'X'
var win = false;
var winner = '';
var score_X = 0;
var score_XShow = document.querySelector('#scoreX')
var score_O = 0;
var score_OShow = document.querySelector('#scoreO')
var blocks = document.querySelectorAll('.table-block');
// var turnObject = document.getElementById('turn');

newGame();

for (var block of blocks) {
    // 1. Modify the code here to check click event on each block
    block.onclick = function (event) {
        // modify the condition here to continue the game play as long as there is no winner
        if (!win) {
            // 4. Modify the code here to check whether the clicking block is avialable.
            // console.log(event.target.innerHTML)
            if (event.target.innerHTML == '') {
                event.target.innerHTML = turn;
                checkResult();
            }
        }
    }
}

function checkResult() {
    // 2. Modify the code here to check whether someone win the game
    console.log(turn)
    let shapeLoc = new Set();
    let sameShapeLoc = new Set();
    let temp = new Set();
    for (var block of blocks) {
        let blockInfo = block.getAttribute("id").replace("A", 0).replace("B", 1).replace("C", 2).replace("D", 3).concat(block.innerText).split("")
        shapeLoc.add(blockInfo);
    }
    // console.log("------------------------------------")

    // horizontal
    for (let index = 0; index <= 3; index++) {
        let hwin = 0
        for (let loc of shapeLoc) {
            // console.log("------------");
            if (loc[0] == index) {
                if (loc.length >= 3) {
                    if (loc[2] == turn) {
                        hwin++;
                        temp.add(loc);
                    }
                    else{
                        hwin = 0;
                    }
                } else {
                    hwin = 0;
                }
            }
            if (hwin >= 3) {
                // console.log("Adding..");
                sameShapeLoc = new Set([...sameShapeLoc, ...temp]);
                // console.log(sameShapeLoc);
            }
        }
        temp.clear();
    }

    // vertical
    for (let index = 0; index <= 3; index++) {
        let vwin = 0
        for (let loc of shapeLoc) {
            // console.log("------------");
            if (loc[1] == index) {
                if (loc.length >= 3) {
                    if (loc[2] == turn) {
                        vwin++;
                        temp.add(loc);
                    }
                    else{
                        vwin = 0;
                    }
                } else {
                    vwin = 0;
                }
            }
            if (vwin >= 3) {
                sameShapeLoc = new Set([...sameShapeLoc, ...temp]);
            }
        }
        temp.clear();
    }

    // Diagonal (please God help me)
    let dwin = 0
    // console.log(shapeLoc);
    for (let loc of shapeLoc) {
        let checkset = new Array(( parseInt(loc[0]) +1).toString(), ( parseInt(loc[0]) +1).toString(), (turn))
        console.log(checkset)
        shapeLoc = new Set([...shapeLoc, checkset])
        if (shapeLoc.has(checkset)) {
            dwin++;
            console.log("the condition works")
            temp.add(loc);
        }
        // console.log(loc)
        console.log(shapeLoc);
        // console.log( [( parseInt(loc[0]) +1).toString(), ( parseInt(loc[0]) +1).toString(), (turn)] );

    }
    console.log(shapeLoc);
    temp.clear();

    // if (document.getElementById("A0").innerText == turn){
    //     let temp = new Set();


    // }


    // if ((   document.getElementById("A0").innerText == turn &&
    //         document.getElementById("B1").innerText == turn &&
    //         document.getElementById("C2").innerText == turn) 
    //         ||
    //     (   document.getElementById("A2").innerText == turn &&
    //         document.getElementById("B1").innerText == turn &&
    //         document.getElementById("C0").innerText == turn
    //     )) 
    //     {
    //     win = true 
    // }

    if (turn == "X") {
        score_X += sameShapeLoc.size;
        for (let scoreXTextObj of document.querySelectorAll("#scoreX")){
            // console.log(scoreXTextObj)
            scoreXTextObj.innerText = score_X+" / 14"
        }
        for (let loc of sameShapeLoc){
            removeGameToken(loc);
        }
    }
    else{
        score_O += sameShapeLoc.size;
        for (let scoreOTextObj of document.querySelectorAll("#scoreO")){
            scoreOTextObj.innerText = score_O+" / 14"
        }
        for (let loc of sameShapeLoc){
            removeGameToken(loc);
        }
    }
    console.log("Score X : " + score_X);
    console.log("Score O : " + score_O);

    let draw = 0;
    for (let block of blocks) {
        if (block.innerText != '') {
            draw++;
        }
    }

    // console.log(win)

    if (win) {
        //Game end and someone wins the game
        // winner = turn;
        // turnObject.innerHTML = "Game win by " + winner;
        if (turn = 'O' ) {
            // score_O += 1;
            // score_OShow.innerText = score_O + ''
        }


    } else if (!win && draw == 16) {
        // Game end and no-one wins the game
        // turnObject.innerHTML = "Game draw";
        console.log("Game draw")
    } else {
        // The game is on going
        turn = turn === 'O' ? 'X' : 'O';
        // turnObject.innerHTML = "Turn: " + turn;
    }
    console.log("------------------Finished Checking------------------")
}
function newGame() {
    turn = 'X';
    // turnObject.innerHTML = "Turn: " + turn;
    winner = '';
    score_O = 0
    score_X = 0
    win = false;
    // 3. Modify the code here to reset the game to initial state
    for (var block of blocks) {
        block.innerText = ""
    }
    console.log("------------------Reset------------------")
}

function removeGameToken(location) {
    let positionID = ''
    // console.log(location)
    switch (location[0]) {
        case "0":
            positionID = 'A' + location[1];
            break;
        case "1":
            positionID = 'B' + location[1];
            break;
        case "2":
            positionID = 'C' + location[1];
            break;
        case "3":
            positionID = 'D' + location[1];
            break;
        default:
            break;
    }
    // console.log(positionID);
    document.getElementById(positionID).innerText = '';
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("User :", user); 
    } else {
        console.log("Unavailable user");
        window.location.href = "index.html"
    }
});
