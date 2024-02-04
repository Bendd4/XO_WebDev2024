function leaveTheMatchEarly() {
    if (!confirm("The match isn't over! Leaving the game will result in automatic lost!")) {
        return false;
    }
}

function openPlayerDetail() {
    document.getElementById("playerDetailExpanded").style.top = "0px";
}
function closePlayerDetail() {
    document.getElementById("playerDetailExpanded").style.top = "-450px";
}