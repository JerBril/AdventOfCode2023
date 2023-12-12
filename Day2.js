const fs = require('fs');
const filePath = 'Day2Input.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
    var score = 0, score2 = 0;
    data.split('\n').forEach((line, index) => {
        var gameAndRounds = line.split(":");
        var game = gameAndRounds[0].split(" ")[1];
        var moves = gameAndRounds[1];

        if (checkValidRound(moves)) {
            score = score + Number(game);
        }
        score2 = score2 + checkRounds(moves);
    });
    console.log("Part1: " + score);
    console.log("Part2: " + score2);
});

//Part1
function checkValidRound(moves) {
    let foundColors = new Map();
    foundColors.set("red", 12);
    foundColors.set("green", 13);
    foundColors.set("blue", 14);

    var result = true;
    var pullrounds = moves.split(";");
    pullrounds.forEach((round) => {
        moves = round.split(",");
        moves.forEach((move) => {
            move = move.trim();
            value = move.split(" ")[0];
            color = move.split(" ")[1];
            if (value > foundColors.get(color)) {
                result = false;
            }
        });
    });

    return result;
}

//Part2
function checkRounds(moves) {
    let foundColors = new Map();
    foundColors.set("red", 1);
    foundColors.set("green", 1);
    foundColors.set("blue", 1);

    var pullrounds = moves.split(";");
    pullrounds.forEach((round) => {
        moves = round.split(",");
        var red = 0, green = 0, blue = 0;
        moves.forEach((move) => {
            move = move.trim();
            value = move.split(" ")[0];
            color = move.split(" ")[1];

            if (color == "red") { red = red + Number(value); }
            if (color == "green") { green = green + Number(value); }
            if (color == "blue") { blue = blue + Number(value); }
        });
        if (red > foundColors.get("red")) { foundColors.set("red", red) };
        if (green > foundColors.get("green")) { foundColors.set("green", green) };
        if (blue > foundColors.get("blue")) { foundColors.set("blue", blue) };
    });

    return foundColors.get("red") * foundColors.get("green") * foundColors.get("blue");
}