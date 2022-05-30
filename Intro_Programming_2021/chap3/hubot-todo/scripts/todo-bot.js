// Description:
//   TODO を管理できるボットです
// Commands:
//   ボット名 add      - TODO を作成
//   ボット名 done     - TODO を完了にする
//   ボット名 del      - TODO を消す
//   ボット名 list     - TODO の一覧表示
//   ボット名 donelist - 完了した TODO の一覧表示
'use strict'

const todo = require('todo');

module.exports = robot => {
  // command: add
  robot.respond(/add (.+)/i, msg =>{
    const task = msg.match[1].trim();
    todo.add(task);
    msg.send('command "add" done!: ' + task);
  });
  // command: done
  robot.respond(/done (.+)/i, msg => {
    const task = msg.match[1].trim();
    todo.done(task);
    msg.send('command "done" done!: ' + task);
  });
  // command: del
  robot.respond(/del (.+)/i, msg => {
    const task = msg.match[1].trim();
    todo.del(task);
    msg.send('command "del" done!: ' + task);
  });
  // command: list
  robot.respond(/list/i, msg => {
    const sendMsg = (() => {
      const tasks = todo.list();
      let message = 'command "list" done!' + '\n';
      if (tasks.length) {
        for (const task of tasks) { message += task + '\n'; }
      } else {
        message += 'nothing...\n';
      }
      return message;
    })();
    msg.send(sendMsg);
  });
  // command: donelist
  robot.respond(/donelist/i, msg => {
    // msg.send('command "donelist" done!\n' + todo.donelist().join('\n'));
    const sendMsg = (() => {
      const tasks = todo.donelist();
      let message = 'command "donelist" done!\n';
      if (tasks.length) {
        message += tasks.join('\n');
      } else {
        message += 'nothing...\n';
      }
      return message;
    })();
    msg.send(sendMsg);
  });
};
