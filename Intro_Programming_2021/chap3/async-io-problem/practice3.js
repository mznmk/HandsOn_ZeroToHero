'use strict';

const fs = require('fs');
const fileName = './test.txt';

function appendFilePromise(fileName, string) {
  return new Promise((resolve) => {
    fs.appendFile(fileName, string, 'utf8', ()=>resolve())
  });
}

async function main() {
  for (let count = 0; count < 30; count++) {
    await appendFilePromise(fileName, '1-おはようございます\n');
    await appendFilePromise(fileName, '2-こんにちは\n');
    await appendFilePromise(fileName, '3-こんばんは\n');
  }
}

main();