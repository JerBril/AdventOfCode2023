const fs = require('fs');
const filePath = 'Day7Input.txt';

let handsMap = {};
let scoreMap = new Map();

fs.readFile(filePath, 'utf8', (err, data) => {
  let lines = data.split('\n');

  fillHandsMap(lines);
  fillHandsScoreMap(lines);

  console.log(scoreMap);
  sortHandsMap();
  console.log(handsMap);

  console.log(getwinnings());
});

let cardValueMap = {
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
  T: 9,
  J: 10,
  Q: 11,
  K: 12,
  A: 13,
};

function getwinnings() {
  let winning = 0;
  for (let i = 0; i < handsMap.length; i++) {
    let bid = handsMap[i].split(" ")[1];
    winning += (bid * (i+1));
  }
  return winning;
}

function sortHandsMap() {
  const sorted = handsMap.sort((a, b) => {
    const aScore = scoreMap.get(a);
    const bScore = scoreMap.get(b);
    if (aScore < bScore) {
      return -1;
    } else if (aScore > bScore) {
      return 1;
    }
    return findHighCard(a.split(" ")[0], b.split(" ")[0]);
  });
  handsMap = sorted;
}

function findHighCard(cardsA, cardsB) {
  for (let i = 0; i < cardsA.length; i++) {
    if (cardsA[i] !== cardsB[i]) {
      return cardValueMap[cardsA[i]] - cardValueMap[cardsB[i]];
    }
  }
  return 0;
}

function fillHandsMap(lines) {
  handsMap = lines;
}

function fillHandsScoreMap(lines) {
  lines.forEach(line => {
    let splitline = line.split(' ');
    let cards = splitline[0];
    const charMap = new Map();
    for (let i = 0; i < cards.length; i++) {
      const char = cards[i];
      charMap.set(char, (charMap.get(char) || 0) + 1);
    }
    let valueString = [...charMap].sort((a, b) => b[1] - a[1]).map(getValues).join("").padEnd(5, '0');
    scoreMap.set(line, valueString);
  });
}

function getValues(item) {
  return [item[1]].join("");
}