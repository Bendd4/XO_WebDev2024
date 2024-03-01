function leaveTheMatchEarly() {
    if (!confirm("The match isn't over! Leaving the game will result in automatic lost!")) {
        return false;
    }
}
