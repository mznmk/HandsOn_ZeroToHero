'use strict';

// [ read dataline ]
const fs = require('fs');
const readline = require('readline');
const rs = fs.createReadStream('./popu-pref.csv');
const rl = readline.createInterface({ input: rs, output: {} });
const prefDataMap = new Map();          // key: pref, value: data obj
// add event
rl.on('line', lineString => {
  const columns = lineString.split(',');
  const year = parseInt(columns[0]);
  const pref = columns[1];
  const popu = parseInt(columns[3]);
  // set "value" into map
  if (year === 2010 || year === 2015) {
    // create/update "value"
    let value = null;
    if (prefDataMap.has(pref)) {
      value = prefDataMap.get(pref);
    } else {
      value = {
        popu10: 0,
        popu15: 0,
        change: null
      };
    }
    if (year === 2010) {
      value.popu10 = popu;
    } else {
      value.popu15 = popu;
    }
    // set "value" into Map
    prefDataMap.set(pref, value);
  }
});
rl.on('close', () => {
  // calc "change"
  for (const [key, value] of prefDataMap) {
    value.change = value.popu15 / value.popu10;
  }
  // "prefDataMap" sorted by "change" in desc order
  const rankArray = Array.from(prefDataMap).sort((pair1, pair2) => {
    return pair2[1].change - pair1[1].change;
  });
  // console.log(rankArray);
  const rankStrings = rankArray.map(([key, value], index) => {
    return `第${index+1}位: ${key}: 変化数 ${value.popu10}->${value.popu15} / 変化率 ${value.change}`;
  });
  // console.log(rankStrings)
  for (const rankString of rankStrings) {
    console.log(rankString);
  }
})