const playerRef = firebase.database().ref("PlayerList");
var testData = `{
    "0": {"name": "kill", "score":50, "matchPlayed":60},
    "1": {"name": "rgsfd", "score":30, "matchPlayed":40},
    "2": {"name": "mingus", "score":24, "matchPlayed":30},
    "3": {"name": "funny", "score":86, "matchPlayed":100},
    "4": {"name": "iidx", "score":5, "matchPlayed":9},
    "5": {"name": "asfjkl", "score":47, "matchPlayed":58},
    "6": {"name": "guymcguy", "score":21, "matchPlayed":90},
    "7": {"name": "asdeg", "score":8, "matchPlayed":11},
    "8": {"name": "wallfram", "score":485, "matchPlayed":500},
    "9": {"name": "kill", "score":50, "matchPlayed":60},
    "10": {"name": "rgsfd", "score":30, "matchPlayed":40},
    "11": {"name": "mingus", "score":24, "matchPlayed":30},
    "12": {"name": "funny", "score":86, "matchPlayed":100},
    "13": {"name": "iidx", "score":5, "matchPlayed":9},
    "14": {"name": "asfjkl", "score":47, "matchPlayed":58},
    "15": {"name": "guymcguy", "score":21, "matchPlayed":90},
    "16": {"name": "asdeg", "score":8, "matchPlayed":11},
    "17": {"name": "wallfram", "score":485, "matchPlayed":500}
}
  `
// Retrieve new posts as they are added to our database



var testDataObj = JSON.parse(testData)
// const sss = ;
playerRef.orderByChild("game-win").limitToFirst(30).once('value', (snapshot) => {
    let rank = 1;
    snapshot.forEach((data) => {
        
        // console.log(data.child("player-email").val());
        // console.log(data.child("game-win").val());
        // console.log(data.child("game-lose").val());
        let email = data.child("player-email").val();
        let gamewin = data.child("game-win").val();
        let Totalmatchplay = data.child("Totalmatchplay").val();
        // var datas = reverseSnapshot(data);

        // consolelog(datas);
        
        let tableDiv = document.getElementById('leaderboardTable')
        let gamewinjing = Math.abs(gamewin);
        let Totalmatchplayjing = Math.abs(Totalmatchplay);
        let winrate = gamewinjing / Totalmatchplayjing;
        if ((gamewinjing == 0) && (Totalmatchplayjing == 0)){
            winrate = 0;
        }
        else if ((gamewinjing != 0) && (Totalmatchplayjing == 0)){
            winrate = "How did we get here?";
        }
        else{
            winrate = winrate.toFixed(2)
        }
        
            tableDiv.innerHTML += `
                    <tr>
                        <td><b>${rank}</b></td>
                        <td>${email}</td>
                        <td>${gamewinjing}</td>
                        <td>${winrate}</td>
                    </tr>
                `
        rank++;
    });
    
});

// function reverseSnapshot(snapshot) {
//     var reversedArray = [];
//     snapshot.forEach(function (childSnapshot) {
//       reversedArray.unshift(childSnapshot);
//     });
//     return reversedArray;
// }

// function consolelog(aaa){
//     aaa.forEach((data) => {
        
//     })
    
// }
