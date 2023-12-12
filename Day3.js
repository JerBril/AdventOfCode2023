const fs = require('fs');
const filePath = 'Day3Input.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
  console.log(countValues(data.split('\n')));
});

function countValues(lines)
{
    var endValue = 0;
    for(var i = 0; i <lines.length; i++)
    {
        var currentNumber = "";
        var countCurrentNumber = false;
        for(var l = 0; l <lines[i].length; l++)
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