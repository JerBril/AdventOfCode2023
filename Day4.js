const fs = require('fs');
const filePath = 'Day4Input.txt';

fs.readFile(filePath, 'utf8', (err, data) => {

    var endScore = 0;
    data.split('\n').forEach((line, index) => {
        var cardAndNumbers = line.split(" | ");
        let winningNumbers = cardAndNumbers[0].split(": ")[1].trim().replace(/ {2,}/g, ' ').split(" ").map(str => parseInt(str));
        var playingNumbers = cardAndNumbers[1].trim().replace(/ {2,}/g, ' ').split(" ").map(str => parseInt(str));

        endScore += getPoints(winningNumbers,playingNumbers);
        console.log(endScore);
    });

    console.log(endScore);

});

function getPoints(winningNumbers,playingNumbers)
{
    var score = 0;

    playingNumbers.forEach((num) => {
        if(winningNumbers.includes(num))
        {
            if(score == 0){score = 1}
            else
            {
                score *= 2;
            }
        }
    });

    return score;
}