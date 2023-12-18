let roundsArray =   [
                        [62,553],
                        [64,1010],
                        [91,1473],
                        [90,1074]
                    ]
let totalValue = 1;

console.log("part1");
roundsArray.forEach((element) => {
    totalValue *= calculateNumber(element[0],element[1]);
});
console.log(totalValue);

console.log("part2");
let realRace = getRealRace(roundsArray);
console.log(calculateNumber(realRace[0],realRace[1]));

function getRealRace(array)
{
    let time ="";
    let distance ="";
    array.forEach((element) => {
        time += String(element[0]);
        distance += String(element[1])
    });

    return [Number(time),Number(distance)];
}

function calculateNumber(totalTime,distance)
{
    let score = 0;

    for(let i = 0; i < totalTime; i++)
    {
        if(((totalTime - i) * i) > distance)
        {
            score += 1;
        } 
    }
    return score;
}