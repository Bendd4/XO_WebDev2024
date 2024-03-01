var turn = 'X'
var win = false;
var winner = '';
var score_X = 0;
var winscore_X = 0;
var winscore_O = 0;
var losescore_X = 0;
var losescore_O = 0;
var score_XShow = document.querySelector('#scoreX')
var score_O = 0;
var score_OShow = document.querySelector('#scoreO')
var blocks = document.querySelectorAll('.table-block');
// var turnObject = document.getElementById('turn');

newGame();

document.querySelector(".xPlayerCard").style.opacity = 1
document.querySelector(".oPlayerCard").style.opacity = 0.25
document.querySelector(".xPlayerCardm").style.opacity = 1
document.querySelector(".oPlayerCardm").style.opacity = 0.25
document.querySelector(".xPlayerCards").style.opacity = 1
document.querySelector(".oPlayerCards").style.opacity = 0.25

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
            if (turn == 'X'){
                document.querySelector(".xPlayerCard").style.opacity = 1
                document.querySelector(".oPlayerCard").style.opacity = 0.25
                document.querySelector(".xPlayerCardm").style.opacity = 1
                document.querySelector(".oPlayerCardm").style.opacity = 0.25
                document.querySelector(".xPlayerCards").style.opacity = 1
                document.querySelector(".oPlayerCards").style.opacity = 0.25
            }else if (turn == 'O'){
                document.querySelector(".xPlayerCard").style.opacity = 0.25
                document.querySelector(".oPlayerCard").style.opacity = 1
                document.querySelector(".xPlayerCardm").style.opacity = 0.25
                document.querySelector(".oPlayerCardm").style.opacity = 1
                document.querySelector(".xPlayerCards").style.opacity = 0.25
                document.querySelector(".oPlayerCards").style.opacity = 1
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
                    else {
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
                    else {
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

    // Diagonal | \\\\ | (please God help me)


    // let d1win = 0
    // let checkset = [0, 0, document.getElementById("A0").innerText];
    // for (let loc of shapeLoc) {
    //     // break;

    //     // console.log(checkset)
    //     // shapeLoc = new Set([...shapeLoc, checkset])
    //     if (checkset[2] == loc[2]) {
    //         if (loc[0] == checkset[0] && loc[1] == checkset[1]) {
    //             console.log(checkset[2])
    //             if (loc[2] == checkset[2]) {
    //                 d1win++;
    //                 temp.add(loc);
    //                 // console.log(temp);
    //             }
    //             else {
    //                 console.log("D win reset")
    //                 d1win = 0;
    //             }


    //         }
    //         checkset = loc;
    //     }

    //     console.log(temp)
    //     if (d1win >= 3) {
    //         sameShapeLoc = new Set([...sameShapeLoc, ...temp]);
    //     }

    //     // console.log(loc)
    //     // console.log(shapeLoc);

    //     // console.log( [( parseInt(loc[0]) +1).toString(), ( parseInt(loc[0]) +1).toString(), (turn)] );


    // }
    console.log(shapeLoc);
    // console.log(sameShapeLoc);
    temp.clear();

    // if (document.getElementById("A0").innerText == turn){
    //     let temp = new Set();


    // }


    // Diagonal | \\\\ |
    let runner = 0;
    if (document.getElementById("B1").innerText == turn &&
        document.getElementById("C2").innerText == turn) {
        if (document.getElementById("A0").innerText == turn) {
            // temp.add(shapeLoc[5]);
            for (let loc of shapeLoc) {
                runner++;
                if (runner > 5) {
                    temp.add(loc)
                    runner = 0;
                    break;
                }
            }
            // temp.add(shapeLoc[10]);
            for (let loc of shapeLoc) {
                runner++;
                if (runner > 10) {
                    temp.add(loc)
                    runner = 0;
                    break;
                }
            }
            // temp.add(shapeLoc[0]);
            for (let loc of shapeLoc) {
                runner++;
                if (runner > 0) {
                    temp.add(loc)
                    runner = 0;
                    break;
                }
            }
            sameShapeLoc = new Set([...sameShapeLoc, ...temp]);
            console.log(temp)
            temp.clear()
        }
        if (document.getElementById("D3").innerText == turn) {
            // temp.add(shapeLoc[5]);
            for (let loc of shapeLoc) {
                runner++;
                if (runner > 5) {
                    temp.add(loc)
                    runner = 0;
                    break;
                }
            }
            // temp.add(shapeLoc[10]);
            for (let loc of shapeLoc) {
                runner++;
                if (runner > 10) {
                    temp.add(loc)
                    runner = 0;
                    break;
                }
            }
            // temp.add(shapeLoc[15]);
            for (let loc of shapeLoc) {
                runner++;
                if (runner > 15) {
                    temp.add(loc)
                    runner = 0;
                    break;
                }
            }
            sameShapeLoc = new Set([...sameShapeLoc, ...temp]);
            console.log(temp)
            temp.clear()
        }
    }
    if (document.getElementById("B0").innerText == turn &&
        document.getElementById("C1").innerText == turn &&
        document.getElementById("D2").innerText == turn) {
        // temp.add(shapeLoc[4]);
        for (let loc of shapeLoc) {
            runner++;
            if (runner > 4) {
                temp.add(loc)
                runner = 0;
                break;
            }
        }
        // temp.add(shapeLoc[9]);
        for (let loc of shapeLoc) {
            runner++;
            if (runner > 9) {
                temp.add(loc)
                runner = 0;
                break;
            }
        }
        // temp.add(shapeLoc[14]);
        for (let loc of shapeLoc) {
            runner++;
            if (runner > 14) {
                temp.add(loc)
                runner = 0;
                break;
            }
        }
        sameShapeLoc = new Set([...sameShapeLoc, ...temp]);
        console.log(temp)
        temp.clear()
    }
    if (document.getElementById("A1").innerText == turn &&
        document.getElementById("B2").innerText == turn &&
        document.getElementById("C3").innerText == turn) {
        // temp.add(shapeLoc[1]);
        for (let loc of shapeLoc) {
            runner++;
            if (runner > 1) {
                temp.add(loc)
                runner = 0;
                break;
            }
        }
        // temp.add(shapeLoc[6]);
        for (let loc of shapeLoc) {
            runner++;
            if (runner > 6) {
                temp.add(loc)
                runner = 0;
                break;
            }
        }
        // temp.add(shapeLoc[11]);
        for (let loc of shapeLoc) {
            runner++;
            if (runner > 11) {
                temp.add(loc)
                runner = 0;
                break;
            }
        }
        sameShapeLoc = new Set([...sameShapeLoc, ...temp]);
        console.log(temp)
        temp.clear()
    }

    // Diagonal | //// |
    if (document.getElementById("B2").innerText == turn &&
        document.getElementById("C1").innerText == turn) {
        if (document.getElementById("A3").innerText == turn) {
            // temp.add(shapeLoc[6]);
            for (let loc of shapeLoc) {
                runner++;
                if (runner > 6) {
                    temp.add(loc)
                    runner = 0;
                    break;
                }
            }
            // temp.add(shapeLoc[9]);
            for (let loc of shapeLoc) {
                runner++;
                if (runner > 9) {
                    temp.add(loc)
                    runner = 0;
                    break;
                }
            }
            // temp.add(shapeLoc[3]);
            for (let loc of shapeLoc) {
                runner++;
                if (runner > 3) {
                    temp.add(loc)
                    runner = 0;
                    break;
                }
            }
            sameShapeLoc = new Set([...sameShapeLoc, ...temp]);
            console.log(temp)
            temp.clear()
        }
        if (document.getElementById("D0").innerText == turn) {
            // temp.add(shapeLoc[6]);
            for (let loc of shapeLoc) {
                runner++;
                if (runner > 6) {
                    temp.add(loc)
                    runner = 0;
                    break;
                }
            }
            // temp.add(shapeLoc[9]);
            for (let loc of shapeLoc) {
                runner++;
                if (runner > 9) {
                    temp.add(loc)
                    runner = 0;
                    break;
                }
            }
            // temp.add(shapeLoc[12]);
            for (let loc of shapeLoc) {
                runner++;
                if (runner > 12) {
                    temp.add(loc)
                    runner = 0;
                    break;
                }
            }
            sameShapeLoc = new Set([...sameShapeLoc, ...temp]);
            // console.log(temp)
            temp.clear()
        }
    }
    if (document.getElementById("A2").innerText == turn &&
        document.getElementById("B1").innerText == turn &&
        document.getElementById("C0").innerText == turn) {
        // temp.add(shapeLoc[2]);
        for (let loc of shapeLoc) {
            runner++;
            if (runner > 2) {
                temp.add(loc)
                runner = 0;
                break;
            }
        }
        // temp.add(shapeLoc[5]);
        for (let loc of shapeLoc) {
            runner++;
            if (runner > 5) {
                temp.add(loc)
                runner = 0;
                break;
            }
        }
        // temp.add(shapeLoc[8]);
        for (let loc of shapeLoc) {
            runner++;
            if (runner > 8) {
                temp.add(loc)
                runner = 0;
                break;
            }
        }
        sameShapeLoc = new Set([...sameShapeLoc, ...temp]);
        console.log(temp)
        temp.clear()
    }
    if (document.getElementById("B3").innerText == turn &&
        document.getElementById("C2").innerText == turn &&
        document.getElementById("D1").innerText == turn) {
        // temp.add(shapeLoc[7]);
        for (let loc of shapeLoc) {
            runner++;
            if (runner > 7) {
                temp.add(loc)
                runner = 0;
                break;
            }
        }
        // temp.add(shapeLoc[10]);
        for (let loc of shapeLoc) {
            runner++;
            if (runner > 10) {
                temp.add(loc)
                runner = 0;
                break;
            }
        }
        // temp.add(shapeLoc[13]);
        for (let loc of shapeLoc) {
            runner++;
            if (runner > 13) {
                temp.add(loc)
                runner = 0;
                break;
            }
        }
        sameShapeLoc = new Set([...sameShapeLoc, ...temp]);
        console.log(temp)
        temp.clear()
    }


    console.log(sameShapeLoc)
    // console.log(temp)

    console.log("----------------");
    console.log("WinX: " + winscore_X);
    console.log("WinO: " + winscore_O);
    console.log("loseX: " + losescore_X);
    console.log("loseO: " + losescore_O);
    console.log("----------------");


    if (turn == "X") {
        score_X += sameShapeLoc.size;
        for (let scoreXTextObj of document.querySelectorAll("#scoreX")) {
            // console.log(scoreXTextObj)
            scoreXTextObj.innerText = score_X + " / 14"
            if ((score_X >= 14)) {
                score_X = 0;
                score_O = 0;
                winscore_X += 1;
                losescore_O += 1;
                
            }
        }
        for (let loc of sameShapeLoc) {
            removeGameToken(loc);
        }
    }
    else {
        score_O += sameShapeLoc.size;
        for (let scoreOTextObj of document.querySelectorAll("#scoreO")) {
            scoreOTextObj.innerText = score_O + " / 14"
            if ((score_O >= 14)) {
                score_X = 0;
                score_O = 0;
                winscore_O += 1;
                losescore_X += 1;
            }
        }
        for (let loc of sameShapeLoc) {
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
    if (score_X >= 16) {
        win = true
        console.log("X won")
    }
    else if(score_O >= 16) {
        win = true
        console.log("O won")
    }

    if (win) {
        //Game end and someone wins the game
        // winner = turn;
        // turnObject.innerHTML = "Game win by " + winner;
        if (turn = 'O') {
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
