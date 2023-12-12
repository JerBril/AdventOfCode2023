const fs = require('fs');
const filePath = 'Day1Input.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
  var number = 0;

  data.split('\n').forEach((line, index) => {
    line = cleanWord(line);
    number = number + Number(firstNumber(line.split('')) + lastNumber(line.split('')));
  });
  console.log(number)
});

function cleanWord(word)
{
    word = word.replace(/oneight/g,"18");
    word = word.replace(/twone/g,"21");
    word = word.replace(/threeight/g,"38");
    word = word.replace(/fiveight/g,"58");
    word = word.replace(/sevenine/g,"79");
    word = word.replace(/eightwo/g,"82");
    word = word.replace(/eighthree/g,"83");
    word = word.replace(/nineight/g,"98");
    word = word.replace(/one/g,"1");
    word = word.replace(/two/g,"2");
    word = word.replace(/three/g,"3");
    word = word.replace(/four/g,"4");
    word = word.replace(/five/g,"5");
    word = word.replace(/six/g,"6");
    word = word.replace(/seven/g,"7");
    word = word.replace(/eight/g,"8");
    word = word.replace(/nine/g,"9");
    return word;
}

function firstNumber(charArray)
{
    for(var i = 0; i <charArray.length; i++)
    {
        if(isCharacterNumber(charArray[i])){
            return charArray[i];
        }
    }
}

function lastNumber(charArray)
{
    for(var i = charArray.length; i >=0; i--)
    {
        if(isCharacterNumber(charArray[i])){
            return charArray[i];
        }
    }
}

function isCharacterNumber(char) {
    return !isNaN(parseFloat(char)) && isFinite(char);
  }