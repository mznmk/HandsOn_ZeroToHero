'use strict'

/**
 * 配列内の数値を加算する関数
 * @param {Array} numbers 
 * @returns       result
 */
function add(numbers) {
  let result = 0;
  for (const number of numbers) {
    result += number;
  }
  return result;
}

/**
 * 配列内の数値を乗算する関数
 * @param {Array} numbers 
 * @returns       result
 */
function multi(numbers) {
  let result = 1;
  for (const number of numbers) {
    result *= number;
  }
  return result;
}

module.exports = {
  add: add,
  multi: multi
};