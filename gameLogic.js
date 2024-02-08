var turn = 'O'
var win = false;
var winner = '';
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
    let sameShapeLoc = new Set();
    for (var block of blocks) {
        if (block.innerText == turn) {
            let blockInfo = block.getAttribute("id").replace("A", 0).replace("B", 1).replace("C", 2).split("")
            sameShapeLoc.add(blockInfo);
            // console.log(block.getAttribute("id"))
            // console.log(blockInfo)
        }
        // console.log(block.innerText)
    }
    // console.log("------------------------------------")

    console.log(sameShapeLoc)
    // horizontal
    for (let index = 0; index <= 2; index++) {
        let hwin = 0
        for (var loc of sameShapeLoc) {
            if (loc[0] == index) {
                // console.log(loc[0])
                hwin++;
            }
        }
        if (hwin >= 3) {
            win = true
        }
    }

    // horizontal
    for (let index = 0; index <= 2; index++) {
        let vwin = 0
        for (var loc of sameShapeLoc) {
            if (loc[1] == index) {
                console.log(loc[0])
                vwin++;
            }
        }
        if (vwin >= 3) {
            win = true
        }
    }

    if ((   document.getElementById("A0").innerText == turn &&
            document.getElementById("B1").innerText == turn &&
            document.getElementById("C2").innerText == turn) 
            ||
        (   document.getElementById("A2").innerText == turn &&
            document.getElementById("B1").innerText == turn &&
            document.getElementById("C0").innerText == turn
        )) 
        {
        win = true 
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
        winner = turn;
        // turnObject.innerHTML = "Game win by " + winner;
    } else if (!win && draw == 16) {
        // Game end and no-one wins the game
        // turnObject.innerHTML = "Game draw";
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
