'use strict'

/**
 * 
 * @param {int} 	num 
 * @returns 	factorial
 */
function factorial(num) {
  let fact = 1;
  for (let i = num; i >= 1; i--) {
    fact *= i;
  }
  return fact;
}

const assert = require('assert');
assert.strictEqual(factorial(5), 120, `ans: 1-> 120 myfunc: $(factorial(5))`);
console.log("OK!")