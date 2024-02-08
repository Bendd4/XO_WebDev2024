var turn = 'O'
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
        // console.log(block.innerText)
        let blockInfo = block.getAttribute("id").replace("A", 0).replace("B", 1).replace("C", 2).replace("D", 3).concat(block.innerText).split("")
        shapeLoc.add(blockInfo);
    }
    // console.log("------------------------------------")

    // console.log(shapeLoc)
    // horizontal
    for (let index = 0; index <= 3; index++) {
        let hwin = 0
        for (var loc of shapeLoc) {
            // console.log("------------");
            if (loc[0] == index) {
                if (loc.length >= 3) {
                    if (loc[2] == turn) {
                        console.log("yes")
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
                // win = true
                console.log("Adding..");
                sameShapeLoc = new Set([...sameShapeLoc, ...temp]);
                console.log(sameShapeLoc);
            }
        }
        temp.clear();
    }

    // vertical
    for (let index = 0; index <= 3; index++) {
        let vwin = 0
        for (var loc of shapeLoc) {
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
                win = true
                console.log("Adding..");
                sameShapeLoc = new Set([...sameShapeLoc, ...temp]);
                console.log(sameShapeLoc);score_O
            }
        }
        temp.clear();
    }

    // Diagonal
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
    }
    else{
        score_O += sameShapeLoc.size;
    }

    let draw = 0;
    for (var block of blocks) {
        if (block.innerText != '') {
            draw++;
        }
    }


    console.log(win)

    if (win) {
        //Game end and someone wins the game
        // winner = turn;
        // turnObject.innerHTML = "Game win by " + winner;
        if (turn = 'O') {
            score_O += 1;
            score_OShow.innerText = score_O + ''
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
    turn = 'O';
    // turnObject.innerHTML = "Turn: " + turn;
    winner = '';
    win = false;
    // 3. Modify the code here to reset the game to initial state
    for (var block of blocks) {
        block.innerText = ""
    }
    console.log("------------------Reset------------------")
}
