'use strict'

const sum = require('sum');

console.log('< sum >');
console.log('1 + 2 + 3 + 4 + 5')
console.log(sum.add([1, 2, 3, 4, 5]));

console.log('< multi >');
console.log('1 * 2 * 3 * 4 * 5')
console.log(sum.multi([1, 2, 3, 4, 5]));