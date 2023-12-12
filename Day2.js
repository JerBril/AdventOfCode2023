const fs = require('fs');
const filePath = 'Day2Input.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
  var score = 0;

  data.split('\n').forEach((line, index) => {
    var gameAndRounds = line.split(":");
    var game = gameAndRounds[0].split(" ")[1];
    var moves = gameAndRounds[1];

    if(checkValidRound(moves))
    {
        score = score + Number(game);
    }
  });
  console.log(score);
});

function checkValidRound(moves)
{
    let foundColors = new Map();
    foundColors.set("red",12);
    foundColors.set("green",13);
    foundColors.set("blue",14);

    var result = true;
    var pullrounds = moves.split(";");
    pullrounds.forEach((round) => {
        moves = round.split(",");
        moves.forEach((move) => {
            move = move.trim();
            value = move.split(" ")[0];
            color = move.split(" ")[1];
            if(value > foundColors.get(color))
            {
                result = false;
            }
        });
    });

return result;
}