const fs = require('fs');
const filePath = 'Day4Input.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
    let endScore = 0;
    data.split('\n').forEach((line, index) => {
        let cardAndNumbers = line.split(" | ");
        let winningNumbers = cardAndNumbers[0].split(": ")[1].trim().replace(/ {2,}/g, ' ').split(" ").map(str => parseInt(str));
        let playingNumbers = cardAndNumbers[1].trim().replace(/ {2,}/g, ' ').split(" ").map(str => parseInt(str));

        endScore += getPoints(winningNumbers,playingNumbers);
    });
    console.log(endScore);
});

function getPoints(winningNumbers,playingNumbers)
{
    let score = 0;

    playingNumbers.forEach((num) => {
        if(winningNumbers.includes(num))
        {
            score = (score === 0) ? 1 : score * 2;
        }
    });

    return score;
}