'use strict'

const assert = require('assert');
const fs = require('fs');
const fileName = './tasks.json';

// exist savefile ?
fs.unlink(fileName, error => {
  const todo = require('./index.js');
  
    // test "add" "list"
  todo.add('buy note');
  todo.add('buy pencil');
  assert.deepStrictEqual(todo.list(), ['buy note', 'buy pencil']);
  
  // test "done" "donelist"
  todo.done('buy pencil');
  assert.deepStrictEqual(todo.list(), ['buy note']);
  assert.deepStrictEqual(todo.donelist(), ['buy pencil']);
  
  // test "del"
  todo.del('buy note');
  assert.deepStrictEqual(todo.list(), []);
  todo.del('buy pencil');
  assert.deepStrictEqual(todo.donelist(), []);
  
  // success
  console.log('test finished successfully!')
});
