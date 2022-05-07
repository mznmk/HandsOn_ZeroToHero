'use strict'

// set File I/O
const fs = require('fs');
const fileName = './tasks.json'

// create task container -> { task:string, state:bool }
let tasks = [];

// read savefile
try {
  const data = fs.readFileSync(fileName, 'utf8');
  tasks = JSON.parse(data);
} catch (_) {
  console.log(`savefile "${fileName}" did not exist...`);
}

/**
 * Taskをファイルに保存する
 */
function saveTasks() {
  fs.writeFileSync(fileName, JSON.stringify(tasks), 'utf8');
}

/**
 * Taskを追加する（未完了状態）
 * @param {string} taskName
 */
function add(taskName) {
  tasks.push({name: taskName, state: false});
  saveTasks();
  return;
}

/**
 * Taskを完了状態にする
 * @param {string} taskName 
 */
function done(taskName) {
  const index = tasks.findIndex(task => task.name === taskName);
  if (index !== -1) {
    tasks[index].state = true;
    saveTasks();
  }
  return;
}

/**
 * Todoを削除する
 * @param {string} taskName 
 */
function del(taskName) {
  const index = tasks.findIndex(task => task.name === taskName);
  if (index !== -1) {
    tasks.splice(index, 1);
    saveTasks();
  }
  return;
}

/**
 * Taskが完了済かどうかを返す
 * @param {object} task 
 * @returns {boolean}
 */
function isDone(task) {
  return task.state;
}

/**
 * Taskが未完了かどうかを返す
 * @param {object} task 
 * @returns {boolean}
 */
function isNotDone(task) {
  return !isDone(task);
}

/**
 * 未完了TaskのTaskNameを返す
 * @returns 
 */
function list() {
  return tasks.filter(isNotDone)
              .map(task => task.name);
}

/**
 * 完了済TaskのTaskNameを返す
 * @returns 
 */
function donelist() {
  return tasks.filter(isDone)
              .map(task => task.name);
}

module.exports = {
  add,
  done,
  del,
  list,
  donelist,
}