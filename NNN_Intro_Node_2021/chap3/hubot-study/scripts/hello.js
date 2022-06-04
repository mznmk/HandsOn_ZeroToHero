'use strict'

module.exports = robot => {
  robot.hear(/hello>/i, msg => {
    const user_id = msg.message.user.id;
    msg.send(`Hello, <@${user_id}>`);
  });
  robot.hear(/omikuji>/i, msg => {
    const user_name = msg.message.user.name;
    const lots = ['大吉', '中吉', '吉', '末吉', '凶', '大凶'];
    const lot = lots[Math.floor(Math.random() * lots.length)];
    msg.send(`${user_name}! ${lot}!`);
  });
};