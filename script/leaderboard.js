var  testData = `{
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
var testDataObj = JSON.parse(testData)

for (let i = 0; i < Object.keys(testDataObj).length; i++) {
    let tableDiv = document.getElementById('leaderboardTable')
    tableDiv.innerHTML += `
        <tr>
            <td><b>${i}</b></td>
            <td>${testDataObj[i].name}</td>
            <td>${testDataObj[i].score}</td>
            <td>${(testDataObj[i].score /testDataObj[i].matchPlayed).toFixed(2)}</td>
        </tr>
    `
}