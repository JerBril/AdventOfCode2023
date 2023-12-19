const fs = require('fs');
const filePath = 'Day3Input.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
  console.log(countValuesPart1(data.split('\n')));
  console.log(countValuesPart2(data.split('\n')));
});

function countValuesPart1(lines)
{
    let endValue = 0;
    for(var i = 0; i <lines.length; i++)
    {
        let currentNumber = "";
        let countCurrentNumber = false;
        for(let l = 0; l <lines[i].length; l++)
        {
            if(isCharacterNumber(lines[i][l]))
            {
                currentNumber = currentNumber + lines[i][l];
                if(checkForSymbol(lines,i,l))
                {
                    countCurrentNumber = true;
                }

                if((l == lines[i].length-1))
                {
                    if(countCurrentNumber)
                    {
                        endValue = endValue + Number(currentNumber);
                    }
                    else{
                    }
                    currentNumber = "";
                    countCurrentNumber = false;
                }
            }
            else if (currentNumber != ""){
                if(countCurrentNumber)
                {
                    endValue = endValue + Number(currentNumber);
                }
                currentNumber = "";
                countCurrentNumber = false;
            }
        }
    }
    return endValue;
}

function checkForSymbol(lines, currentpos1, currentpos2) {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue; // Skip the current position

            const newRow = currentpos1 + i;
            const newCol = currentpos2 + j;

            if (isPositionValid(lines, newRow, newCol) && notNumberOrPoint(lines[newRow][newCol])) {
                return true;
            }
        }
    }
    return false;
}

function notNumberOrPoint(char)
{
    if(!isCharacterNumber(char) && char != ".")
    {
        return true;
    }
    return false;
}

function isPositionValid(arr, row, col) {
    return (
      row >= 0 &&
      row < arr.length &&
      col >= 0 &&
      col < arr[row].length
    );
  }

function isCharacterNumber(char) {
    return !isNaN(parseFloat(char)) && isFinite(char);
  }


function countValuesPart2(lines)
{
    let endValue = 0;
    for(let i = 0; i <lines.length; i++)
    {
        for(let l = 0; l <lines[i].length; l++)
        {
            if(lines[i][l] == "*")
            {
                endValue += checkNumbersAroundGear(lines,[i,l]);
            }
        }
    }
    return endValue;
}

function checkNumbersAroundGear(lines,gearPosition)
{
    let foundNumbers = [];

    for (let x = Math.max(0, gearPosition[0] - 1); x < Math.min(gearPosition[0] + 2, lines.length); x++) {
        for (let y = Math.max(0, gearPosition[1] - 1); y < Math.min(gearPosition[1] + 2, lines[gearPosition[0]].length); y++) {
            if(!isNaN(parseInt(lines[x][y])))
            {
                let result = findFullNumber(lines[x],y);
                y = result[1];
                foundNumbers.push(result[0]);                
            }
        }
    }

    let outcome = 0;
    if(foundNumbers.length == 2)
    {
        outcome = foundNumbers[0] * foundNumbers[1];
    }
    return outcome;
}

function findFullNumber(line,position)
{
    let number = "";
    let positionMin = (position-2 < 0) ? 0 : position-2;
    let positionMax = (position+2 > line.length) ? line.length : position+2;
    let end = position;

    for(let i = positionMin; i <= positionMax;i++)
    {
        if(!isNaN(line[i]))
        {
            number += line[i];
            end = i; 
        }
        else if(i == position-1)
        {
            number = "";
        }
        else if(i == position+1)
        {
            break;
        }
    }
    return [Number(number),end];
}